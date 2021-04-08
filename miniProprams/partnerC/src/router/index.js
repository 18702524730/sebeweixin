const authorize = require('./authorize.js')
const order = require('./order.js');//订单
const store = require('./store.js');//店
const my = require('./my.js');//我的
const outpatient = require('./outpatient.js')//门诊室
const toolbox = require('./toolbox.js') //工具箱
// const pearlInvite = require('./pearlInvite.js')

module.exports = [].concat(
  store,
  authorize,
  order,
  my,
  outpatient,
  toolbox,
	// pearlInvite,
);
