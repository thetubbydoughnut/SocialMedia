const db = require('../config/database');

class Chat {
  static async createChat(isGroup = false, name = null) {
    const [id] = await db('chats').insert({ is_group: isGroup, name });
    return this.findById(id);
  }

  static async findById(id) {
    return db('chats').where({ id }).first();
  }

  static async getUserChats(userId) {
    return db('chats')
      .join('chat_users', 'chats.id', 'chat_users.chat_id')
      .where('chat_users.user_id', userId)
      .select('chats.*');
  }

  static async addUserToChat(chatId, userId) {
    return db('chat_users').insert({ chat_id: chatId, user_id: userId });
  }

  // Additional methods as needed
}

module.exports = Chat;
