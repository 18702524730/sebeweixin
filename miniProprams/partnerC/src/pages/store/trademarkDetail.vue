<template>
  <div class="confirmAndPush">
    <div class="infoWrap">
      <div class="items trademarkInfo">
        <h3>商标信息</h3>
        <div class="infoItem"><span>商标名称</span><span>{{trademarkDTO.trademarkName}}</span></div>
        <div class="infoItem"><span>商标说明</span><span>{{trademarkDTO.trademarkDesc}}</span></div>
        <div class="row-between imgItem">
          <span>商标图样</span>
          <span class="imgBox">
            <img :src="trademarkDTO.blackWhitePicUrl" mode="aspectFit">
          </span>
        </div>
      </div>

      <div class="items category" v-if="workOrderService.length">
        <h3>商标类别</h3>
        <div v-for="(item, index) in workOrderService" :key="index">
          <div class="infoItem"><span>{{item.goodsname}}</span><span>{{item.minNumber}}个小项</span></div>
          <div class="minInfo">{{item.min}}</div>
        </div>
        <div class="row minInfoTotal">大类：<i>{{trademarkDTO.classNumber}}类</i><span>，超出小项：<i style="display: inline;">{{trademarkDTO.minAddNumber}}个</i></span></div>
      </div>
    </div>

    <div class="fixed-bottom row-center bottomBar" @click="$router.go(-1)">
      确定
    </div>

    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import Item from '@/components/infoItem.vue';
  import cateIdData from '@/utils/tmTypeData';
  const subjectTypeArr = [
    {
      id: 1,
      name: '大陆企业'
    },
    {
      id: 2,
      name: '大陆个人'
    },
    {
      id: 3,
      name: '境外企业'
    },
    {
      id: 4,
      name: '境外个人'
    }
  ];
  export default{
    components: {
      Item
    },
    mixins: [mixin],
    data() {
      return{
        workOrderId: '',
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {},
        trademarkDTO: {},
        workOrderService: [],
      }
    },
    mounted() {
      this.init();
      console.log(cateIdData)
    },
    methods: {
      async init() {
        let classArr = cateIdData.cateIdData
        let data = await this.API.confirmOrder.findConfirmTrademark({orderSn: this.$route.query.orderSn})
        this.trademarkDTO = data
        console.log(this.trademarkDTO)
        data.workOrderSerivice.map(item => {
          let citem = classArr.filter(cate => (item.classId === cate.id))
          console.log(citem)
          item.goodsname = citem[0].goodsname
        })
        this.workOrderService = data.workOrderSerivice
      }, 
    }
  }
</script>
<style lang="scss">
  .confirmAndPush{
    height: 100%;
    h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
    .infoWrap{
      margin-bottom: 118px;
      .items{
        background-color: #fff;margin-top: 20px;
        .infoItem{
          display: flex;flex-direction: row;align-items: center;justify-content: space-between;height: 90px;margin-right: 0;padding-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          span{font-size: 28px;}
          span:last-child{color: #999999;}
        }
        .imgItem{
          height: 200px;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          .imgBox{
            width: 160px;height: 160px;border:1px solid #eee;overflow: hidden;
            img{height: 100%;width: 100%;}
          }
        }
      }
      .category{
        .minInfo{padding: 20px 0;font-size:26px;line-height:37px;color: #666;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;}
        .minInfoTotal{
          height: 80px;font-size: 28px;padding-left: 20px;
          i{color: #F64744}
        }
      }
    }
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;color: #fff;
      background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    }
  }
</style>
