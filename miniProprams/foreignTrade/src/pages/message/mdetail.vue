<template>
  <div class="mdetailbox">
    <div class="kefu"><button open-type="contact"></button></div>
    <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
    <div class="title">{{detail.title}}</div>
    <div class="date">{{detail.publishDate}}</div>
    <div v-html="detail.text" class="cont"></div>
  </div>
</template>

<script>
  // import utils from '@/utils/utils';
import http from '@/plugins/flyio/request'
import Filters from '../../utils/filters.js'
const { indexUrl } = CONFIG;
export default {
  data () {
    return {
      id:'',
      detail:{}
    }
  },
  components: {

  },
  onShow(){
    this.id = this.$root.$mp.query.id;
    this.getdetail(this.id)
  },
  methods: {
    phoneCall(e){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    },
    getdetail(id){
      http.get(indexUrl+'/cms/api/directive/contentAttribute?id='+id).then(res=>{
        if(res.object){
          var d = res.object;
          d.publishDate = Filters.filters.dateFormat(d.publishDate);
          this.detail = d
        }
        console.log(res.object)
      })
    }
  }
}
</script>

<style lang="scss">
.mdetailbox{
  padding: 24px;
  .title{
    font-size: 32px;
    line-height: 60px;
    margin-bottom: 24px;
    text-align: center
  }
  .date{
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 24px;
    text-align: right;
  }
  .cont{
    line-height: 40px;
    font-size: 28px;
  }
}
 
</style>
