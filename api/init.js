import _ from 'lodash';
import requireAll from 'require-all';
import Knex from 'knex';

import db from './config/db.json';

let knex = new Knex(db);

let models = requireAll({
  dirname     :  __dirname + '/models',
  filter      :  /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

models = _.mapValues(models, model => model.default);

global._ = _;
global.knex = knex;
global.models = models;

_.forIn(models, (value, key) => {
  global[key] = value;
});

export { _, knex, models}
