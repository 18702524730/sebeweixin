<template>
  <div>
    <div class="user-main">
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
      pathTo(item, index, idx){
        //this.activeIndex = index+':'+idx;
        this.$router.push(item.path);
      },

      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      //匹配路由，高亮左侧导航菜单
      matchRoute(){
        var route = this.$route;
        var path = route.path;
        var fullPath = route.fullPath;
        var self = this;
        var asideBarData = this.asideBarData;
        var temp = false;
        $.each(asideBarData, function(index, item){
          $.each(item.children,  function(idx, it){
            if (path.indexOf(it.path)!=-1) {
              self.activeIndex = index+':'+idx;
              // temp = true;
            }
            if(fullPath.indexOf(it.path)!=-1) {
              self.activeIndex = index+':'+idx;
              temp = true;
              // return false;
            }
          })
        })
        if (!temp) {
          self.activeIndex = '0:0'; //匹配不上，高亮首页
        }
      },
      updateIsAdd(data){
        this.isAdd = data;
      },
      updateBaseInfo(data){
        this.userName = data.truename;
      },
      init(){
        this.matchRoute();
        this.statistic();
      }
    },
    mounted() {
      //this.init();
      this.cartNum = this.$cookie.get("cart_num") || '0';
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'init'
    }
  }

</script>

<style lang="scss">
  .user-main{
    background: #f5f5f5;
    padding: 15px 0;
    width: 100%;
    height: 100%;
    position:relative;
    clear: both;
    min-height: 700px;
    min-width: 1170px;
    aside{
      position: absolute;
      left: 0px;
      top:0;
      width: 210px;
      height: 100%;
      min-height: 700px;
      background-color: #fff;
      .aside-nav{
        padding-top: 10px;
        h3{font-size: 16px;font-weight: normal;height: 38px;line-height: 38px;padding-left: 20px;}
        .nav-list{
          li{
            padding-left: 20px;
            font-size:14px;
            height: 28px;
            line-height:28px;
            a{
              color: #666;
              b{color: #3db1fa;font-weight:normal;}
            }
            a:hover{
              color: #3db1fa;
            }
          }
          li.active{background-color: #e5eef4;border-left: 3px solid #3db1fa;height: 35px;
            line-height:35px;}
        }
      }
    }
    .content-container{
      background-color: #fff;
      min-height: 700px;
      margin-top:0;
      margin-left: 225px;
    }
  }
</style>
