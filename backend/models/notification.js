const db = require('../config/database');

class Notification {
  static async create(notificationData) {
    const [id] = await db('notifications').insert(notificationData);
    return this.findById(id);
  }

  static async findById(id) {
    return db('notifications').where({ id }).first();
  }

  static async getUserNotifications(userId) {
    return db('notifications')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  }

  static async markAsRead(notificationId) {
    return db('notifications')
      .where({ id: notificationId })
      .update({ is_read: true });
  }

  // Additional methods as needed
}

module.exports = Notification;