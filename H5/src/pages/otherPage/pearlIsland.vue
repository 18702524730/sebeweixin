<template>
  <div class="pearl_island" ref="homePage">
    <div class="page_01" ref="pageOne" @touchmove="touchMove" @touchstart="touchstart" @touchend="touchend">
      <div class="pearl_image">
        <img src="" v-lazy="conch" class="conch" alt="">
        <img src="" v-lazy="pearl" class="pearl" alt="">
        <img class="bubble_img bubble01" src="" v-lazy="bubble">
        <img class="bubble_img bubble02" src="" v-lazy="bubble">
        <img class="bubble_img bubble03" src="" v-lazy="bubble">
        <img class="bubble_img bubble04" src="" v-lazy="bubble">
        <img class="bubble_img bubble05" src="" v-lazy="bubble">
        <img class="bubble_img bubble06" src="" v-lazy="bubble">
        <img class="bubble_img bubble07" src="" v-lazy="bubble">
        <img class="bubble_img bubble08" src="" v-lazy="bubble">
      </div>
      <div class="text_image">
        <img src="" v-lazy="innovate" class="innovate" alt="">
        <img src="" v-lazy="InnovationPearl" class="InnovationPearl mt15" alt="">
      </div>
      <div class="pearl_txt">
        <p class="txt_tit">全球知识产权与创新保护共享生态通证</p>
      </div>
      <div class="up_more" v-if="moreInfo">
        <i class="up01"></i>
        <i class="up02"></i>
        <i class="up03"></i>
        <p class="mt15">向上滑动了解珍珠</p>
      </div>
    </div>

    <div class="page_02" ref="pageTwo" :style="'top:'+clientHeight+'px'">
      <div class="pearl">
        <div class="text_list">
          <div class="text_frame">
            <p class="title">为何推出珍珠？</p>
            <p class="info mt30">拾贝推出创新珍珠（英文名称：Innovation Pearl，简称珍珠）旨在通过新型技术手段重构生态协作关系网络，在全球范围内激励原创、保护创新，同时达到保护知识产权、加速全球创新生态发展的目的。</p>
          </div>
          <i class="bgi_first"></i>
          <i class="bgi_last"></i>
        </div>
      </div>

      <div class="consensus">
        <img src="" v-lazy="icons" alt="">
        <p>生态共识</p>
        <span class="consensus01">生态共建</span>
        <span class="consensus02">市场共创</span>
        <span class="consensus03">秩序共立</span>
        <span class="consensus04">收益共享</span>
      </div>

      <div class="worth">
        <p class="title">创造价值 共享价值</p>
        <p class="subhead">-让价值回归价值创造者- </p>
        <img class="mt35" src="" v-lazy="value" alt="">
        <p class="worth01"></p>
        <p class="worth02"></p>
        <p class="worth03"></p>
        <p class="worth04"></p>
        <p class="worth05"></p>
        <p class="worth06"></p>
      </div>

      <div class="pearl">
        <img src="" v-lazy="why" alt="">
        <div class="text_list">
          <div class="text_frame">
            <p class="title">什么是珍珠？</p>
            <p class="info mt30">珍珠是知识产权与创新保护共享生态的通证，各类生态角色每一次有价值的行为互动都将被记录，并奖励珍珠作为量化的权益证明。珍珠发行总量为10亿，永不增发。不支持用户间相互转赠、售卖和提取到外网，仅作为生态体系内的权益兑换凭证。</p>
          </div>
          <i class="bgi_first"></i>
          <i class="bgi_last"></i>
        </div>
      </div>

      <div class="mall_num">
        <img src="" v-lazy="allNumber" alt="">
      </div>

      <div class="acquire">
        <p class="mb30">如何获得珍珠？</p>
        <div class="btn_list">
          <p>1.行为贡献奖励</p>
        </div>
        <div class="acquire_list">
          <div class="list_l ml20">
            <div>
              <img src="" v-lazy="flux" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">流量贡献奖励</p>
                <p class="txt_info mt5">注册、登录等用户行为。</p>
              </div>
            </div>
            <div>
              <img src="" v-lazy="praise" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">工作质量奖励</p>
                <p class="txt_info mt5">服务质量得到好评的用户行为。</p>
              </div>
            </div>
            <div>
              <img src="" v-lazy="spread" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">传播贡献奖励</p>
                <p class="txt_info mt5">邀请注册、传播平台活动等行为。</p>
              </div>
            </div>
          </div>
          <div class="list_r ml20">
            <div>
              <img src="" v-lazy="reward" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">效益贡献奖励</p>
                <p class="txt_info mt5">下单购买平台的服务或商品。</p>
              </div>
            </div>
            <div>
              <img src="" v-lazy="lead" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">资源导入奖励</p>
                <p class="txt_info mt5">导入客户资源、合作资源平台的行为。</p>
              </div>
            </div>
            <div>
              <img src="" v-lazy="channel" alt="">
              <div class="list_txt ml15">
                <p class="txt_tit">渠道贡献奖励</p>
                <p class="txt_info mt5">导入自有服务能力之外的客户需求及订单。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_list">
          <p>2.每日手动领取</p>
        </div>
        <div class="acquire_info">
          <p class="info_top mt30">平台每天会根据前一天的销售额，拿出一定数量的珍珠作为生态用户的奖励,特定用户可获奖励的数量与用户所持有的创力占所有用户所持创力比例正相关。</p>
          <div class="info_data">
            <img class="lt" src="~assets/img/pearlIsland/lt.png" alt="">
            <img class="rb" src="~assets/img/pearlIsland/rb.png" alt="">
            <p class="tit">什么是创力？</p>
            <p class="data">创力即创新能力的简称，代表生成珍珠的能力。本质是活跃度贡献证明，在珍珠岛上越活跃，获得的创力越高,每天生成的珍珠越多。</p>
          </div>
        </div>
      </div>
      <div class="purpose">
        <p class="tit">珍珠有何用途？</p>
        <div class="purpose_list">
          <div class="list mr25">
            <img class="imageNum" src="" v-lazy="IMG1" alt="">
            <div class="list_txt ml15">
              <p class="tit">生态内权益兑换</p>
              <p class="text mt10">作为拾贝生态通证，珍珠有多种用途，最主要的用途是在平台内兑换各类权益。</p>
            </div>
          </div>
          <div class="list ml25">
            <img class="imageNum" src="" v-lazy="IMG2" alt="">
            <div class="list_txt ml15">
              <p class="tit">分红及原始股认购</p>
              <p class="text mt10">持有珍珠享受分红权，将在上市前享有拾贝原始股权的优先认购权。</p>
            </div>
          </div>
        </div>
        <div class="activity">
          <div class="border_b">
            <div class="activity_l">
              <p class="mr20">权益兑换</p>
            </div>
            <div class="activity_r">
              <p>• 兑换需求、兑换平台服务及商品（抵扣券）</p>
              <p>• 兑换在线课程、兑换装修服务、兑换活动门票、兑换周边商品、兑换实物、兑换特定商品使用权等</p>
            </div>
          </div>
          <div class="mt20 activity_shop">
            <div class="activity_l">
              <p class="mr20">运营活动</p>
            </div>
            <div class="activity_r">
              <p>业务悬赏、竞猜、类一元购、答题等</p>
            </div>
          </div>
        </div>
        <i class="bgi_first"></i>
        <i class="bgi_last"></i>
      </div>

      <div class="advantage">
        <p class="tit">珍珠技术优势</p>
        <div class="advantage_list mt25">
          <div class="list_image">
            <img src="" v-lazy="safety" alt="">
            <p class="mt10">领先国密安全储存</p>
          </div>
          <div class="list_image">
            <img src="" v-lazy="IPID" alt="">
            <p class="mt10">通用数字身份IPID</p>
          </div>
        </div>
        <div class="advantage_list mt100">
          <div class="list_image">
            <img src="" v-lazy="arithmetic" alt="">
            <p class="mt10">创新共识推举算法</p>
          </div>
          <div class="list_image">
            <img src="" v-lazy="decentration" alt="">
            <p class="mt10">去中心化信任机制</p>
          </div>
        </div>
      </div>

      <div class="plan mt40">
        <p class="tit">珍珠通证运作计划 </p>
        <div class="list_num">
          <div class="example01 mt30">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="example">
            <img class="imageNum mt10" src="" v-lazy="IMG1" alt="">
            <div class="ml30">
              <p class="example_tit">搭建通证应用基础设施 </p>
              <p class="example_footer mt10">完成通证应用底层技术铺设，通证应用研发，正式上线启用。</p>
            </div>
          </div>
        </div>
        <div class="list_num border_dashed">
          <div class="example02 mt30">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="example">
            <img class="imageNum mt5" src="" v-lazy="IMG2" alt="">
            <div class="ml30">
              <p class="example_tit">通证发放与生态内运用</p>
              <p class="example_footer mt10">促进通证在生态体系内权益兑换，深度激活生态角色生态建设行为。</p>
            </div>
          </div>
        </div>
        <div class="list_num border_dashed">
          <div class="example03 mt30">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="example">
            <img class="imageNum mt5" src="" v-lazy="IMG3" alt="">
            <div class="ml30">
              <p class="example_tit">分红和股权兑换等模式变现通证</p>
              <p class="example_footer mt10">推出平台分红及股权认购计划，以及更多其他资产变现模式。</p>
            </div>
          </div>
        </div>

        <div class="know_plan">
          <p class="tit" style="color:#D6EAFF;">打造价值共享平台，促进创新生态发展</p>
          <p class="know_tit mt10">拾贝已全面推出合伙人计划</p>
          <div class="plan_btn" v-if="btnBol!=1">
            <p @touchstart="toMin()">了解合伙人计划</p>
            <img src="" v-lazy="hand" alt="">
          </div>
          <p class="sebe">&#169拾贝公司 版权所有</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk';
  const indexUrl = CONFIG.indexUrl;
  import Filters from 'src/utils/filters.js';
  import bubble from 'src/assets/img/pearlIsland/bubble.png';
  import conch from 'src/assets/img/pearlIsland/conch.png';
  import pearl from 'src/assets/img/pearlIsland/pearl.png';
  import innovate from 'src/assets/img/pearlIsland/innovate.png';
  import InnovationPearl from 'src/assets/img/pearlIsland/InnovationPearl.png';
  import allNumber from 'src/assets/img/pearlIsland/allNumber.png';
  import icons from 'src/assets/img/pearlIsland/icons.png';
  import value from 'src/assets/img/pearlIsland/value.png';
  import why from 'src/assets/img/pearlIsland/why.png';
  import flux from 'src/assets/img/pearlIsland/flux.png';
  import praise from 'src/assets/img/pearlIsland/praise.png';
  import spread from 'src/assets/img/pearlIsland/spread.png';
  import reward from 'src/assets/img/pearlIsland/reward.png';
  import lead from 'src/assets/img/pearlIsland/lead.png';
  import channel from 'src/assets/img/pearlIsland/channel.png';
  import pp from 'src/assets/img/pearlIsland/pp.png';
  import apply from 'src/assets/img/pearlIsland/apply.png';
  import IMG1 from 'src/assets/img/pearlIsland/1.png';
  import IMG2 from 'src/assets/img/pearlIsland/2.png';
  import IMG3 from 'src/assets/img/pearlIsland/3.png';
  import safety from 'src/assets/img/pearlIsland/safety.png';
  import IPID from 'src/assets/img/pearlIsland/IPID.png';
  import arithmetic from 'src/assets/img/pearlIsland/arithmetic.png';
  import decentration from 'src/assets/img/pearlIsland/decentration.png';
  import hand from 'src/assets/img/pearlIsland/hand.png';
  import identify from 'src/assets/img/pearlIsland/identify.png';

  const userUrl = CONFIG.userUrl;
  const title = '拾贝商城，你掌上的知识产权服务平台。';
  const link = 'https://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
  const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';

  export default {
    data () {
      return {
        path: location.href.split('#')[0], //当期的地址

        bubble:bubble,
        conch:conch,
        pearl:pearl,
        innovate:innovate,
        InnovationPearl:InnovationPearl,
        allNumber:allNumber,
        icons:icons,
        value:value,
        why:why,
        flux:flux,
        praise:praise,
        spread:spread,
        reward:reward,
        lead:lead,
        channel:channel,
        pp:pp,
        apply:apply,
        IMG1:IMG1,
        IMG2:IMG2,
        IMG3:IMG3,
        safety:safety,
        IPID:IPID,
        arithmetic:arithmetic,
        decentration:decentration,
        hand:hand,
        identify:identify,

        startY:'',
        endY:'',
        moreInfo:true,
        clientY:0,

        clientHeight:0,
        btnBol:1
      }
    },
    methods: {
      getLogin () {
        var user_token = this.$cookie.get('user_token'); //根据cookie是否有token 判断登录
        if ( !user_token ) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      },

      toMin(){//回小程序
        wx.miniProgram.navigateTo({url: '/pages/authorize/introduction?noBtn=1'});
      },
      touchMove(ev) {//触屏过程
        this.clientY = document.documentElement.scrollTop || document.body.scrollTop || this.$refs.homePage.scrollTop;
      },
      touchstart(ev){//触屏开始
        this.startY = ev.changedTouches[0].clientY;
      },
      touchend(ev){//触屏结束
        this.endY = ev.changedTouches[0].clientY;
        let heightY = Math.floor(this.startY-this.endY);//手指滑动距离
        console.log(this.startY,this.endY,this.$refs.homePage.clientHeight,heightY)
        if(heightY<100){//小于100回到顶部
          this.setScrollTop(0);
        }else if(100 < heightY < this.clientHeight){//范围内下一页
          let Htop = heightY;
          let timer = setInterval(()=>{
            if(Htop < this.clientHeight){
              Htop += 5;
              this.setScrollTop(Htop)
            }else{
              clearInterval(timer);
            }
          },1)
          
          // this.setScrollTop(this.clientHeight)
        }
      },
      setScrollTop(scroll_top) {
        document.documentElement.scrollTop = scroll_top;
        document.body.scrollTop = scroll_top;
      },
    },
    mounted () {
      this.btnBol = this.$route.query.btnBol;
      this.clientHeight = this.$refs.pageOne.clientHeight
      console.log(this.clientHeight)
      this.wxShare(title,link,imgUrl, '拾贝为企业提供一站式知识产权服务', this.path, this.getLogin); //微信分享  在mian.js里Vue的原型里已定义
    },
    filters: {
    }
  }
</script>

<style lang='scss'>
@import  "~assets/css/pearlKnow.scss";
</style>
