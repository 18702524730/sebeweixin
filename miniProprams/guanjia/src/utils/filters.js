export default class filters {
   // 时间过滤器
  static TimeToDay(lists) {
    for(var i = 0; i < lists.length; i++){
      var _date = new Date(lists[i].createTime);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      lists[i].createTime = year + "-" + month + "-" + day;
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
      
      if(!lists){
        lists = '--';
      }else{
        lists = year + "-" + month + "-" + day+ ' ' + hour + ':' + minutes + ':' + seconds;
      }
    return lists;
  }
  // 时间过滤器（年月日）
  static dateFormateYMD(lists) {
      var _date = new Date(lists);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      if(!lists){
        lists = '--';
      }else{
        lists = year + "." + month + "." + day;
      }
    return lists;
  }
  // 时分秒时间过滤器
  static TimeDayHour(lists) {
      var _date = new Date(lists.createTime);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      
      if(!lists.createTime){
        lists = '--';
      }else{
        lists.createTime = month + "-" + day;
        lists.hourminutes = hour + ":" + minutes;
      }
    return lists;
  }
  // 时间过滤器-添加年份判断
  static pushTime(lists) {
    for(var i = 0; i < lists.length; i++){
      var _date = new Date(lists[i].createTime);
      console.log(_date)
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      lists[i].createTime = month + "-" + day;
      lists[i].hourminutes = hour + ":" + minutes;
      lists[i].years = year;
    }
    return lists;
  }
}
