const db = require('../config/database');

class Comment {
  static async findAll() {
    return db('comments').select('*');
  }

  static async findByPostId(postId) {
    return db('comments').where({ postId }).orderBy('created_at', 'desc');
  }

  static async create({ postId, userId, content }) {
    const [id] = await db('comments').insert({
      postId,
      userId,
      content,
      // SQLite will automatically handle created_at and updated_at
    });
    return this.findById(id);
  }

  static async findById(id) {
    return db('comments').where({ id }).first();
  }
}

module.exports = Comment;