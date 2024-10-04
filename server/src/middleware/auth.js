const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Error decoding token:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;