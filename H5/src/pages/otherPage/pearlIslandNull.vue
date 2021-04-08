<template>
  <div class="pearl_island" @touchmove="touchMove" @touchstart="touchstart" @touchend="touchend">
    <div class="page_01" ref="homePage">
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

    <div class="consensus">
      <img src="" v-lazy="icons" alt="">
      <p>生态共识</p>
      <span class="consensus01">生态共建</span>
      <span class="consensus02">市场共创</span>
      <span class="consensus03">秩序共立</span>
      <span class="consensus04">收益共享</span>
    </div>
    
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
          <p class="info mt30">珍珠是知识产权与创新保护共享生态的通证，各类生态角色每一次有价值的行为互动都将被记录，并奖励珍珠作为量化的权益证明。珍珠发行总量为10亿，永不增发。不支持用户间相互转增、售卖和提取到外网，仅作为生态体系内的权益兑换凭证。</p>
        </div>
        <i class="bgi_first"></i>
        <i class="bgi_last"></i>
      </div>
    </div>

    <div class="mall_num">
      <img src="" v-lazy="allNumber" alt="">
    </div>

    <div class="acquire">
      <p>如何获得珍珠？</p>
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
    </div>

    <div class="regulation">
      <p class="tit">发放规则</p>
      <p class="txt">珍珠总量共10亿，初期按照一定创世数量对生态用户的流量及效益贡献进行奖励。每当剩余总量减半，相应的发放数量也将减半。</p>
    </div>

    <div class="IPT_reg">
      <div class="reg_info">
        <p class="info_tit mb35">创世数量（ 当剩余珍珠数量大于等于5亿 ）明细表 </p>
        <div class="info_list">
          <div class="list_image">
            <img src="" v-lazy="pp" alt="">
            <p class="mt10">合伙人</p>
          </div>
          <div class="list_text">
            <div class="list_l">
              <p class="first">行为</p>
              <p>注册</p>
              <p>登录</p>
              <p>邀请他人成功注册</p>
              <p>邀请他人成功开店</p>
              <p>成功开店</p>
              <p class="max_text">订单成交（服务验收）</p>
              <p>完成服务</p>
            </div>
            <div>
              <p class="first">奖励珍珠数量</p>
              <p>20</p>
              <p>0~1随机数</p>
              <p>10</p>
              <p>30</p>
              <p>50</p>
              <p class="max_text">订单金额 * 0.1* （0.5~1.5随机数） </p>
              <p>平台利润金额*0.5 </p>
            </div>
          </div>
        </div>


        <div class="info_list mt40">
          <div class="list_image list_image_padding">
            <img src="" v-lazy="apply" alt="">
            <p>创新主体</p>
          </div>
          <div class="list_text">
            <div class="list_l">
              <p class="first">行为</p>
              <p class="maxH">注册</p>
              <p class="maxH">订单成交（服务验收）</p>
            </div>
            <div>
              <p class="first">奖励珍珠数量</p>
              <p class="maxH">20</p>
              <p class="maxH">订单金额 * 0.1* （0.5~1.5随机数） </p>
            </div>
          </div>
        </div>
        <p class="info_footer mt30">说明</p>
        <p class="info_footer">• 平台将根据运营需要合理增加或调整部分奖励行为节点</p>
        <p class="info_footer">• 涉及金额单位均为元，随机数均保留两位小数</p>
      </div>
      <i class="bgi_first"></i>
      <i class="bgi_last"></i>
    </div>

    <div class="purpose">
      <p class="tit">珍珠有何用途？</p>
      <div class="purpose_list">
        <div class="list mr35">
          <img class="one" src="" v-lazy="IMG1" alt="">
          <div class="list_txt ml15">
            <p class="tit">生态内权益兑换</p>
            <p class="text mt10">作为拾贝生态通证，珍珠有多种用途，最主要的用途是在平台内兑换各类权益。 </p>
          </div>
        </div>
        <div class="list ml35">
          <img class="two" src="" v-lazy="IMG2" alt="">
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
            <p>• 需求中心兑换客户需、兑换平台服务及商品（抵扣券）</p>
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
          <img class="one mt15" src="" v-lazy="IMG1" alt="">
          <div class="ml30">
            <p class="example_tit">搭建通证应用基础设施</p>
            <p class="example_footer mt10">完成通证应用底层技术铺设，通证应用研发，正式上线启用。 </p>
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
          <img class="two mt15" src="" v-lazy="IMG2" alt="">
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
          <img class="threen mt15" src="" v-lazy="IMG3" alt="">
          <div class="ml30">
            <p class="example_tit">分红和股权兑换等模式变现通证</p>
            <p class="example_footer mt10">推出平台分红及股权认购计划，以及更多其他资产变现模式。 </p>
          </div>
        </div>
      </div>
      
      <div class="know_plan">
        <p class="tit" style="color:#D6EAFF;">打造价值共享平台，促进创新生态发展</p>
        <p class="know_tit mt10">拾贝已全面推出合伙人计划</p>
        <div class="plan_btn">
          <p @click="minni">了解合伙人计划</p>
          <img src="" v-lazy="hand" alt="">
        </div>
        <p class="sebe">&#169拾贝公司 版权所有</p>
      </div>
    </div>
  </div>
</template>
<script>
  const indexUrl = CONFIG.indexUrl; ;
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
  export default {
    data () {
      return {
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

        startY:'',
        endY:'',
        moreInfo:true,
        clientY:0
      }
    },
    methods: {
      minni(){
        wx.miniProgram.getEnv(function (res) {
         if (res.miniprogram) {
           wx.miniProgram.switchTab({url: '/pages/authorize/introduction'});
           wx.miniProgram.postMessage({data: {noBtn: 1}}); // 传的参数
         }
       });
      },
      touchMove(ev) {
        this.clientY = document.documentElement.scrollTop || document.body.scrollTop;
      },
      touchstart(ev){
        this.startY = ev.changedTouches[0].clientY;
      },
      touchend(ev){
        ev = ev || event;
        ev.preventDefault();
        if(this.clientY < 100){
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          // this.moreInfo = true;
        }else{
          // this.moreInfo = false;
        }
      }
    },
    mounted () {
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.homePage.style.height = h+'px';

      this.clientY = document.documentElement.scrollTop || document.body.scrollTop;
      if(this.clientY < 100){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // this.moreInfo = true;
      }else{
        // this.moreInfo = false;
      }
    },
    filters: {
    }
  }
</script>

<style lang='scss'>
.pearl_island{width:750px;height:100%;overflow-y:auto;background-color:#180647;-webkit-overflow-scrolling: touch;
  .page_01{height:100%;position: relative;background: url(~assets/img/pearlIsland/bgi.png) 0 center no-repeat;}
  .pearl_image{
    .conch{width:100%;height:652px;margin-top:120px;opacity:1;animation: conchAnimation 3s infinite ease-in-out;}
    .pearl{position: absolute;width:482px;height:488px;top:224px;left:50%;margin-left: -241px;animation: pearlAnimation 9s infinite ease-in-out;z-index: 20;}
    .bubble_img{position: absolute;z-index: 1;}
    .bubble01{width:15px;height:15px;top:600px;left:200px;animation: bubble01Animation 3s infinite ease-in;}
    .bubble02{width:10px;height:10px;top:600px;left:375px;animation: bubble02Animation 4s infinite linear;}
    .bubble03{width:10px;height:10px;top:600px;left:250px;animation: bubble03Animation 9s infinite ease-in;}
    .bubble04{width:10px;height:10px;top:600px;left:500px;animation: bubble04Animation 9s infinite ease-in;}
    .bubble05{width:10px;height:10px;top:610px;left:400px;animation: bubble05Animation 3s infinite ease-in;}
    .bubble06{width:10px;height:10px;top:600px;left:530px;animation: bubble06Animation 4s infinite ease-in;}
    .bubble07{width:10px;height:10px;top:610px;left:300px;animation: bubble07Animation 3s infinite ease-in;}
    .bubble08{width:10px;height:10px;top:610px;left:480px;animation: bubble08Animation 3s infinite ease-in;z-index: 25;}
    @keyframes pearlAnimation{
      0%{top: 124px;opacity: 0.8;}
      50%{top: 44px;opacity: 1;}
      100%{top: 124px;opacity: 0.8;}
    }
    @keyframes conchAnimation{
      0%{opacity: 0.85;}
      50%{opacity: 1;}
      100%{opacity: 0.85;}
    }
    @keyframes bubble01Animation{
      0%{top: 580px;opacity: 1;width:10px;height:10px;}
      100%{top: 280px;opacity: 0;left:180px}
    }
    @keyframes bubble02Animation{
      0%{top: 600px;opacity: 0;width:10px;height:10px;}
      50%{top: 350px;opacity: 0;width:20px;height:20px;}
      100%{top: 350px;opacity: 0;width:20px;height:20px;}
    }
    @keyframes bubble03Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      25%{top: 280px;opacity: 0;width:20px;height:20px;}
      100%{top: 280px;opacity: 0;width:20px;height:20px;}
    }
    @keyframes bubble04Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      25%{top: 280px;opacity: 0;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;width:20px;height:20px;}
    }
    @keyframes bubble05Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      100%{top: 280px;opacity: 0;left:420px}
    }
    @keyframes bubble06Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;left:600px;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;left:600px;width:15px;height:15px;}
    }
    @keyframes bubble07Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;left:300px;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;left:300px;width:15px;height:15px;}
    }
    @keyframes bubble08Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;width:15px;height:15px;}
    }
  }
  .text_image{width:100%;text-align:center;margin-top:-80px;
    .innovate{width:388px;height:94px;} 
    .InnovationPearl{width:382px;height:38px;} 
  }
  .pearl_txt{width:100%;text-align:center;margin-top:85px;
    .txt_tit{font-size:38px;color:#9CBBE7;line-height:53px;font-weight:bold;}
  }
  .up_more{width:100%;height:120px;position: absolute;bottom:0;
    i{width:0;height:0;border-width:0 12px 8px;border-style:solid;border-color:transparent transparent #fff;display:block;margin:5px auto 0;}
    .up01{animation: up01Animation 3s infinite linear;}
    .up02{animation: up02Animation 3s infinite linear;}
    .up03{animation: up03Animation 3s infinite linear;}
    p{font-size:24px;line-height:33px;color:#fff;text-align:center;opacity:0.7;}
    @keyframes up01Animation{
      0%{opacity: 0.3;}
      25%{opacity: 0.6;}
      50%{opacity: 0.9;}
      75%{opacity: 0.6;}
      100%{opacity: 0.3;}
    }
    @keyframes up02Animation{
      0%{opacity: 0.6;}
      25%{opacity: 0.9;}
      50%{opacity: 0.6;}
      75%{opacity: 0.3;}
      100%{opacity: 0.6;}
    }
    @keyframes up03Animation{
      0%{opacity: 0.9;}
      25%{opacity: 0.6;}
      50%{opacity: 0.3;}
      75%{opacity: 0.6;}
      100%{opacity: 0.9;}
    }
  }
  
  .text_list{font-size:0;
    .text_frame{width:710px;padding:30px 33px 32px;background-color:#fff;border-radius:10px;margin:50px auto 0;
      .title{font-size:36px;color:#333;line-height:50px;text-align:center;font-weight:bold;}
      .info{font-size:28px;color:#666;line-height:40px;text-align:left;}
    }
  }
  .bgi_first{display:block;background-color:#fff;opacity:0.7;width:682px;height:20px;border-radius:0 0 10px 10px;margin:-2px auto 0;}
  .bgi_last{display:block;background-color:#fff;opacity:0.35;width:640px;height:34px;border-radius:0 0 10px 10px;margin:-20px auto 0;}
  .consensus{background-color:#180647;text-align:center;position: relative;margin-top:75px;
    img{width:652px;height:394px;}
    p{font-size:36px;color:#7096eb;position: absolute;width:100%;text-align:center;line-height:50px;bottom:172px;}
    span{font-size:28px;color:#fff;display:block;line-height:40px;position: absolute;}
    .consensus01{top:167px;left:105px;}
    .consensus02{top:167px;right:109px;}
    .consensus03{top:384px;left:105px;}
    .consensus04{top:384px;right:109px;}
  }
  
  .worth{background-color:#180647;text-align:center;margin-top:100px;
    >p{color:#fff;}
    .title{line-height:50px;font-size:36px;}
    .subhead{line-height:34px;font-size:24px;margin-top:7px;}
    img{width:550px;height:466px;}
  }

  .pearl{text-align:center;font-size:0;margin-top:120px;
    img{width:221px;height:183px;margin-bottom:-50px;}
  }
  
  .mall_num{text-align:center;margin-top:100px;
    img{width:646px;height:405px;}
  }

  .acquire{text-align:center;margin-top:100px;
    >p{font-size:36px;line-height:50px;color:#fff;}
    .acquire_list{display:flex;padding:60px 30px 0;
      .list_l,.list_r{
        >div{display:flex;vertical-align: middle;margin-bottom: 70px;}
        img{width:48px;height:48px;vertical-align: middle;}
        .list_txt{width:260px;
          p{text-align:left;}
          .txt_tit{font-size:24px;color:#fff;line-height:33px;}
          .txt_info{font-size:20px;color:#566098;}
        }
      }
      .list_r{margin-right: 60px;}
    }
  }

  .regulation{padding-top: 40px;
    p{color:#fff;}
    .txt{font-size:24px;margin-top:60px;line-height:35px;text-align:left;padding:0 20px;}
  }

  .IPT_reg{
    .reg_info{width:100%;background-color:#fff;padding:35px 15px 38px 15px;width:710px;background-color:#f8f8f8;border-radius:10px;margin:25px auto 0;
      .info_tit{font-size:24px;color:#999;line-height:35px;text-align:center;}
      .info_list{border-top:1px solid #eee;display: flex;
        .list_image{padding:70px 15px 160px;border-right:1px solid #eee;border-bottom:1px solid #eee;width:230px;
          img{width:196px;height:284px;}
          p{font-size:32px;height:#666;text-align:center;line-height:45px;}
        }
        div.list_image_padding{padding:15px 0px 0px;
          img{width:217px;height:214px;}
        }
        .list_text{width:450px;display: flex;
          .list_l{width:225px;border-right:1px solid #eee;}
          div{
            p{width:225px;text-align:center;line-height:70px;border-bottom:1px solid #eee;font-size:24px;color:#666;}
            .first{color:#4C7EDB;}
            .max_text{line-height:33px;text-align:left;height:90px;padding:12px 0 12px 12px;}
            p.maxH{padding:33px 0;line-height:33px;}
          }
        }
      }
      .info_footer{font-size:24px;color:#999;line-height:33px;}
    }
  }

  .purpose{margin-top:80px;
    .purpose_list{display:flex;padding-left: 40px;margin-top:64px;
      .list{display:flex;width:300px;
        .list_txt{
          p{text-align:left;}
          .tit{font-size:28px;line-height:34px;color:#fff;}
          .text{font-size:20px;color:#566098;line-height:28px;}
        }
      }
    }

    .activity{width:710px;background-color:#fff;padding:20px;border-radius:10px;margin:60px auto 0;vertical-align: middle;
      >div{display:flex;}
      >div.activity_shop{
        .activity_l,.activity_r{
          p{line-height:120px;}
        }
      }
      .border_b{border-bottom:1px solid #eee;padding-bottom:20px;}
      .activity_l{
        p{vertical-align: middle;font-size:26px;color:#333;width:114px;line-height:175px;}
      }
      .activity_r{padding-left:20px;border-left:1px solid #eee;
        p{line-height:35px;width:505px;font-size:26px;}
      }
    }
  }
  
  .advantage{margin-top:50px;
    .mt100{margin-top:100px;}
    .advantage_list{display:flex;padding:0 50px;flex-direction: row;align-items: center;justify-content: space-between;
      .list_image{width:256px;
        img{width:256px;height:156px;}
        p{font-size:28px;color:#fff;line-height:40px;text-align:center;}
      }
    }
  }

  .plan{padding-top: 100px;width:750px;height:1284px;overflow: hidden;background: url(~assets/img/pearlIsland/bgFooter.png) 0 center no-repeat;background-size:100%;
    .know_plan{margin-top:160px;
      .know_tit{font-size:30px;color:#778cc3;line-height:42px;text-align:center;}
      .plan_btn{position: relative;
        p{width:580px;height:95px;background: url(~assets/img/pearlIsland/btn.png) 0 center no-repeat;background-size:100%;font-size:32px;line-height:45px;color:#b7d8ff;text-align:center;line-height:95px;margin:57px auto 0;}
        img{width:205px;height:256px;position: absolute;top:56px;right:0;animation: handBtn 3s infinite normal;}
        @keyframes handBtn {
          0% {top:56px;right:0;}
          50% {top:100px;right:-50px;}
          100% {top:56px;right:0;}
        }
      }
      .sebe{font-size:20px;color:#778CC3;line-height:28px;margin-top:138px;text-align:center;}
    }

    .border_dashed:after{
      content:'';position: absolute;height:103px;border-left:6px dashed #12A0D0;left:121px;top:-94px;
    }
    .list_num{padding-left:107px;margin-top:80px;display:flex;height:95px;position: relative;
      .example{display:flex;
        div{width:424px;
          .example_tit{font-size:28px;color:#fff;line-height:34px;}
          .example_footer{font-size:20px;line-height:28px;color:#566098;}
        }
      }

      .example01,.example02,.example03{width:110px;height:110px;position: relative;}
      .example01{
        i:nth-child(2){animation: ripple01 9s infinite normal;}
        i:nth-child(3){animation: ripple02 9s infinite normal;}
        i:nth-child(4){animation: ripple03 9s infinite normal;}
      }
      .example02{
        i:nth-child(2){animation: ripple201 9s infinite normal;}
        i:nth-child(3){animation: ripple202 9s infinite normal;}
        i:nth-child(4){animation: ripple203 9s infinite normal;}
      }
      .example03{
        i:nth-child(2){animation: ripple301 9s infinite normal;}
        i:nth-child(3){animation: ripple302 9s infinite normal;}
        i:nth-child(4){animation: ripple303 9s infinite normal;}
      }
      i{display:inline-block;position: absolute;z-index:2;border-radius: 100%;width:34px;height:34px;}
      i:nth-child(2),i:nth-child(3),i:nth-child(4){z-index: 1;border:1px solid #0D5DBA;}
      i:nth-child(1){left:0;top:0;background:linear-gradient(132deg,rgba(0,255,255,1) 0%,rgba(16,51,169,1) 100%);}
      @keyframes ripple01 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        43% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple02 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        5% {left:16px;top:16px;opacity:1;width:0;height:0;}
        48% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple03 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        10% {left:16px;top:16px;opacity:1;width:0;height:0;}
        53% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }

      @keyframes ripple201 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        20% {left:16px;top:16px;opacity:1;width:0;height:0;}
        63% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple202 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        25% {left:16px;top:16px;opacity:1;width:0;height:0;}
        68% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple203 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        30% {left:16px;top:16px;opacity:1;width:0;height:0;}
        73% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }

      @keyframes ripple301 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        35% {left:16px;top:16px;opacity:1;width:0;height:0;}
        78% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple302 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        40% {left:16px;top:16px;opacity:1;width:0;height:0;}
        83% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }
      @keyframes ripple303 {
        0% {left:16px;top:16px;opacity:1;width:0;height:0;}
        45% {left:16px;top:16px;opacity:1;width:0;height:0;}
        88% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
        100% {left:-36px;top:-36px;opacity: 0;width:110px;height:110px;}
      }

    }
  }
  .one{width:28px;height:71px;}
  .two{width:42px;height:61px;}
  .threen{width:44px;height:62px;}
  .tit{font-size:36px;line-height:50px;color:#fff;text-align:center;}
}
</style>
