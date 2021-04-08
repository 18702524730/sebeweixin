const homePage = require('./homePage.js');// 存证
const my = require('./my.js');// 我的
const certificate = require('./certificate.js');// 我的
const authorize = require('./authorize.js')

module.exports = [].concat(
  homePage,
  authorize,
  my,
  certificate
);
