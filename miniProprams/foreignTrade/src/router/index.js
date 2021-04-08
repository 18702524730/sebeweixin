
const my = require('./my.js');//我的
const homepage = require('./homepage.js')//首页
const message = require('./message.js') //咨询信息

module.exports = [].concat(
  homepage,
  my,
  message
  
	// pearlInvite,
);
