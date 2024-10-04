const knex = require('../config/database');

const Post = {
  create: async (postData) => {
    const [id] = await knex('posts').insert(postData);
    return knex('posts').where({ id }).first();
  },

  findAll: async (orderBy = 'createdAt', order = 'desc') => {
    return knex('posts').orderBy(orderBy, order);
  },

  findById: async (id) => {
    return knex('posts').where({ id }).first();
  },

  update: async (id, postData) => {
    await knex('posts').where({ id }).update(postData);
    return knex('posts').where({ id }).first();
  },

  delete: async (id) => {
    return knex('posts').where({ id }).del();
  }
};

module.exports = Post;