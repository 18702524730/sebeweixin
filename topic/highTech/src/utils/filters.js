var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        //日期转yyyy-mm-dd格式
        format: function (input, type) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "--";
            }
            var _date = new Date(input);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
            var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
            if(type == "date"){
                return year + "-" + month + "-" + day;
            } else {
                return year + "-" + month + "-" + day;
            }
            return "--";
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        },
        //日期转时间戳
        timeStamp:function(date){
            var timestamp = Date.parse(new Date(date));
            timestamp = timestamp / 1000;
            return timestamp
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
            } else {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
            }
            return "--";
      }
    },
    //订单状态
    orderStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '-1':
          ret = "已关闭";
          break;
        case '0':
          ret = "待付款";
          break;
        case '1':
          ret = "已付款";
          break;
        case '2':
          ret = "已完成";
          break;
      }
      return ret;
    },
    //支付状态
    payStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '0':
          ret = "未支付";
          break;
        case '1':
          ret = "已支付";
          break;
      }
      return ret;
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
    //价格转换为万元
    priceUnitFilter(td){
      var ret = td/10000+'';
      if(ret.indexOf('.') !== -1){
        ret = (ret-0).toFixed(2);
        ret = ret.replace(/((\.0{1,2})|0)$/, '');
      }
      return ret;
    },
    refundStateFilter(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "待受理";
          break;
        case '1':
          ret = "退款中";
          break;
        case '2':
          ret = "已退款";
          break;
        case '3':
          ret = "已驳回";
          break;
      }
      return ret;
    },
    notarizationStatusformat(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "待存证";
          break;
        case '1':
          ret = "存证中";
          break;
        case '2':
          ret = "存证失败";
          break;
        case '3':
          ret = "存证成功";
          break;
      }
      return ret;
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
    fileSizeFilter(v){
      if (!v) {
        return '';
      }
      var ret = v;
      if (v > 1024*1024) {
        ret = (ret/1024/1024).toFixed(1) + 'M';
      }else{
        var t = (ret/1024).toFixed(1);
        ret = (t === '0.0' ? '0.1' : t) + 'KB';
      }
      return ret;
    },
    formatPatent:{
        //专利类型转换
        format: function (input) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "";
            }else{
                switch (input){
                    case 1:
                        return "发明专利";
                    case 2:
                        return "实用新型专利";
                    case 3:
                        return "外观设计专利";
                }
            }
        }
    },
    formatIPRClassify:{
        //知产分类转换
        format: function (input) {
            switch (input){
                case 0:
                    return "商标";
                case 1:
                    return "专利";
            }
        }
    },
    formatStatus:{
        //会员状态转换
        format: function (input) {
            switch (input){
                case false:
                    return 0;
                case true:
                    return 1;
            }
        }
    },
    //申请主体类型
    formatApplySbj:{
      format: function (input) {
        switch (input){
          case 1:
            return "大陆个体";
          case 2:
            return "大陆企业";
          case 3:
            return "境外个体";
          case 4:
            return "境外企业";
        }
      }
    },
    titleLengthFormat (input) {
      if (input && input.length>46) {
        return input.slice(0,45)+'...';
      }
      return input;
    }
};
