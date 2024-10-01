const cron = require('node-cron');
const Story = require('../models/story');

// Schedule to run every hour
cron.schedule('0 * * * *', async () => {
    try {
        await Story.deleteExpired();
        console.log('Expired stories cleaned up');
    } catch (error) {
        console.error('Error cleaning up stories:', error);
    }
});