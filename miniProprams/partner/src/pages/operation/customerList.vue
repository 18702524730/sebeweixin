<template>
  <div class="customerList">
    <div class="card_list" v-for="(item, index) in dataList" :key="index" @click="checked(item)">
      <div class="row card">
        <label>主体类型</label>
        <span>{{subjectTypeArr[item.applyType-1]['name']}}</span>
      </div>
      <div class="row card">
        <label>主体名称</label>
        <span>{{item.applyName}}</span>
      </div>
      <div class="row card">
        <label>联系人姓名</label>
        <span>{{item.contactsName}}</span>
      </div>
      <div class="row card">
        <label>联系人电话</label>
        <span>{{item.contactsPhone}}</span>
      </div>
      <i class="icon iconfont icon-xiugai1 edit" @click.stop="toEdit(item)"></i>
    </div>
    <!-- 没数据 -->
    <div class="null_single" v-if="loaded && !dataList.length">
      <img class="portrait" src="~assets/img/store/emptyImg.png">
      <div class="txt mb40">暂无客户记录</div>
    </div>
    <div class="fixed-bottom row-center bottomBar">
      <span class="lc save" @click="add">新增</span>
    </div>
  </div>
</template>
<script>
  import mixin from 'mixins/';
  const subjectTypeArr = [
    {
      id: 1,
      name: '大陆个体'
    },
    {
      id: 2,
      name: '大陆企业'
    },
    {
      id: 3,
      name: '港澳台及境外个人'
    },
    {
      id: 4,
      name: '港澳台及境外企业'
    }
  ];
  export default{
    components: {
    },
    mixins: [mixin],
    data() {
      return{
        loaded: false,
        subjectTypeArr: subjectTypeArr,
        dataList: []
      }
    },
    mounted() {

    },
    onShow() {
      this.getCustomerList();
    },
    methods: {
      async getCustomerList() {
        this.loaded = false;
        this.dataList = await this.API.operation.getCustomerList(0) || [];
        this.loaded = true;
        console.log(this.dataList)
      },
      toEdit(item) {
        this.$router.push(`/pages/operation/customerEdit?id=${item.applySubjectId}`);
      },
      add() {
        this.$router.push('/pages/operation/customerEdit?id=0');
      },
      checked(item) {
        let query = this.$root.$mp.query;
        let ret = {...query}
        ret.id = item.applySubjectId;
        ret.isInfo = 1;
        this.$storage.set('customerItem_'+item.applySubjectId, item);
        // this.$router.replace({ path: '/pages/operation/customerEdit', query: ret });
        const pages = getCurrentPages();
        let options = pages[pages.length-2].options;
        options = {...options, ...ret }
        pages[pages.length-2].options = options
        console.log('customerEidt_pages:', pages)
        this.$router.back();
      },
    },
  }
</script>
<style lang="scss">
  .customerList{
    height: 100%;padding-top: 20px;
    .card_list{
      width: 100%;padding: 20px;margin-bottom: 20px;background-color: #fff;position: relative;
      .card{
        height:40px;font-size:28px;margin-bottom: 20px;
        label{width: 180px;}
        span{color: #999999;width: 530px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
        &:last-child{margin-bottom: 0;}
      }
      .edit{position: absolute;top: 0;right: 0;z-index: 2;width: 70px;height: 70px;padding: 20px;font-size: 30px;line-height: 30px;}
    }
    .null_single{margin-top: -20px;}
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
</style>
