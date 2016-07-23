
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('sample', (table) => {
      table.integer('id');
      table.text('val');
    })
    .then(() => {
      var rows = [{ id: 1, val: 'a' }, { id: 2, val: 'b' }, { id: 3, val: 'c' }];
      return knex.batchInsert('sample', rows);
    })
    .then(() => {
      return knex.schema.createTableIfNotExists('users', (table) => {
        table.integer('id');
        table.text('first_name');
        table.text('last_name');
      })
    })
    .then(() => {
      var rows = [
        { id: 1, first_name: 'John', last_name: 'Smith' },
        { id: 2, first_name: 'Mary', last_name: 'Stevens' },
        { id: 3, first_name: 'Mark', last_name: 'Williams' }
      ];
      return knex.batchInsert('users', rows);
    })
    .catch((error) => console.log(error.stack));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sample')
    .then((res) => {
      return knex.schema.dropTableIfExists('users')
    })
    .catch((error) => console.log(error.stack));
};
