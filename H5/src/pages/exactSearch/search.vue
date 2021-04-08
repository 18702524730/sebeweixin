<template>
  <div class="exact_search">
    <div class="serach_top">
      <div class="searchbox">
        <div class="search_type_list">
          <span @click="showSearchType=!showSearchType">{{searchTypeName}} <i class="fa" :class="{'fa-caret-down':!showSearchType,'fa-caret-up':showSearchType}" aria-hidden="true"></i></span>
          <ul :class="{hidden:!showSearchType}">
            <li v-for="it in searchTypeData" @click="selectSearchType(it)">{{it.name}}</li>
          </ul>
        </div>
        <input type="text" name="content" ref="content" v-model="content" :placeholder="'请输入'+searchTypeName" @keyup.enter="search">
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
  //import dingtalk from 'weex-dingtalk';
  export default {
    data () {
      return {
        content:'',
        visible: false,
        ver_tip:'',
        searchTypeData:[
          {
            id:1,
            name:'商标名称'
          },
          {
            id:2,
            name:'商标注册号'
          },
          {
            id:3,
            name:'申请人名称'
          },
          {
            id:4,
            name:'代理人名称'
          }
        ],
        showSearchType: false,
        searchTypeName: '商标名称',
        search_type: 1,
      }
    },
    components: {
        Toast,
    },
    mounted () {
      this.content = this.$route.query.content;
      this.search_type = this.$route.query.search_type || 1;
      this.searchTypeName = this.$route.query.searchTypeName || '商标名称';
      setTimeout(() => {
        this.$refs.content.focus();
      }, 50);
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
          this.ver_tip = '请输入'+ this.searchTypeName;
          return;
        }
        this.$router.push({
          name:'exactSearchR',
          query: {
            content: this.content,
            search_type: this.search_type,
            searchTypeName: this.searchTypeName
          }
        });
      },
      selectSearchType(item){
        this.search_type = item.id;
        this.searchTypeName = item.name;
        this.showSearchType = false;
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .exact_search {
    height: 100vh;
    .serach_top{
      height: px(101);padding:px(15) 0;border-bottom:1px solid #E4E4E4;background-color: #fff;
      .searchbox{
        width: px(702);height: px(70);background: #eee;border-radius: px(6);margin:0 auto;color:#999;
        .search_type_list{
          position: relative;max-width: px(210);height: px(56);line-height: px(42);padding-top: px(14);display: inline-block;
          span{
            padding-left: px(20);font-size: px(30);color: #666;height: px(42);
            i.fa{margin-left: px(10);color: #737373;}
          }
          ul{
            position: absolute;top: px(66);left: 0;width: px(210);border: 1px solid #E4E4E4;border-radius: px(6);background-color: #fff;
            li{height: px(70);line-height: px(70);font-size: px(28);color: px(66);padding-left:px(20);border-bottom: 1px solid #E4E4E4; }
            li:hover{background-color: #eee;}
            li:last-child{border-bottom: 0;}
          }
        }
        input{height: px(42);line-height: px(42);width: px(380);padding-left: px(10);border:0;background-color: transparent;font-size: px(30)}
        button{float: right;margin-right: px(20);height: px(42);line-height: px(42);margin-top: px(14);font-size: px(30)}
      }
    }
  }
</style>
