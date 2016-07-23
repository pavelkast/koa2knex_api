/* global knex, log */

export default class model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  findById(id) {
    if (!id) {
      console.error('[Model:findById] error: params missing');
      return Promise.resolve(false);
    }
    
    return knex(this.tableName).where('id', id).select('*')
      .then((result) => {
        return _.isArray(result) && _.size(result) > 0 ? result[0] : null;
      })
      .catch((error) => {
        console.error('[Model:findById] error: ' + error.message);
        return null;
      });
  }

  findOne(whereClause) {
    whereClause = whereClause || {};

    return knex(this.tableName).where(whereClause).select('*')
      .then((result) => {
        return _.isArray(result) && _.size(result) > 0 ? result[0] : null;
      })
      .catch((error) => {
        console.error('[Model:findOne] error: ' + error.message);
        return null;
      });
  }

  find(whereClause) {
    whereClause = whereClause || {};

    return knex(this.tableName).where(whereClause).select('*')
      .then((result) => {
        return _.isArray(result) && _.size(result) > 0 ? result : null;
      })
      .catch((error) => {
        console.error('[Model:find] error: ' + error.message);
        return null;
      });
  }

  insert(data) {
    if (_.isNil(data)) {
      console.error('[Model:insert] error: params missing');
      return Promise.resolve(false);
    }

    return knex(this.tableName).insert(data, true)
      .then((result) => {
        console.log(result);
        return _.isArray(result) && _.size(result) > 0 ? result : null;
      })
      .catch((error) => {
        console.error('[Model:insert] error: ' + error.message);
        return false;
      });
  }

  update(whereClause, data) {
    if (_.isNil(data) || _.isNil(whereClause)) {
      console.error('[Model:update] error: params missing');
      return Promise.resolve(false);
    }

    return knex(this.tableName).where(whereClause).update(data)
      .then((result) => {
        return _.isNumber(result) || null;
      })
      .catch((error) => {
        console.error(`[Model:update] error: ${error.message}`);
        return null;
      });
  }

  del(whereClause) {
    if (_.isNil(whereClause)) {
      console.error('[Model:del] error: params missing');
      return Promise.resolve(false);
    }

    return knex(this.tableName).where(whereClause).del()
      .then((result) => {
        return _.isNumber(result) || null;
      })
      .catch((error) => {
        console.error(`[Model:del] error: ${error.message}`);
        return null;
      });
  }

  raw(sql, bindings) {
    if (_.isNil(sql)) {
      console.error('[Model:raw] error: params missing');
      return Promise.resolve(false);
    }

    bindings = bindings || [];

    return knex.raw(sql, bindings)
      .then((result) => {
        console.log(knex.raw(sql, bindings).toString());
        return _.isArray(result[0]) && _.size(result[0]) > 0 ? result[0] : [];
      })
      .catch((error) => {
        console.error(`[Model:raw] error: ${error.message}`);
        return null;
      });
  }
}