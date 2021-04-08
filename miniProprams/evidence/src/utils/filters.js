const filters = {
  // 将字符串除了前几位和后几位之外的转为星号
  strToStar (str, start, end) {
    let arr = str.split('');
    let start_ = start-1 || 0;
    let end_ = end+1 || 0;
    arr.forEach( (item, index) => {
      if (index>start_ && index<(arr.length-end_)) {
        arr[index] = '*';
      }
    })
    return arr.join('');
  },
  // 提现方式
  cahsType (input) {
    switch (input){
      case 0:
        return "银行卡";
    }
  },
  // 提现状态
  cahsStatu (input) {
    switch (input){
      case 0:
        return "审核中";
      case 1:
        return "审核成功";
      case -1:
        return "审核失败";
    }
  },
  //作业类型
   jobType: function(input){
    switch (input){
      case 0:
        return "自行作业";
      case 1:
        return "平台作业";
      case 2:
        return "平台派单";
    }
  },
  //日期格式转换
  dateFormat: function (input,type) {
      if(input == null || input=='' || typeof(input) == "undefined"){
          return "--";
      }
      var _date = new Date(input);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      if(type == "date"){
          return year + "-" + month + "-" + day;
      } else if(type == "time") {
          return hour + ":" + minutes + ":" + seconds;
      }
      else if (type == 'yyy-MM-dd') {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
      }
      else {
        return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + seconds;
      }
      return "--";
  },
  //日期格式转换
  dateFormatHM: function (input,type) {
      if(input == null || input=='' || typeof(input) == "undefined"){
          return "--";
      }
      var _date = new Date(input);
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      if(type == "date"){
          return hour + ":" + minutes;
      } else if(type == "time") {
          return hour + ":" + minutes;
      }
      else if (type == 'yyy-MM-dd') {
        return hour + ":" + minutes;
      }
      else {
        return hour + ":" + minutes;
      }
      return "--";
  },
  feedbackCode:function(input){
    switch (input){
      case 'sbfw_gnsb_zs_created':
        return "服务单已生成";
      case 'sbfw_gnsb_zs_wait':
        return "待接单";
      case 'sbfw_gnsb_zs_ing':
        return "服务商已接单";
      case 'sbfw_gnsb_zs_confirmed':
        return "已接单待提交";
      case 'sbfw_gnsb_zs_submit':
        return "已提交待确认";
    }
  },
  //申请主体类型
  format: function (input) {
    switch (input){
      case 1:
        return "大陆个体";
      case 2:
        return "大陆企业";
      case 3:
        return "港澳台及境外个人";
      case 4:
        return "港澳台及境外企业";
      case 5:
        return "大陆个人";
    }
  },
  formatName: function (input) {
    switch (input){
      case 1:
        return "申请人";
      case 2:
        return "企业";
      case 3:
        return "申请人";
      case 4:
        return "企业";
      case 5:
        return "申请人";
    }
  },
  orderServiceState:function(input){
    switch (input){
      case 1:
        return "待服务";
      case 2:
        return "服务中";
      case 3:
        return "服务完成";
      case 4:
        return "服务关闭";
    }
  },
  hidePhoneByStar (phone) {
    return phone.replace(/(\d){3}(\d){4}(\d){3}/, '$1-$3')
  },
  //价格保留两位小数
  priceformat: function (input) {
    var ret = '';
    // input 有可能是数字0
    if (input !== null && input !== undefined) {
      ret = input - 0 +'';
      if(ret === 0){
        ret = 0;
      }else{
        ret = (ret-0).toFixed(2);
      }
    }
    return ret;
  },
  czChannelFormat: function (input) {
    switch (input){
      case 1:
        return "司法鉴定存证";
      case 2:
        return "公证存证";
      case 3:
        return "公证存证";
      case 4:
        return "公证存证";
      case 5:
        return "司法鉴定存证";
    }
  },
  publishQy:function (input) {
    switch (input){
      case 0:
        return "创作完成，未上线";
      case 1:
        return "网络发表";
      case 2:
        return "已出版";
      case 3:
        return "已上线";
    }
  },
  notarizationUsesformat(input){
    var ret = ''
    switch (input+''){
      case '1':
        ret = "电商维权";
        break;
      case '2':
        ret = "自媒体内容维权";
        break;
      case '3':
        ret = "设计作品未经授权发布";
        break;
      case '4':
        ret = "文字创作存证";
        break;
      case '5':
        ret = "美术作品存证";
        break;
      case '6':
        ret = "音乐作品存证";
        break;
      case '7':
        ret = "影像摄影存证";
        break;
      case '8':
        ret = "其他";
        break;
    }
    return ret;
  },
}
export default {
  filters
}
