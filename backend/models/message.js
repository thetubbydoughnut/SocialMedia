const db = require('../config/database');

class Message {
  static async createMessage(messageData) {
    const [id] = await db('messages').insert(messageData);
    return this.findById(id);
  }

  static async findById(id) {
    return db('messages').where({ id }).first();
  }

  static async getChatMessages(chatId) {
    return db('messages')
      .where({ chat_id: chatId })
      .orderBy('created_at', 'asc');
  }

  // Additional methods as needed
}

module.exports = Message;