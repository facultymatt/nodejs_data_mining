var addons, client, colors, config, data_path, export_compressed_json, export_json, fs, get_addon_forks, get_addons, github, github_error_handling, load_features, load_forks, load_json, path;


config = require('../config');

config.setEnvironment('development');

fs = require('fs');

path = require('path');

colors = require('colors');

github = require('octonode');

client = github.client({
  id: config.GITHUB_CLIENT_ID,
  secret: config.GITHUB_SECRET
});

data_path = path.join(__dirname, '..', '..', 'data');

get_addons = function(callback, opt_) {
  var k, opt, q, v;
  opt = {
    addons: [],
    skipped: [],
    year: 2010,
    page: 1,
    num_results: 0,
    increment_num_results: true
  };
  for (k in opt_) {
    v = opt_[k];
    opt[k] = v;
  }
  console.log("→ fetching YEAR : ".cyan + ("" + opt.year).bold.magenta + (" (page " + opt.page + ")").cyan);
  q = "ofx in:name created:" + opt.year + "-01-01.." + (opt.year + 1) + "-01-01";
  return client.search().repos({
    q: q,
    per_page: 100,
    page: opt.page
  }, function(err, res) {
    var num_results_parsed, r, skipped, _i, _len, _ref;
    if (err) {
      github_error_handling(err, q, get_addons, [callback, opt]);
    } else {
      if (opt.increment_num_results) {
        opt.num_results += res.total_count;
      }
      skipped = [];
      _ref = res.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        if (/(^)ofx[iA-Z0-9]\w*\S/.test(r.name)) {
          opt.addons.push(r);
        } else {
          skipped.push(r.name);
        }
      }
      opt.skipped = opt.skipped.concat(skipped);
      num_results_parsed = opt.addons.length + opt.skipped.length;
      console.log('total repos parsed :' + (" " + num_results_parsed + "/" + opt.num_results).green);
      console.log('total addons found :' + (" " + opt.addons.length).green);
      console.log(("skipped " + skipped.length + " repos : " + (skipped.join(', '))).grey.italic);
      if (num_results_parsed < opt.num_results) {
        opt.page++;
        opt.increment_num_results = false;
        return get_addons(callback, opt);
      } else if (opt.year < new Date().getFullYear()) {
        opt.year++;
        opt.page = 1;
        opt.increment_num_results = true;
        return get_addons(callback, opt);
      } else {
        return callback(opt.addons);
      }
    }
  });
};

get_addon_forks = function(addon, callback, opt_) {
  var k, opt, q, v;
  opt = {
    forks: [],
    skipped: [],
    page: 1
  };
  for (k in opt_) {
    v = opt_[k];
    opt[k] = v;
  }
  console.log("→ fetching forks of " + addon.name + " (page " + opt.page + ")");
  q = "" + addon.name + " in:name fork:only";
  return client.search().repos({
    q: q,
    per_page: 100,
    page: opt.page
  }, function(err, res) {
    var num_results, num_results_parsed, r, regex, skipped, _i, _len, _ref;
    if (err) {
      github_error_handling(err, q, get_addon_forks, [addon, callback, opt_]);
    } else {
      skipped = [];
      _ref = res.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        regex = new RegExp("^" + addon.name + "$", 'g');
        if (regex.test(r.name)) {
          opt.forks.push(r);
        } else {
          skipped.push(r.name);
        }
      }
      opt.skipped = opt.skipped.concat(skipped);
      num_results = res.total_count;
      num_results_parsed = opt.skipped.length + opt.forks.length;
      if (num_results > 0) {
        console.log('total repos parsed :' + (" " + num_results_parsed + "/" + num_results).green);
        console.log('total forks found  :' + (" " + opt.forks.length).green);
        if (skipped.length) {
          console.log(("skipped " + skipped.length + " repos : " + (skipped.join(', '))).grey.italic);
        }
      }
      if (num_results_parsed < num_results) {
        opt.page++;
        return get_addon_forks(addon, callback, opt);
      } else {
        return callback(opt.forks);
      }
    }
  });
};

github_error_handling = function(err, q, callee, args) {
  var diff, reset, today;
  diff = -1;
  if (err.message && err.message.indexOf('rate limit exceeded') > -1) {
    reset = new Date(parseInt(err.headers['x-ratelimit-reset']) * 1000);
    today = new Date();
    diff = reset.getTime() - today.getTime();
    console.log(("→ API rate limit exceeded, retrying in " + (diff / 1000) + " seconds...").yellow);
  } else {
    console.log('ERROR:'.red);
    console.log(("→ for query : " + q).yellow);
    console.log(err);
    if (true || err.code === 'ECONNRESET') {
      diff = 1000;
      console.log(("→ retrying in " + (diff / 1000) + " seconds...").yellow);
    }
  }
  return setTimeout(function() {
    return callee.apply(null, args);
  }, diff);
};

load_features = function(addons, callback, i) {
  var addon;
  if (i == null) {
    i = 0;
  }
  console.log(("" + (i + 1) + "/" + addons.length).green + " → loading features of addon " + ("" + addons[i].owner + "/" + addons[i].name).bold);
  addon = addons[i];
  return client.repo(addon.full_name).contents('', function(err, data) {
    var file, _i, _len;
    if (err) {
      if (err.message && (err.message.indexOf('This repository is empty') > -1 || err.statusCode === 500 || err.statusCode === 404)) {
        console.log(("" + err.message).red);
        console.log("invalid repository. skipping..".yellow);
        addons.splice(i, 1);
        load_features(addons, callback, i);
      } else {
        github_error_handling(err, '', load_features, [addons, callback, i]);
      }
      return;
    }
    addon.num_examples = 0;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      file = data[_i];
      if (file.name === "addon_config.mk" || file.name === "addon.make") {
        addon.has_makefile = true;
        console.log(' > found ' + 'makefile'.magenta);
      } else if (file.name.match(/example/i)) {
        addon.num_examples += 1;
        console.log(' > found ' + 'example'.cyan);
      } else if (file.name.match(/ofxaddons_thumbnail.png/i)) {
        addon.has_thumbnail = true;
        console.log(' > found ' + 'thumbnail'.blue);
      }
    }
    if (i === addons.length - 1) {
      return callback();
    } else {
      return load_features(addons, callback, i + 1);
    }
  });
};

load_json = function(filename) {
  var data, filepath;
  filepath = path.join(data_path, 'json', filename);
  data = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(data);
};

export_json = function(data, filename) {
  var err, filepath;
  filepath = path.join(data_path, 'json', filename);
  err = fs.writeFileSync(filepath, JSON.stringify(data));
  if (err) {
    return console.log(("ERROR during export: \n " + err).red);
  } else {
    return console.log('JSON exported!'.green);
  }
};

load_forks = function(addons, callback, i) {
  if (i == null) {
    i = 0;
  }
  console.log("→ loading forks of addon " + (i + 1) + "/" + addons.length);
  while (addons[i].forks === 0) {
    console.log('0 fork > skipping'.cyan);
    i++;
  }
  return get_addon_forks(addons[i], function(forks) {
    if (forks.length) {
      export_json(forks, path.join('forks', addons[i].name + '.json'));
    }
    if (i === addons.length - 1) {
      return callback();
    } else {
      return load_forks(addons, callback, i + 1);
    }
  });
};

export_compressed_json = function(addons) {
  var a, addon, f, forks, forks_path, out, _i, _j, _len, _len1;
  out = [];
  for (_i = 0, _len = addons.length; _i < _len; _i++) {
    addon = addons[_i];
    a = {
      name: addon.name,
      owner: addon.full_name.split('/')[0],
      description: addon.description,
      created_at: addon.created_at,
      updated_at: addon.updated_at,
      num_stars: addon.stargazers_count,
      num_forks: addon.forks,
      has_makefile: addon.has_makefile,
      has_thumbnail: addon.has_thumbnail,
      num_examples: addon.num_examples
    };
    forks_path = path.join('forks', "" + addon.name + ".json");
    if (fs.existsSync(path.join(data_path, 'json', forks_path))) {
      a.forks = [];
      forks = load_json(forks_path);
      for (_j = 0, _len1 = forks.length; _j < _len1; _j++) {
        f = forks[_j];
        if (new Date(f.updated_at).getTime() > new Date(a.updated_at).getTime()) {
          a.forks.push({
            owner: f.owner,
            created_at: f.created_at,
            updated_at: f.updated_at,
            num_stars: f.stargazers_count
          });
        }
      }
    }
    out.push(a);
  }
  return export_json(out, 'addons_and_features_compressed.json');
};

addons = load_json('addons.json');

load_forks(addons, function() {
  return console.log('>> done!'.bold.green);
});
