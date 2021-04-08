<template>
  <div class="prize_page1">
    <div class="specail">
      <!-- <div class="head">
        <img src='~assets/img/logo.jpg' class='head-logo'>
        <p class="order-title">我的订单</p>
      </div> -->
      <div class="body">
        <div class="prize_act">
          <div id="lottery">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                  <td class="lottery-unit lottery-unit-1"><div><span><img class="wimg" src="~assets/img/prize/p/1.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-2"><div><span><img class="himg" src="~assets/img/prize/p/2.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-3"><div><span><img class="himg" src="~assets/img/prize/p/3.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-4"><div><span><img class="himg" src="~assets/img/prize/p/4.png"></span></div></td>
              </tr>
              <tr>
                  <td class="lottery-unit lottery-unit-12"><div><span><img class="himg" src="~assets/img/prize/p/12.png"></span></div></td>
                  <td colspan="2" rowspan="2" class="abtn">
                    <a href="javascript:void(0);">
                      <img src="~assets/img/prize/btn.png">
                    </a>
                    <p class="remainp">剩余<b class="remain">0</b>次抽奖机会</p>
                  </td>
                  <td class="lottery-unit lottery-unit-5"><div><span><img class="himg" src="~assets/img/prize/p/5.png"></span></div></td>
              </tr>
              <tr>
                  <td class="lottery-unit lottery-unit-11"><div><span><img class="wimg" src="~assets/img/prize/p/11.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-6"><div><span><img class="wimg" src="~assets/img/prize/p/6.png"></span></div></td>
              </tr>
              <tr>
                  <td class="lottery-unit lottery-unit-10"><div><span><img class="wimg" src="~assets/img/prize/p/13.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-9"><div><span><img class="wimg" src="~assets/img/prize/p/9.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-8"><div><span><img class="wimg" src="~assets/img/prize/p/8.png"></span></div></td>
                  <td class="lottery-unit lottery-unit-7"><div><span><img class="wimg" src="~assets/img/prize/p/7.png"></span></div></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="myprize">
          <h3>我的奖品</h3>
          <!-- <div class="jp">
            <div class="jg-wrap">
              <p><span class="fl">Macbook Pro 1 台</span><span class="fr">2017-8-4 14:24:35</span></p>
            </div>
            <div class="jg-wrap">
              <p><span class="fl">Macbook Pro 1 台</span><span class="fr">2017-8-4 14:24:35</span></p>
            </div>
          </div> -->
        </div>
        <div class="result">
          <h3>获奖名单</h3>
          <div class="jg-wrap" id="result-all">
            <!-- <p><span class="fl">187XXXX1313</span><span class="fr">Macbook Pro 1 台</span></p>
            <p><span class="fl">187XXXX1313</span><span class="fr">Macbook Pro 1 台</span></p>
            <p><span class="fl">187XXXX1313</span><span class="fr">Macbook Pro 1 台</span></p> -->
          </div>
        </div>
        <div class="rule">
          <h3>活动规则</h3>
          <div class="jg-wrap">
            <p>
              一、活动时间：<br>
              2017年8月9日-8月31日 <br><br>
              二、参与对象： <br>
              1.所有本网站注册用户均可参与抽奖，每个ID每天可获得3次抽奖机会，抽奖机会不可累积；<br>
              2.所有本网站注册用户每成功下单1次，可获得10次抽奖机会，抽奖机会可累积，至活动结束后清空；<br> <br>
              三、奖品发放： <br>
              1.活动中奖结果均以系统自动下发的中奖通知为准； <br>
              2.本抽奖活动奖品包括实物（苹果系列产品、Kindle）、虚拟（京东E卡、手机话费、流量）两类； <br>
              - 实物奖品请在中奖后的3个工作日内联系客服提供联系电话、联系地址等信息；过期未提供相关信息者，视为自动放弃奖品；<br>
              - 实物奖品将通过顺丰快递邮寄，顺丰快递无法到达的地方将由中国邮政EMS或其他快递公司邮寄； <br>
              - 手机话费/流量将统一充值至用户注册手机号，若需充值至其他手机号，请在中奖后的3个工作日内联系客服；因用户原因导致充值错误，需用户自行承担后果；<br>
              - “京东E卡”将统一以短信形式发送至用户注册手机号，若需发送至其他手机号，请在中奖后的3个工作日内联系客服；因用户原因导致短信发送错误，需用户自行承担后果； <br>
              - “1元爱心捐款”奖品将由杭州拾贝知识产权服务有限公司统一于活动结束后捐至四川慈善总会，用以地震救灾；<br>
              3.所有奖品将在本抽奖活动结束后的5个工作日内发放；<br> <br>
              四、本活动的最终解释权归本网站所有。<br>
            </p>
          </div>
        </div>
      </div>
      <img class="foot-pic" src="~assets/img/prize/bt_bg.jpg" width="100%">
    </div>
    <div class="pop" v-show="show">
      <div class="ok" v-if="isOk">
        <div class="close" @click.prevent="show=false"></div>
        <h3>恭喜您</h3>
        <img :src="prizeImg">
        <p v-if="prize.prize == 13">您已成功为九寨沟灾区人民捐款1元，感谢您的支持。</p>
        <p v-else>恭喜您获得{{prize.prizeName}}，奖品将于活动结束后的5个工作日内发出，敬请期待。</p>
        <a href="" @click.prevent="again">再抽一次</a>
      </div>
      <div class="no" v-if="isNo">
        <div class="close" @click="show=false"></div>
        <p>没中哦，好运转到下次了</p>
        <a href="" @click.prevent="again">再抽一次</a>
      </div>
      <div class="over" v-if="isOver">
        <div class="close" @click="show=false"></div>
        <p>您今天的机会已经用完了~<br>请明天再来</p>
        <a href="#/">去下单</a>
      </div>
      <div class="timeover isTimeover" v-if="isTimeover">
        <div class="close" @click="show=false"></div>
        <p>活动已结束，谢谢您的参与</p>
        <a href="#/">去下单</a>
      </div>
      <div class="timeover nostart" v-if="isNostart">
        <div class="close" @click="show=false"></div>
        <p>活动未开始，敬请关注</p>
        <a href="#/">去下单</a>
      </div>
      <div class="timeover nologin" v-if="isNologin">
        <div class="close" @click="show=false"></div>
        <p>对不起，您还未登录哦~</p>
        <a href="#login" @click.prevent="gotoLogin">去登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import img1 from 'assets/img/prize/p/1.png'
  import img2 from 'assets/img/prize/p/2.png'
  import img3 from 'assets/img/prize/p/3.png'
  import img4 from 'assets/img/prize/p/4.png'
  import img5 from 'assets/img/prize/p/5.png'
  import img6 from 'assets/img/prize/p/6.png'
  import img7 from 'assets/img/prize/p/7.png'
  import img8 from 'assets/img/prize/p/8.png'
  import img9 from 'assets/img/prize/p/9.png'
  import img10 from 'assets/img/prize/p/13.png'
  import img11 from 'assets/img/prize/p/11.png'
  import img12 from 'assets/img/prize/p/12.png'
  const cartUrl = CONFIG.cartUrl;
  const imgObj = {
    img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12
  }


  export default {
    data () {
      return {
        prizeImg:'',
        prize:{},
        show: false,
        isOk: true,
        isNo: false,
        isOver: false,
        isNostart: false,
        isNologin:false,
        isLogin: false,
        isTimeover:false
      }
    },
    methods: {
      init () {
        var self = this;
        var lottery = {
          index: 0, //当前转动到哪个位置，起点位置
          count: 0, //总共有多少个位置
          timer: 0, //setTimeout的ID，用clearTimeout清除
          speed: 20, //初始转动速度
          times: 0, //转动次数
          cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
          prize: 0, //中奖位置
          init: function(id) {
            if ($("#" + id).find(".lottery-unit").length > 0) {
              var $lottery = $("#" + id);
              var $units = $lottery.find(".lottery-unit");
              this.obj = $lottery;
              this.count = $units.length;
              $lottery.find(".lottery-unit-" + this.index).addClass("active");
            }
          },
          roll: function() {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-" + index).removeClass("active");
            index += 1;
            if (index > count) {
              index = 0;
            }
            $(lottery).find(".lottery-unit-" + index).addClass("active");
            this.index = index;
            return false;
          },
          stop: function(index) {
            this.prize = index;
            return false;
          }
        };

        function roll() {
          lottery.times += 1;
          lottery.roll();
          var prize_site = $("#lottery").attr("prize_site");
          if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
            var prize_id = $("#lottery").attr("prize_id");
            var prize_name = $("#lottery").attr("prize_name");
            self.show = true;
            getMyprize();
            //alert("前端中奖位置："+prize_site+"\n"+"中奖名称："+prize_name+"\n中奖id："+prize_id)
            clearTimeout(lottery.timer);
            lottery.prize = -1;
            lottery.times = 0;
            click = false;

          } else {
            if (lottery.times < lottery.cycle) {
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) {
                var index = Math.random() * (lottery.count) | 0;
                lottery.prize = index;
            } else {
                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 20;
                }
            }
            if (lottery.speed < 40) {
                lottery.speed = 40;
            }
            lottery.timer = setTimeout(roll, lottery.speed);
          }
          return false;
        }

        var click = false;

        //获取剩余抽奖次数，同时判断是否登陆状态
        var getRemain = function(){
          $.get(cartUrl+ "/luckdraw/mychangce.htm?access_token="+self.$cookie.get('user_token'), function(data) {
            self.isLogin = true
            if (data.code == 0) {
              $('.remain').html(data.data);
            }else if(data.code == '0100001' || data.code == '0100002'){
              self.reset();
              self.isLogin = false;
              self.isNologin = true;
              self.show = true;
              setTimeout(function(){
                $('.pop .nologin').addClass('cur');
              },100);
            }else if(data.code == '0100008'){
              self.reset();
              self.isNostart = true;
              self.show = true;
              setTimeout(function(){
                $('.pop .nostart').addClass('cur');
              },100);
            }else if(data.code == '0100006'){
              self.reset();
              self.isTimeover = true;
              self.show = true;
              setTimeout(function(){
                $('.pop .isTimeover').addClass('cur');
              },100);
            }
          })
        }


        var getMyprize = function(){
          $.get(cartUrl+ "/luckdraw/myprize.htm?access_token="+self.$cookie.get('user_token'), function(data) {
            if (data.code == 0) {
              var arr = data.data;
              var str = '<h3>我的奖品</h3>';
              if (!arr || !arr.length) {
                str += '<div class="jg-wrap"><p><span class="fl">暂无奖品</span></p></div>';
              }else{
                $.each(arr, function(i, item){
                  str += '<div class="jg-wrap"><p><span class="fl">'+item.prizeName+'</span><span class="fr">'+item.createTime+'</span></p></div>';
                });
              }
              $('.myprize').html(str);
            }else{
              $('.myprize').html('<h3>我的奖品</h3><div class="jg-wrap"><p><span class="fl">暂无奖品</span></p></div>');
            }
          })
        }

        var getPrizeRusult = function(){
          $.get(cartUrl+ "/luckdraw/luckyList.htm?access_token="+self.$cookie.get('user_token'), {
            pageNo: 1,
            pageSize: 20,
          }, function(data) {
            if (data.code == 0) {
              var arr = data.data;
              var str = '';
              $.each(arr, function(i, item){
                str += '<p><span class="fl">'+item.registerPhone+'</span><span class="fr">'+item.prizeName+'</span></p>';
              });
              $('#result-all').html(str);
            }else{
              $('#result-all').html('<p><span class="fl">暂无获奖名单</span></p>');
            }
          })
        }

        $(function() {
          $('body,html').animate({scrollTop: 0}, 50, 'swing');
          $.ajaxSetup({
            headers: {
              "Authorization" : self.$cookie.get('user_token')
            },
            xhrFields: {
              withCredentials: true
            }
          });
          getRemain();
          getMyprize();
          getPrizeRusult();
          lottery.init('lottery');

          $("#lottery a").click(function() {
            if (click) {
              return;
            }
            if (!self.isLogin) {
              self.reset();
              self.isNologin = true;
              self.show = true;
              setTimeout(function(){
                $('.pop .nologin').addClass('cur');
              },100)
              return;
            }
            if ($('.remain').html()<1) {
              self.reset();
              self.show = true;
              self.isOver = true;
              click = false;
              setTimeout(function(){
                $('.pop .over').addClass('cur');
              },100)
              return;
            }
            click = true;
            lottery.speed = 100;
            $.post(cartUrl+ "/luckdraw/go.htm?access_token="+self.$cookie.get('user_token'), function(data) { //获取奖品，也可以在这里判断是否登陆状态
                //$('html,body').addClass('overHidden'); //使网页不可滚动
                //$('html,body').removeClass('overHidden'); //使网页恢复可滚动
                if (data.code == '0') {
                  roll();
                  var d = data.data;
                  $('.remain').html(d.count);
                  self.prize = d;
                  self.prizeImg = imgObj['img'+ (d.prize == 13 ? 10 : d.prize)];
                  self.reset();
                  if (d.prize == 12) {
                    self.isNo = true;
                    setTimeout(function(){
                      $('.pop .no').addClass('cur');
                    },100)
                  }else{
                    self.isOk = true;
                    setTimeout(function(){
                      $('.pop .ok').addClass('cur');
                    },100)
                  }
                  $("#lottery").attr("prize_site",d.prize == 13 ? 10 : d.prize);
                  $("#lottery").attr("prize_id", d.prize);
                  $("#lottery").attr("prize_name", d.prizeName);
                }else if(data.code == '0100001' || data.code == '0100002'){
                  self.reset();
                  self.isNologin = true;
                  self.show = true;
                  setTimeout(function(){
                    $('.pop .nologin').addClass('cur');
                  },100)
                  click = false;
                }else if(data.code == '0100008'){
                  self.reset();
                  self.isNostart = true;
                  self.show = true;
                  setTimeout(function(){
                    $('.pop .nostart').addClass('cur');
                  },100)
                  click = false;
                }else if(data.code == '0100006'){
                  self.reset();
                  self.isTimeover = true;
                  self.show = true;
                  setTimeout(function(){
                    $('.pop .isTimeover').addClass('cur');
                  },100)
                  click = false;
                }else if(data.code == '0100007'){
                  self.reset();
                  self.isOver = true;
                  setTimeout(function(){
                    $('.pop .over').addClass('cur');
                  },100)
                  click = false;
                }
            }, "json")
          });
        })
      },
      reset(){
        this.isOk = false;
        this.isNo = false;
        this.isOver = false;
        this.isNostart = false;
        this.isNologin = false;
        this.isTimeover = false;
        $('.pop > div').removeClass('cur');
      },
      gotoLogin(){
        this.$router.push({name:'smsLogin', query:{return_url:location.href}});
      },
      again(){
        $("#lottery a").click();
        this.reset();
        this.show = false;
      }
    },
    mounted(){
      this.init();
    },

    watch: {

    }
  }

</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .prize_page1{
    height: 100%;
    background: linear-gradient(90deg, #8b319c 0, #8531a1 100%);
    .head {
      clear: both;
      position: relative;
      height: px(88);
      background: rgba(44,45,49,0.90);
      .head-logo {
        position:absolute;
        top: px(30);
        left: px(30);
        width: px(197.3);
        height:px(27.1);
      }
      .order-title {
        position: absolute;
        top: px(22);
        right: px(30);
        height: px(45);
        line-height: px(45);
        font-size: px(32);
        color: #fff;
      }
    }

    .body {
      position: relative;
      background: #f43249 url(~assets/img/prize/bg.png) 0 0 no-repeat;
      background-size: 100%;
      padding-top: px(397);
      padding-bottom: px(50);
      h3 {
        width:px(457);height: px(73);margin:0 auto px(45);line-height: px(73);font-size: px(38);color: #fff;background: transparent url(~assets/img/prize/til_bg.png) 0 0 no-repeat;background-size: 100%;text-align: center;
      }
      .jg-wrap{background-color: rgba(255, 212, 80, 0.2);border-radius: px(12);min-height: px(120);margin: 0 px(30) px(25);}
      .jg-wrap p span:first-child{text-align: right;max-width: px(260);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
      .jg-wrap p span:last-child{text-align: right;max-width: px(390);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
      .prize_act{
        width:100%;height: px(688);padding-left: px(71);padding-top: px(45);
        #lottery{width:px(630);height:px(630);}
        #lottery table td{text-align:center;vertical-align:middle;font-size:px(24);color:#333;font-index:-999}
        #lottery table td div span{width:px(135);height:px(135);line-height:px(135);display: block;background-color: #fff;border-radius: px(5);overflow: hidden;display: table-cell;}
        #lottery table td div{width:px(142);height:px(142);margin-right:px(12);margin-bottom:px(10);background: #fff url(~assets/img/prize/p_bg.png) right bottom no-repeat;border-radius: px(5);background-size: 100% 100%;}
        #lottery table td img{line-height:px(135);display: inline-block;}
        #lottery table td img.wimg{width:px(135);vertical-align: middle;}
        #lottery table td img.wimg1{margin-top: px(14)}
        #lottery table td img.himg{height:px(100);vertical-align: middle;}
        #lottery table td.abtn{vertical-align: top;position: relative;}
        #lottery table td.abtn a{width: px(298);height: px(296);display: block;border-radius: px(5);}
        #lottery table td.abtn a:active{width: px(292);height: px(289);overflow: hidden;text-decoration: none;}
        #lottery table td.abtn a img{width: px(298);}
        #lottery table td.active div{background: transparent;}
        #lottery table td.active div span{background-color:#ffe094;}
        #lottery table td .remainp{position: absolute;color:#832ea4;width:100%;top:px(220);font-size: px(27);font-weight: bold;}
      }
      .myprize{
        width:100%;margin-top: px(91);
        .jg-wrap{
          padding:0 px(42);
          p{
            color: #fff;font-size: px(28);height: px(120);line-height: px(120);
            .fr{float: right;}
            .fl{float: left;}
          }
        }
      }
      .result{
        width:100%;margin-top: px(60);
        .jg-wrap{
          padding:px(36) px(42);
          p{
            color: #fff;font-size: px(28);height: px(70);line-height: px(70);
            .fr{float: right;}
            .fl{float: left;}
          }
        }
      }
      .rule{
        width:100%;margin-top: px(60);
        .jg-wrap{
          margin-bottom: 0;
          p{padding:px(45);color: #fff;font-size: px(24);line-height: px(42)}
        }
      }
    }
    .foot-pic {width: 100%; margin-bottom: -1px;}
    .pop{
      width:100%;height: 100%;position: fixed;top: 0;left:0;background-color: rgba(0, 0, 0, 0.2);text-align: center;
      .close{
        width:px(86);height: px(86);background: transparent url(~assets/img/prize/chacha.png) 0 0 no-repeat;background-size:100% 100%;
      }
      .ok{
        width:100%;height: px(952);background: transparent url(~assets/img/prize/ok_bg.png) 0 0 no-repeat;background-size:100% 100%;position: relative;padding-top:px(400);text-align: center;margin-top:-100%;
        .close{position: absolute;right:px(32);top:px(256); }
        h3{font-size: px(58);color: #f43249;text-align: center; }
        img{width: px(245);}
        p{width: px(480);margin:0 auto;font-size: px(30);line-height: px(52);}
        a{display: block;width:px(348);height: px(87);margin:0 auto;line-height: px(79);background: transparent url(~assets/img/prize/button.png) 0 0 no-repeat;background-size:100% 100%;font-size: px(38);color: #fff;text-align: center;margin-top: px(22)}
      }
      .no{
        margin:0 auto;width:px(636);height: px(492);background: transparent url(~assets/img/prize/no_bg.png) 0 0 no-repeat;background-size:100% 100%;position: relative;padding-top:px(220);text-align: center;margin-top: -100%; transition: margin-top 0.2s ease;
        .close{position: absolute;right:px(-16);top:px(60); }
        p{width: px(480);margin:0 auto;font-size: px(32);line-height: px(52);}
        a{display: block;width:px(348);height: px(87);margin:px(30) auto 0;line-height: px(79);background: transparent url(~assets/img/prize/button.png) 0 0 no-repeat;background-size:100% 100%;font-size: px(38);color: #fff;text-align: center;margin-top: px(22)}
      }
      .over{
        margin:0 auto;width:px(636);height: px(530);background: transparent url(~assets/img/prize/over_bg.png) 0 0 no-repeat;background-size:100% 100%;position: relative;padding-top:px(240);text-align: center;margin-top: -100%; transition: margin-top 0.2s ease;
        .close{position: absolute;right:px(-16);top:px(60); }
        p{width: px(480);margin:0 auto;font-size: px(32);line-height: px(52);}
        a{display: block;width:px(348);height: px(87);margin:px(30) auto;line-height: px(79);background: transparent url(~assets/img/prize/button.png) 0 0 no-repeat;background-size:100% 100%;font-size: px(38);color: #fff;text-align: center;margin-top: px(22)}
      }
      .timeover{
        margin:0 auto;width:px(630);height: px(398);background: transparent url(~assets/img/prize/time_bg.png) 0 0 no-repeat;background-size:100% 100%;position: relative;padding-top:px(120);text-align: center;margin-top: -100%; transition: margin-top 0.2s ease;
        .close{position: absolute;right:px(-16);top:px(-32); }
        p{width: px(480);margin:0 auto;font-size: px(32);line-height: px(52);}
        a{display: block;width:px(348);height: px(87);margin:px(40) auto;line-height: px(79);background: transparent url(~assets/img/prize/button.png) 0 0 no-repeat;background-size:100% 100%;font-size: px(38);color: #fff;text-align: center;margin-top: px(22)}
      }
      .ok.cur{margin-top: 0;transition: margin-top 0.4s ease-out;}
      .no.cur,.over.cur,.timeover.cur{margin-top: 50%;transition: margin-top 0.4s ease-out;}
      a:hover,a:active{text-decoration: none;}
    }



  }
  .className{
    -webkit-animation: twinkling 1s infinite ease-in-out
  }
  .animated{
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  @-webkit-keyframes twinkling{
    0%{
      opacity: 0.5;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes twinkling{
    0%{
      opacity: 0.5;
    }
    100%{
      opacity: 1;
    }
  }
</style>
<style>
  .overHidden{overflow: hidden;height: 100%;}
</style>
