<template>
  <div class="introductionW">
    <scroll-view class="column-center introduction" :scroll-y="true" @scroll="scroll">
      <img class="topImg" src="~assets/img/authorize/intro_01.jpg" mode="widthFix">
      <h3>开专属移动店铺，做自由新知产人！</h3>
      <p class="tip">基于保护赋能，建立在区块链上的合伙人计划</p>
      <div class="sec">
        <div class="sec_in">
          <h4>这些行业问题，您是否感同身受？</h4>
          <div class="row-center feqs">
            <div class="feq">
              <img src="~assets/img/authorize/feq_01.jpg">
              <p>公司业务链条单一，难以满足客户全方位需求</p>
            </div>
            <div class="feq">
              <img src="~assets/img/authorize/feq_04.jpg">
              <p>坐班，考核，学习机会少，成长空间小</p>
            </div>
          </div>
          <div class="row-center feqs">
            <div class="feq">
              <img src="~assets/img/authorize/feq_03.jpg">
              <p>客户营销，流程管理，关键信息通知，工作繁杂无从入手</p>
            </div>
            <div class="feq">
              <img src="~assets/img/authorize/feq_02.jpg">
              <p>专业能力有限，行业资源缺乏，无法解决客户疑难需求</p>
            </div>
          </div>
        </div>
        <img class="intro_icon" src="~assets/img/authorize/intro_icon.png" mode="widthFix">
        <div class="sec_in">
          <h4>生态合伙人计划9大亮点</h4>
          <div class="lds">
            <div class="ld">
              <img src="~assets/img/authorize/ld_01.png">
              <div>
                <h5>长期事业</h5>
                <p>一生经营的移动店铺</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_02.png">
              <div>
                <h5>高额收益</h5>
                <p>最高90%分润+10%长期收益</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_03.png">
              <div>
                <h5>生态通证</h5>
                <p> 珍珠价值激励 共享生态权益</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_04.png">
              <div>
                <h5>轻松管理</h5>
                <p>智能工具+全流程SaaS</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_05.png">
              <div>
                <h5>立体保护</h5>
                <p>电商绿色通道 执法联动</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_06.png">
              <div>
                <h5>多维业务</h5>
                <p>全链路业务赋能 满足更多需求</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_07.png">
              <div>
                <h5>创收产品</h5>
                <p>高价值高利润高端业务产品线</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_08.png">
              <div>
                <h5>商标交易</h5>
                <p>一键发布 一手标源 随买随卖</p>
              </div>
            </div>
            <div class="ld">
              <img src="~assets/img/authorize/ld_09.png">
              <div>
                <h5>知产社群</h5>
                <p>打造新知产人的在线学堂</p>
              </div>
            </div>
          </div>
        </div>
        <div class="honor">
          <div class="honor_in"><i>合伙人荣誉</i>——经CAASA审核成为中国产学研合作促进会反侵权假冒创新战略联盟个人会员，并加入全国知识产权社会共治保护志愿者体系。</div>
        </div>
      </div>
      <div class="row-center bottomBar" v-if="!noBtn">
        <span class="lc save" @click="goNext">下一步</span>
      </div>
    </scroll-view>

    <div class="maskBg" @click="showArrow = false" @touchstart="showArrow = false" v-if="showArrow">
      <div class="row-center down">
        <img src="https://ossfile.ipsebe.com/5AAF705DD20B9D0654F916FA603B2E1E.gif" alt="">
        <!-- <img src="~assets/img/icon/down.png"> -->
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    components:{
    },
    data(){
      return{
        noBtn: false,
        showArrow: true
      }
    },

    mounted(){
      this.showArrow = true;
      let query = this.$root.$mp.query;
      this.noBtn = !!query.noBtn;
      console.log('introduction_query:', query)
    },
    methods :{
      scroll(e){
        this.showArrow = false;
      },
      goNext() {
        this.$router.push({
          path: '/pages/authorize/bindPhone',
          query: this.$root.$mp.query
        })
      }
    },
  }
</script>
<style lang="scss">
.introductionW{
  height: 100%;position: relative;
  .introduction{
    height: 100%;position: relative;background-color: #6a2afd;
    .topImg{width: 100%;}
    h3{width: 100%;text-align: center;font-size: 32px;line-height: 32px;position: absolute;left: 0;top: 460px;color: #ffe082;}
    .tip{width: 100%;text-align: center;font-size: 24px;line-height: 24px;position: absolute;left: 0;top: 513px;color: #ffe082;}

    .sec{
      background-image: linear-gradient(to bottom, #6a2afd,#4900d0);position: relative;padding-bottom: 50px;padding-top: 20px;
      .sec_in{
        background: #fff url(~assets/img/authorize/sec_bg.jpg) 0 0 no-repeat;background-size: 100%;border-radius: 20px;margin-left: 20px;margin-right: 20px;margin-bottom: 40px;padding-top: 64px;padding-bottom: 50px;position: relative;z-index: 2;
        h4{width: 100%;color: #916d00;font-size: 32px;line-height: 32px;text-align: center;font-weight: bold;margin-bottom: 180px;}
        .feqs{
          margin-bottom: 40px;
          .feq{
            align-items: center;margin: 0 40px;
            img{width: 220px;height: 220px;margin-left: 25px;}
            p{width: 270px;text-align: center;margin-top: 15px;line-height: 40px;font-size: 26px;}
          }
        }
        .lds{
          .ld{
            display: flex;flex-direction: row;justify-content: center;padding-top: 25px;
            img{width: 120px;height: 120px;}
            div{
              flex-basis:458px;margin-left: 40px;border-bottom:1px dashed #eee;padding-bottom: 40px;
              h5{font-size: 30px;line-height: 30px;height: 45px;font-weight: bold;padding-top: 15px}
              p{font-size: 28px;line-height: 28px;margin-top: 30px;}
            }
          }
          .ld:last-child{
            div{border-bottom:0;}
          }
        }
      }
      .honor{
        background: #fff url(~assets/img/authorize/bt_bg.png) 0 0 no-repeat;background-size: 100%;border-radius: 20px;margin-left: 20px;margin-right: 20px;margin-top: 40px;padding: 58px;
        .honor_in{
          font-size: 28px;line-height: 45px;
          i{font-weight: bold;}
        }
      }
      .intro_icon{position: absolute;top:900px; left: 0;width: 98px; z-index: 1;}
    }
    .bottomBar{
      width: 100%; height: 80px;line-height: 80px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:#FFC839;color: #fff;}
    }
  }
  .down{
    position: absolute;top: 0;left: 0;right: 0;bottom: 40px;align-items: flex-end;
    img{width: 300px;height: 180px;animation: moveDownUp 1.75s linear infinite;}
  }
  .maskBg{position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 1000;background:linear-gradient(180deg,rgba(86,84,255,0) 0%,rgba(81,88,255,1) 100%); }
}
  @keyframes moveDownUp{
    0% { transform: translateY(0%); }
    50% { transform: translateY(-0%); }
    100% { transform: translateY(0%); }
  }
</style>
