exports.up = function(knex) {
  return knex.schema.createTable("user", tbl => {
    tbl.increments();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.string("departments");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
