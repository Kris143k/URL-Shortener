//const sessionToUserMap = new Map();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'defaultsecretkey';

// function setUser(id, user) {
//   sessionToUserMap.set(id, user);
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