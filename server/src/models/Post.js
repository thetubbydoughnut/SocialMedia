const db = require('../config/database');

const Post = {
  async create(postData) {
    const [id] = await db('posts').insert(postData);
    return this.findById(id);
  },

  async findAll() {
    return db('posts').select('*').orderBy('createdAt', 'desc');
  },

  async findById(id) {
    return db('posts').where({ id }).first();
  },

  async update(id, postData) {
    await db('posts').where({ id }).update(postData);
    return this.findById(id);
  },

  async delete(id) {
    return db('posts').where({ id }).del();
  },

  async findByUserId(userId) {
    return db('posts').where({ userId }).orderBy('createdAt', 'desc');
  }
};

module.exports = Post;