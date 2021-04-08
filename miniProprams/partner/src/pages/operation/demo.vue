<template>
  <div class="demo">
    <div @click="goPath('/pages/operation/trademark?salePrice=699', 0)">代客下单-->完善商标注册信息(salePrice)</div>
    <div @click="goPath('/pages/operation/trademark?salePrice=699', 1)">代客下单-->编辑商标注册信息(salePrice)</div>
    <div @click="goPath('/pages/operation/trademark?salePrice=699&workOrderId=256782', 20)">作业中列表-->待提交客户时，编辑(workOrderId/salePrice)</div>
    <div @click="goPath('/pages/operation/trademark?salePrice=699&workOrderId=256782', 20)">作业中列表-->用户退回，编辑(workOrderId/salePrice)</div>
    <div @click="goPath('/pages/operation/customerEdit?workOrderId=256782&isInfo=1', 31)" class="a">作业中列表待完善材料时，完善信息(workOrderId/salePrice)</div>
    <div @click="goPath('/pages/operation/customerEdit?id=0', 31)" class="b">新增主体</div>
    <div @click="goPath('/pages/operation/customerEdit?id=855', 31)" class="c">编辑主体</div>
    <div @click="goPath('/pages/operation/customerList', 31)" class="d">主体列表</div>
  </div>
</template>
<script>
  export default{
    data() {
      return{
        orderData1: {
          "trademarkDTO": {
              "trademarkName": "kkk",
              "trademarkDesc": "商标说明商标说明",
              "blackWhitePicUrl": "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png"
          },
          "workOrderService" : [ {
            "className" : "第1类-化工产品",
            "classId" : 1,
            "serviceNiceMin" : [ {
              "minId" : 1,
              "groupId" : 1,
              "classId" : 1,
              "minName" : "碱土金属 010039"
            }, {
              "minId" : 33,
              "groupId" : 1,
              "classId" : 1,
              "minName" : "氪 010372"
            }, {
              "minId" : 65,
              "groupId" : 1,
              "classId" : 1,
              "minName" : "石墨烯 010715"
            }, {
              "minId" : 1218,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "未曝光的感光胶片 010581"
            }, {
              "minId" : 1205,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "定影溶液（摄影用） 010298"
            }, {
              "minId" : 1194,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "定影液（摄影用） 010097"
            }, {
              "minId" : 1192,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "蛋白纸 010036"
            }, {
              "minId" : 1224,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "未曝光的电影胶片"
            }, {
              "minId" : 1222,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "感光箔"
            }, {
              "minId" : 1203,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "感光照相板 010269"
            }, {
              "minId" : 1226,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "照相干板"
            }, {
              "minId" : 1228,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "未曝光的干式胶片"
            }, {
              "minId" : 1230,
              "groupId" : 7,
              "classId" : 1,
              "minName" : "相纸（化学增感纸）"
            } ]
          } ],
        }, // 是否是工单(作业流程)
      }
    },
    computed: {

    },
    mounted() {
    },
    onShow(){
      //this.init();
    },
    methods: {
      goPath(path, type) {

        if (type == 0) {
          this.$storage.remove('256782');
          this.$storage.remove('workOrderData');
        }
        if (type == 1) {
          this.$storage.remove('workOrderData');
          this.$storage.remove('256782');
          this.$storage.set('workOrderData', this.orderData1)
        }
        if (type == 20) {
          this.$storage.remove('workOrderData');
          this.$storage.remove('256782');
        }
        if (type == 21) {
          this.$storage.remove('workOrderData');
          this.$storage.remove('256782');
          this.$storage.set('256782', this.orderData1)
        }
        this.$router.push(path)
      },
    },
  }
</script>
<style lang="scss">
  .demo{
    height: 100%;padding-left: 20px;
    div{height: 60px;line-height: 30px;margin-bottom: 20px;}
    .a{border:1px solid #333; width: 400px; height: 40px;}
    .b{border:1px solid #333; width: 399px; height: 39px; }
    .c{border:1rpx solid #333; width: 400px; height: 40px;}
    .d{border:1rpx solid #333; width: 399px; height: 39px; }
  }
</style>
