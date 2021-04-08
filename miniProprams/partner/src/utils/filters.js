const filters = {
  // 将字符串除了前几位和后几位之外的转为星号
  strToStar (str, start, end) {
    let arr = str.split('');
    let start_ = start-1 || 0;
    let end_ = end || 0;
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
      case 1:
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
      else if (type == 'yyyy-MM-dd') {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
      }
      else {
        return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + seconds;
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
  worksState:function(input){
    if(!input){
      input = 0;
    }
    switch (input){
      case 0:
        return "待提交客户";
      case 1:
        return "已提交待确认";
      case 2:
        return "已确认待付款";
      case 3:
        return "待审核";
      case 4:
        return "审核通过";
      case 5:
        return "审核不通过";
      case 8:
        return "待完善材料";
      case 9:
        return "用户退回";
    }
  },
  demandStates:function(input){//需求状态
    if(!input){
      input = 0;
    }
    switch (input){
      case 0:
        return "待处理";
      case 1:
        return "处理中";
      case 2:
        return "已完成";
      case -1:
        return "已关闭";
    }
  },
  orderStates:function(input){//订单状态
    if(!input){
      input = 0;
    }
    switch (input){
      case 0:
        return "待付款";
      case 1:
        return "已付款";
      case -1:
        return "已关闭";
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
}
export default {
  filters
}
