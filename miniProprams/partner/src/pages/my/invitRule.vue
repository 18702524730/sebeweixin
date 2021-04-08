<template>
  <div class="myInviteWrap" @click="showTabStatus = false">
    <div class="rule">
      <h2>邀好友 享分润</h2>
      <p>1.邀请好友加入拾贝宝计划，好友完成订单后，您将获得10%收益（扣除官费税费）；<br>2.收益由平台作为奖励，并不影响好友收益；<br> 3.所有拾贝宝用户均可参加；<br> 4.好友数量不限，分润收益终生生效；<br> 5.若发现作弊行为，我方有权利进行账户冻结；<br> 6.本活动最终解释权归杭州拾贝知识产权服务有限公司所有。</p>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
  export default{
  data(){
    return{
    }
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=8",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  }
}

</script>

<style lang="scss">
.myInviteWrap{padding: 30px 0;background:rgba(249,249,253,1) url('~assets/img/my/invitBg.jpg') no-repeat 0 0;background-size: 750px 500px;height: 100%;
  .rule{width: 690px;margin: 0 auto;height: 100%;background:rgba(255,255,255,1); box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);
  border-radius:5px;padding: 60px 50px;
    h2{color:#C1A76E;font-size: 38px;line-height: 53px;text-align: center;margin-bottom: 40px;font-weight: 600;}
    p{font-size: 28px;line-height: 60px;color:rgba(102,102,102,1); }
  }
}
 
</style>
