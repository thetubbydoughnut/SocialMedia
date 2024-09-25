const authMiddleware = (req, res, next) => {
    // Authentication logic here
    console.log('Auth middleware');
    next();
};

module.exports = authMiddleware;