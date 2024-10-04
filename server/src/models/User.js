const bcrypt = require('bcrypt');
const db = require('../config/database');

const User = {
  async create(userData) {
    const { password, ...otherData } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [id] = await db('users').insert({
      ...otherData,
      password: hashedPassword
    });
    return this.findById(id);
  },

  async findById(id) {
    return db('users').where({ id }).first();
  },

  async findByEmail(email) {
    return db('users').where({ email }).first();
  },

  async findByUsername(username) {
    return db('users').where({ username }).first();
  },

  async update(id, updateData) {
    await db('users').where({ id }).update(updateData);
    return this.findById(id);
  },

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
};

module.exports = User;