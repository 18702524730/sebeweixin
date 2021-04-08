export default class Lang {
  // 判断字符串是否为空
  static isEmpty(str) {
    return str == '' || str == null || str == 'null';
  }
  // 判断字符串是否不为空
  static isNotEmpty(str) {
    return !this.isEmpty(str);
  }
  // 浮点求和
  static sum(numbers, toFixed = 2) {
    let sum = 0;
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN;
      }
      const num = parseFloat(str);
      if (isNaN(num)) {
        return NaN;
      }
      sum += num;
    }
    return sum.toFixed(toFixed);
  }
  // 数字判断
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/;
    return patrn.test(value);
  }

  // 数字判断
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/;
    return patrn.test(value);
  }
  // 数组判断
  static isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }
  // 事件转日期
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.');
  }
  // 时间过滤器
  static TimeToDay(lists) {
    for(var i = 0; i < lists.data.length; i++){
      var _date = new Date(lists.data[i].create_time);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      lists.data[i].create_time = year + "-" + month + "-" + day;
    }
    return lists;
  }
  // 时间过滤器
  static TimeDaySeconds(lists) {
      var _date = new Date(lists);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      lists = year + "-" + month + "-" + day+ ' ' + hour + ':' + minutes + ':' + seconds;
    return lists;
  }
}
