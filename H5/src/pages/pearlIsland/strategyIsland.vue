<template>
<div class="strategy">
  <div class="strategy_image">
    <img src="~assets/img/pearlIsland/strategy_name.png" alt="">
  </div>
  <!-- 任务 -->
  <div class="strategy_list strategy_list_first">
    <p><i class="mr10"></i><span>珍珠任务</span></p>
    <div class="lists mt30">
      <div class="list_l">
        <p class="task_name mr10">邀请他人完成注册</p>
        <img src="~assets/img/pearlIsland/pearls.png" alt="">
        <p class="task_num ml5">+10</p>
      </div>
      <div class="list_r" @click="ToMy">
        <p>去邀请</p>
      </div>
    </div>
    <div class="lists mt30">
      <div class="list_l">
        <p class="task_name mr10">邀请他人完成开店</p>
        <img src="~assets/img/pearlIsland/pearls.png" alt="">
        <p class="task_num ml5">+30</p>
      </div>
      <div class="list_r" @click="ToMy">
        <p>去邀请</p>
      </div>
    </div>
    <div class="lists mt30">
      <div class="list_l">
        <p class="task_name mr10">完成开店</p>
        <img src="~assets/img/pearlIsland/pearls.png" alt="">
        <p class="task_num ml5">+50</p>
      </div>
      <div v-if="isHaveStore==1" class="list_r">
        <p>已开店</p>
      </div>
      <div v-else class="list_r" @click="ToOpenShop">
        <p>去开店</p>
      </div>
    </div>
    <div class="lists mt30">
      <div class="list_l_shop">
        <p class="task_name mr10">购买平台服务</p>
        <img src="~assets/img/pearlIsland/pearls.png" alt="">
        <p class="task_num ml5">订单金额*0.1*随机数</p>
      </div>
      <div class="list_r" @click="ToShop">
        <p>去下单</p>
      </div>
    </div>
    <p class="mt30"><i class="mr10"></i><span>创力任务</span></p>
    <div class="lists mt30" style="border-bottom:0;">
      <div class="list_l_shop">
        <p class="task_name mr10">分享任意小程序页面</p>
        <img class="administer" src="~assets/img/pearlIsland/administer.png" alt="">
        <p class="task_num">+10/每次点击</p>
      </div>
      <div class="list_r" @click="ToHomePage">
        <p>去分享</p>
      </div>
    </div>
  </div>
  <!-- 详则 -->
  <div class="IPT_reg">
    <p class="reg_title">珍珠获得详则</p>
    <div class="reg_info">
      <p class="info_tit mt30 ml25">获得珍珠有2种途径：</p>
      <p class="info_tit mt20 ml25">1.日常点击领取,珍珠获得规则与所持创力正相关</p>
      <p class="info_tit mt20 ml25">2.根据用户对生态的贡献,系统自动发放珍珠,发放规则 如下：</p>
      <div class="info_list mt40">
        <div class="list_image">
          <img src="~assets/img/pearlIsland/pp.png" alt="">
          <p class="mt10">合伙人</p>
        </div>
        <div class="list_text">
          <div class="list_l">
            <p class="first">行为</p>
            <p>注册</p>
            <p>邀请他人成功注册</p>
            <p>邀请他人成功开店</p>
            <p>成功开店</p>
            <p class="max_text">订单成交（服务验收）</p>
            <p class="maxH_text">完成服务</p>
          </div>
          <div>
            <p class="first">奖励珍珠数量</p>
            <p>20</p>
            <p>10</p>
            <p>30</p>
            <p>50</p>
            <p class="max_text">订单金额 * 0.1* （0.5~1.5随机数）</p>
            <p class="max_text">服务金额 * 0.1* （0.5~1.5随机数）</p>
          </div>
        </div>
      </div>


      <div class="info_list mt40">
        <div class="list_image list_image_padding">
          <img src="~assets/img/pearlIsland/apply.png" alt="">
          <p>创新主体</p>
        </div>
        <div class="list_text">
          <div class="list_l">
            <p class="first">行为</p>
            <p class="maxH">注册</p>
            <p class="maxH ta_l">订单成交（服务验收）</p>
          </div>
          <div>
            <p class="first">奖励珍珠数量</p>
            <p class="maxH">20</p>
            <p class="maxH">订单金额 * 0.1* （0.5~1.5随机数） </p>
          </div>
        </div>
      </div>
      <p class="info_footer ml25 mt30">注：</p>
      <p class="info_footer ml25 mt10"><span class="tit">• </span><span>以上为创世数量(当剩余珍珠数量大于等于5亿)明细表,当剩余数量减半时，对应发放数量同步减半；</span></p>
      <p class="info_footer ml25 mt10"><span class="tit">• </span><span>随机数均保留两位小数；</span></p>
      <p class="info_footer ml25 mt10"><span class="tit">• </span><span>涉及金额单位均为元；</span></p>
      <p class="info_footer ml25 mt10"><span class="tit">• </span><span>平台将根据运营需要合理增加或调整部分奖励行为节点。</span></p>
    </div>
    <p class="reg_title">创力获得详则</p>
    <p class="reg_txt ml25 mt30">获得创力有2种途径：</p>
    <p class="reg_txt ml25 mt20">1.日常登录行为，奖励20创力；</p>
    <p class="reg_txt ml25 mt20">2.分享小程序任一页面给好友，分享内容每被点击一次， 奖励10创力（同一用户每天点击只记录一次）。</p>
  </div>
  <!-- 弹框 二维码部分 -->
    <div class="dialog_pearl" v-if="dialogBol">
      <div class="dialog_info">
        <div class="header">
          <p>邀请好友</p>
          <img @click="dialogBol=false" src="~assets/img/pearlIsland/move.png" alt="">
        </div>
        <div class="pearl_num">
          <div class="num_info info_l">
            <img src="~assets/img/pearlIsland/ten.png" alt="">
            <p class="num">10<span>珍珠</span></p>
            <p class="wing">注册奖励</p>
          </div>
          <div class="num_info info_r">
            <img src="~assets/img/pearlIsland/thirty.png" alt="">
            <p class="num">30<span>珍珠</span></p>
            <p class="wing">开店奖励</p>
          </div>
        </div>
        <div class="footer">
          <img class="mb25 mt25" :src="codeImageUrl" alt="">
          <p>长按识别</p>
        </div>
      </div>
    </div>
</div>
</template>
<script>
  const wxUrl = CONFIG.wxUrl
  import wx from 'weixin-js-sdk';
  export default {
    data () {
      return {
        dialogBol:false,
        fromType:1,//判断来自B端还是C端，默认B端
        isHaveStore:1,//判断是否开店，默认开店
        codeImageUrl:'',//生成B端二维码
      }
    },
    mounted () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.isHaveStore = this.$cookie.get('isHaveStore')||0;
      this.fromType = this.$cookie.get('btnBol')||0;
      this.getCodeImg();
    },
    methods: {
      toPearlIsland(){//珍珠介绍页
        this.dialogBol = false;
        this.$router.push('/pearlIsland')
      },
      ToMy(){//回到我的页面
        if(this.fromType==1){
          wx.miniProgram.reLaunch({url: '/pages/index/my?share=1'});
        }else{
          this.dialogBol = true;
        }
      },
      ToOpenShop(){//去开店
        if(this.fromType==1){
          wx.miniProgram.reLaunch({url: '/pages/authorize/authorize'});
        }else{
          this.dialogBol = true;
        }
      },
      ToShop(){//去下单
        if(this.fromType==1){
          wx.miniProgram.reLaunch({url: '/pages/index/store'});
        }else{
          this.dialogBol = true;
        }
      },
      ToHomePage(){//去分享
        if(this.fromType==1){
          wx.miniProgram.reLaunch({url: '/pages/index/index'});
        }else{
          this.dialogBol = true;
        }
      },
      getCodeImg() {//生成二维码
        let data = {
          miniAppType:5,
          scene:this.$cookie.get('member_id')+'_c',
          path:'pages/authorize/authorize',
          width: 420,
          qrcodeType:2
        }
        this.$http.post(wxUrl+'/miniApp/createwxaqrcode.do',data)
        .then((resp)=>{
          this.codeImageUrl = resp.imageurl;
          console.log(resp)
        })
      },
    }
  }
</script>
<style lang="scss">
.strategy{background-color:#060c56;padding-bottom:45px;
  .strategy_image{background:url("~assets/img/pearlIsland/strategy_bgi.jpg") no-repeat;width:100%;height:395px;background-size:100% 395px;background-position:center;
    img{width:358px;height:155px;margin-left:20px;margin-top:70px;}  
  }
  .strategy_list_first{margin: -125px auto 30px;}
  .strategy_list{width:710px;padding:48px 30px;border-radius:20px;background-color:#fff;
    >p{
      span{font-size:36px;font-weight:bolder;color:#333;line-height: 50px;vertical-align: middle;display:inline-block;}
      i{width:8px;height:34px;background:linear-gradient(180deg,rgba(114,225,161,1) 0%,rgba(91,223,203,1) 100%);border-radius:3px;display:inline-block;vertical-align: middle;}
    }
    .lists{display:flex;flex-direction: row;align-items: center;justify-content: space-between;padding-bottom: 35px;border-bottom:1px solid #eee;
      .list_l_shop{
        p{font-size:28px;line-height:40px;vertical-align: middle;}
        .task_name{color:#333;}
        .task_num{color:#4C7EDB;display:inline-block;}
        img{width:51px;height:44px;vertical-align: middle;}
      }
      .list_l{display:flex;padding-top:13px;
        p{font-size:28px;line-height:40px;vertical-align: middle;}
        .task_name{color:#333;}
        .task_num{color:#4C7EDB;}
        img{width:51px;height:44px;vertical-align: middle;}
        img.administer{width:51px;height:58px;}
      }
      .list_r{
        p{width:140px;height:58px;background:linear-gradient(180deg,#72E1A1 0%,#5BDFCB 100%);border-radius:30px;font-size:30px;line-height:58px;color:#fff;text-align:center;}
      }
    }
  }


  .IPT_reg{width:710px;height:100%;margin:0 auto;border-radius:20px;background-color:#fff;padding-bottom:40px;
    .reg_title{font-size:36px;font-weight:bolder;color:#333;line-height: 50px;vertical-align: middle;padding-top:40px;padding-left: 30px;}
    .reg_txt{font-size:26px;line-height:37px;color:#333;width:650px;}
    .reg_info{width:100%;background-color:#fff;padding:35px 15px;
      .info_tit{font-size:26px;color:#333;line-height:35px;text-align:left;width:610px;}
      .info_list{border-top:1px solid #eee;display: flex;
        .list_image{padding:70px 15px 100px;border-right:1px solid #eee;border-bottom:1px solid #eee;width:230px;
          img{width:196px;height:284px;}
          p{font-size:32px;height:#666;text-align:center;line-height:45px;}
        }
        div.list_image_padding{padding:15px 0px 0px;
          img{width:217px;height:214px;}
        }
        .list_text{width:450px;display: flex;
          .list_l{width:225px;border-right:1px solid #eee;
            .ta_l{text-align:left;padding:33px 20px;}
          }
          div{
            p{width:225px;text-align:center;line-height:70px;border-bottom:1px solid #eee;font-size:24px;color:#666;}
            .first{color:#4C7EDB;}
            .max_text{line-height:33px;text-align:left;height:90px;padding:12px 0 12px 12px;}
            .maxH_text{padding:28px 0;line-height:33px;}
            p.maxH{padding:33px 0;line-height:33px;}
          }
        }
      }
      .info_footer{font-size:24px;color:#999;line-height:33px;
        span.tit{vertical-align: top;display:inline-block;width:20px;}
        span{width:610px;display:inline-block;vertical-align: bottom;}
      }
    }
  }
  .dialog_pearl{position: fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index: 100;
    .dialog_info{width:580px;margin:50% auto 0;background:url("~assets/img/pearlIsland/dialog_bgi.png") no-repeat;background-position:center;position: relative;border-radius:10px;transition:all 1.0s ease;animation: marginAnimation 0.3s ease-in forwards;
      @keyframes marginAnimation{
        0%{margin:200% auto 0;}
        100%{margin:50% auto 0;}
      }
      // 邀请好友部分
      .header{padding-top:40px;width:100%;
        p{font-size:36px;color:#fff;line-height:50px;text-align:center;}
        img{width:30px;height:30px;position: absolute;right:30px;top:40px;}
      }
      .pearl_num{display:flex;flex-direction: row;align-items: center;justify-content: space-between;padding:0 80px;margin-top:80px;
        .info_l{
          img{width:71px;height:80px;margin-top: 10px;margin-bottom: 9px;}
        }
        .info_r{
          img{width:120px;height:99px;}
        }
        .num_info{text-align:center;
          p{text-align:center;}
          .num{font-size:68px;line-height:1;color:#71E1A5;
            span{font-size:26px;}
          }
          .wing{font-size:28px;color:#fff;}
        }
      }
      .footer{text-align:center;
        img{width:210px;height:210px;border-radius:100%;}
        p{color:#fff;text-align:center;padding-bottom:38px;font-size:28px;line-height:40px;}
      }
    }
  }
}
</style>