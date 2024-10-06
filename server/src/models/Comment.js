const knex = require('../config/database');

const Comment = {
  tableName: 'comments',

  async findAll() {
    return knex(this.tableName).select('*');
  },

  async findAllByPostId(postId) {
    return knex(this.tableName).where('postId', postId).select('*');
  },

  async create(comment) {
    return knex(this.tableName).insert(comment).returning('*');
  }
};

module.exports = Comment;