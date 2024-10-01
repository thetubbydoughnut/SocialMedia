const db = require('../config/database');

class Story {
  static async create(storyData) {
    const [id] = await db('stories').insert(storyData);
    return this.findById(id);
  }

  static async findById(id) {
    return db('stories').where({ id }).first();
  }

  static async getUserStories(userId) {
    return db('stories')
      .where({ user_id: userId })
      .andWhere('expires_at', '>', db.fn.now())
      .orderBy('created_at', 'desc');
  }

  static async getStoriesForFeed(friendIds) {
    return db('stories')
      .whereIn('user_id', friendIds)
      .andWhere('expires_at', '>', db.fn.now())
      .join('users', 'stories.user_id', 'users.id')
      .select('stories.*', 'users.username', 'users.profile_photo')
      .orderBy('stories.created_at', 'desc');
  }

  static async deleteExpired() {
    return db('stories')
      .where('expires_at', '<', db.fn.now())
      .del();
  }

  // Additional methods as needed
}

module.exports = Story;