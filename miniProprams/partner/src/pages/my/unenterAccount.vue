<template>
  <div class="unenter_account">
    <div class="total_num">
      <div class="lef">
        <p class="num"><span class="unit">¥</span>7300.33</p>
        <p class="text">待入账<img src="" alt=""></p>
      </div>
      <div class="rig">
        <img src="" class="img" alt="">
      </div>
    </div>
    <div class="line_wrap">
      <div class="line_item">
        <div class="lef">
          <p class="title">订单提成</p>
          <p class="date">2018-08-9 12:23:21</p>
        </div>
        <div class="rig">
          <p class="num">+10</p>
          <p class="statu">[服务未开始]</p>
        </div>
      </div>
      <div class="line_item">
        <div class="lef">
          <p class="title">订单提成</p>
          <p class="date">2018-08-9 12:23:21</p>
        </div>
        <div class="rig">
          <p class="num">+10</p>
          <p class="statu">[服务未开始]</p>
        </div>
      </div>
    </div>

    <div class="modal_box">
      <div class="mask_bg"></div>
      <div class="box_content">
        <img src="~assets/img/account/banner.jpg" class="img" alt="">
        <p class="info">订单提成待入账说明</p>
        <p class="title">每笔服务单，客户对服务进行服 务验证后，提成入账</p>
        <div class="btn">我知道了</div>
        <p class="close"></p>
      </div>
    </div>




  </div>
</template>

<script>
  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  import md5 from 'md5'
  import qs from 'qs'

  export default {
    data () {
      return {

      }
    },
    methods: {
      selectTabFn (data) {
        this.activeIndex = data;
      }
    }
  }
</script>

<style lang='scss'>
  .unenter_account {
    width: 100%; height: 100%; background: #f8f8f8; padding-top:20px;
    .total_num {
      width: 100%; height: 226px; background-color: #fff; display: flex; justify-content: space-between; margin-bottom: 20px;
      .lef {
        margin-left: 30px; margin-top: 50px;
        .num {
          font-size: 68px; line-height: 68px;
          .unit {font-size: 36px;}
        }
        .text {font-size: 32px; line-height: 32px; color: #999; }
      }
      .rig {
        .img {}
      }
    }
    .line_wrap {
      margin-top: 0;
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 40px;}
      }
      .refund {
        .num {color: #333;}
      }
    }
    .modal_box {
      .box_content {
        width:530px; height: auto; background:#fff; position: fixed; left: 110px; top: 200px; z-index: 10; border-radius: 10px;
        .img {width: 100%; height: 188px;}
        .info {color: #999; font-size: 30px; text-align: center; margin-top: 50px; }
        .title {color: #333; font-size: 30px; width: 420px; margin: 10px auto 60px auto; text-align: center; }
        .btn {width: 100%; height: 96px; line-height: 94px; text-align: center; color: #2F80F6; font-size: 30px; border-top:1px solid #eee;}
        .close {width: 46px; height: 46px; background: #fff; position: absolute; bottom: -106px; left: 50%; margin-left: -23px;}
      }
    }
  }
</style>
