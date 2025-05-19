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
function setUser(user) {
  const token = jwt.sign({
    email: user.email,
    name: user.name,
    id: user._id,
    roles: user.roles,
  }, secret);
  return token;
}

module.exports = {
    setUser,
    getUser
};
