<template>
  <div class="affinity_search">
    <div class="serach_top">
      <div class="searchbox">
        <input type="text" name="" v-model="content" ref="ipt" placeholder="请输入近似商标名称" @keyup.enter="search">
        <button @click="content=''">取消</button>
      </div>
    </div>
    <toast v-model="visible"  :text='ver_tip' type="warn" :time="3000" :width="'auto'"></toast>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import qs from 'qs'
  import { Toast } from 'vux'
  export default {
    data () {
      return {
        content:'',
        visible: false,
        ver_tip:''
      }
    },
    components: {
        Toast,
    },
    mounted () {
      this.content = this.$route.query.content;
      this.$refs.ipt.focus();
      //this.setTitle();
      //this.setRightEmpty();
      this.updateSelectedTM({
        selectedTMArr: []
      });
    },
    methods: {
      ...mapMutations('main', [
        'updateSelectedTM',
      ]),
      search(){
        var str = this.content;
        if (!str || !(str+'').trim()) {
          this.visible = true;
          this.ver_tip = '请输入近似商标名称';
          return;
        }
        this.$router.push({name:'affinitySearchR', query: {content: this.content}});
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .affinity_search {
    .serach_top{
      height: px(101);padding:px(15) 0;border-bottom:1px solid #E4E4E4;background-color: #fff;
      .searchbox{
        width: px(702);height: px(70);background: #eee url(~assets/img/affinitySearch/search_icon.png) px(10) center no-repeat;-webkit-background-size: px(40) px(40);border-radius: px(6);
        background-size: px(40) px(40);margin:0 auto;padding-left: px(70);color:#999;
        input{height: px(42);line-height: px(42);width: px(520);margin-top: px(14);border:0;background-color: transparent;font-size: px(30)}
        button{float: right;margin-right: px(20);height: px(42);line-height: px(42);margin-top: px(14);font-size: px(30)}
      }
    }
  }
</style>
