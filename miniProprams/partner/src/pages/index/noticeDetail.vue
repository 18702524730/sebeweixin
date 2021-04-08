<template>
  <div class="detailWrap">
    <h2>{{detail.title}}</h2>
    <p class="time">{{detail.time}}</p>
    <p class="noticeDetail" v-if="detail.content">{{detail.content}}</p>
    <!-- <rich-text v-if="detail.content" :nodes="detail.content"></rich-text> -->
    <!-- <p class="detail">{{detail.summary}}</p> -->
  </div>
</template>

<script>
import filter from '@/utils/filters'
export default {
  data () {
    return {
      detail: ''
    }
  },
  components: {

  },
  mounted () {
    this.init()
  },
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=5",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    async init () {
      let data = await this.API.homePage.noticeDetail({ id: this.$route.query.id })
      data.time = filter.filters.dateFormat(data.createTime)
      this.detail = data
    }
  }
}
</script>

<style lang="scss">
page{
  background: #fff;
}
.detailWrap{
  padding: 30px 20px;
  >h2{font-size: 34px;line-height: 48px;color: #333;font-weight: 600;}
  .time{font-size: 28px;color: #999;line-height: 40px;padding: 10px 0 30px;}
  .detail{font-size: 30px;color: #333;line-height: 42px;}
  .noticeDetail{
    font-size: 30px;line-height: 50px;word-wrap:break-word;color:rgba(51,51,51,1);
  }
}
 
</style>
