const { sequelize, User } = require('./models'); // Adjust the path as necessary

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Use alter to update the schema without dropping tables
    console.log('Database synced successfully.');
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Unique constraint error:', error.errors[0].message);
      // Additional handling logic here
    } else {
      console.error('Database sync error:', error);
    }
  }
}

syncDatabase();