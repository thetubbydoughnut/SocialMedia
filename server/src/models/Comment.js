const db = require('../config/database');

class Comment {
  static async findAll() {
    return db('comments').select('*');
  }

  static async findByPostId(postId) {
    return db('comments').where({ postId }).select('*');
  }

  static async create({ postId, userId, content }) {
    const [id] = await db('comments').insert({
      postId,
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return this.findById(id);
  }

  static async findById(id) {
    return db('comments').where({ id }).first();
  }
}

module.exports = Comment;