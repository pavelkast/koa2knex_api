

import Model from './DefaultModel';

export default class {
  constructor(tableName) {
    this.model = new Model(tableName);

    const methodList = [
      'list',
      'insert',
      'update',
      'del',
      'getById'
    ];
    
    _.bindAll(this, methodList);
  }

  async list (ctx) {
    let result = await this.model.find();
    if (_.isNil(result)) result = { success : false };
    ctx.body = result;
  }

  async insert (ctx) {
    const requestData = ctx.request.body;
    let result = await this.model.insert(requestData);
    if (!result) result = { success : false };
    else result = { success : true };
    ctx.body = result;
  }

  async update (ctx) {
    const requestData = ctx.request.body;
    const id = ctx.params.id;
    let result = await this.model.update({ id }, requestData);
    if (!result) result = { success : false };
    else result = { success : true };
    ctx.body = result;
  }

  async del (ctx) {
    const id = ctx.params.id;
    let result = await this.model.del({ id });
    if (!result) result = { success : false };
    else result = { success : true };
    ctx.body = result;
  }

  async getById (ctx) {
    const id = ctx.params.id || 1;
    let result = await this.model.findOne({ id });
    if (_.isNil(result)) result = { success : false };
    ctx.body = result;
  }
}