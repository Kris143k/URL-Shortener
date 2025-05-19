//const sessionToUserMap = new Map();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('../models/user');

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'defaultsecretkey';

// function setUser(id, user) {
//   sessionToUserMap.set(id, user);
// }
async function getUser(token) {
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    return user;
  } catch (err) {
    return null;
  }
}

// function getUser(id) {
//   return sessionToUserMap.get(id);
// }
function getUser(token) {
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (err) {
    return null;
  }
}

module.exports = {
    setUser,
    getUser
};
