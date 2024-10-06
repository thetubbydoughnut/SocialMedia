const db = require('../config/database');

const Post = {
  async findAll() {
    return db('posts')
      .join('users', 'posts.userId', '=', 'users.id')
      .select('posts.*', 'users.username')
      .orderBy('posts.createdAt', 'desc');
  },

  async create(postData) {
    const [id] = await db('posts').insert(postData);
    return this.findById(id);
  },

  async findById(id) {
    return db('posts')
      .join('users', 'posts.userId', '=', 'users.id')
      .select('posts.*', 'users.username')
      .where('posts.id', id)
      .first();
  },

  async update(id, postData) {
    await db('posts').where({ id }).update(postData);
    return this.findById(id);
  },

  async delete(id) {
    return db('posts').where({ id }).del();
  }
};

module.exports = Post;