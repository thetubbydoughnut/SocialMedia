const bcrypt = require('bcrypt');
const db = require('../config/database');
const crypto = require('crypto');

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
  },

  async changePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await db('users').where({ id }).update({ password: hashedPassword });
    return this.findById(id);
  },

  async createResetToken(email) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    await db('users').where({ email }).update({ resetToken, resetTokenExpiry });
    return resetToken;
  },

  async findByResetToken(token) {
    return db('users').where({ resetToken: token }).first();
  },

  async resetPassword(token, newPassword) {
    const user = await this.findByResetToken(token);
    if (!user || user.resetTokenExpiry < Date.now()) {
      throw new Error('Invalid or expired reset token');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await db('users').where({ id: user.id }).update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });
  },

  async setEmailVerificationToken(id) {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await db('users').where({ id }).update({ emailVerificationToken: verificationToken, isEmailVerified: false });
    return verificationToken;
  },

  async verifyEmail(token) {
    const user = await db('users').where({ emailVerificationToken: token }).first();
    if (!user) {
      throw new Error('Invalid verification token');
    }
    await db('users').where({ id: user.id }).update({
      emailVerificationToken: null,
      isEmailVerified: true,
    });
  },
};

module.exports = User;