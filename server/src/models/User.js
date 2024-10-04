const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async create(userData) {
    const { password, ...otherData } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({
      ...otherData,
      password: hashedPassword
    });
    return this.findById(id);
  },

  async findByEmail(email) {
    return db('users').where({ email }).first();
  },

  async findById(id) {
    try {
      const user = await db('users').where({ id }).first();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  },

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  },

  async update(id, updateData) {
    await db('users').where({ id }).update(updateData);
    return this.findById(id);
  },

  // ... other methods
};

module.exports = User;