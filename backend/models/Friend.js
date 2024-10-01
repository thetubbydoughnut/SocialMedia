const db = require('../config/database');
const User = require('./user');

class Friend {
  static async create(userId, friendId) {
    return db('friends').insert({
      user_id: userId,
      friend_id: friendId,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  static async findOne(userId, friendId) {
    return db('friends')
      .where({
        user_id: userId,
        friend_id: friendId
      })
      .orWhere({
        user_id: friendId,
        friend_id: userId
      })
      .first();
  }

  static async updateStatus(userId, friendId, status) {
    return db('friends')
      .where({
        user_id: userId,
        friend_id: friendId
      })
      .orWhere({
        user_id: friendId,
        friend_id: userId
      })
      .update({
        status: status,
        updated_at: new Date()
      });
  }

  static async getFriends(userId) {
    return db('friends')
      .where(function() {
        this.where('user_id', userId).orWhere('friend_id', userId);
      })
      .andWhere('status', 'accepted')
      .select('user_id', 'friend_id');
  }
}

module.exports = Friend;