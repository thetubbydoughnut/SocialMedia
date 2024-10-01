const db = require('../config/database');

class User {
  static async findAll() {
    return db('users').select('*');
  }

  static async findById(id) {
    return db('users').where({ id }).first();
  }

  static async findByUsername(username) {
    return db('users').where({ username }).first();
  }

  static async create(userData) {
    const [id] = await db('users').insert(userData);
    return this.findById(id);
  }

  static async update(id, updateData) {
    await db('users').where({ id }).update(updateData);
    return this.findById(id);
  }

  static async delete(id) {
    return db('users').where({ id }).del();
  }
}

module.exports = User;