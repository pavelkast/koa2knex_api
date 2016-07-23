import DefaultModel from '../defaults/DefaultModel';

const _settings = {
  tableName: 'users',
};


class User extends DefaultModel {
  constructor() {
    super(_settings.tableName);
  }
  
  findOneByFullName(firstName, lastName) {
    const whereClause = {
      first_name: firstName,
      last_name: lastName,
    };
    
    return knex(this.tableName).where(whereClause).select('*')
      .then((result) => {
        return _.isArray(result) && _.size(result) > 0 ? _.head(result) : null;
      })
      .catch((error) => {
        console.error('Model:findById error: ' + error.message);
        return null;
      });
  }
}

const user = new User();
export default user;