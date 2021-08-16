
exports.up = function(knex) {
  return knex.schema.createTable("question", tbl => {
      tbl.increments()
      tbl.string("question_text")
      tbl.string("video")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("question")
};
