
exports.up = function(knex) {
  return knex.schema.createTable("answer", tbl => {
      tbl.increments()
      tbl.string("answer_text")
      tbl.integer("questionID")
         .unsigned()
         .notNullable()
         .references("question.id")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")
      tbl.integer("next_questionID")
         .unsigned()
         .notNullable()
         .references("question.id")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")

      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("answer")
};
