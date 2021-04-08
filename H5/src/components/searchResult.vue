<template>
  <div class="common_search">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite" :fixedTop="fixedTop" class="s_result" v-show="loading" ref="scroller">
      <div class="s_result_in">
        <div class="r_list_wrap" v-for="item in resultList" :key="item.id" v-if="item.category_id">
          <div class="r_list">
            <div class="r_list_in" :class="{checktype: selectMode}"
            @touchstart="start"
            @mousedown="start"
            @touchmove="move"
            @mousemove="move"
            @touchend="end($event, item)"
            @mouseup="end($event, item)"
            @touchcancel="end">
              <i class="checkbox" v-if="selectMode" :class="{checked: item.isAdded}" @click="selectTM(item)"></i>
              <router-link :to="'/dtDetail?id='+item.id+ '&code='+item.category_id">
                <div class="r_list_img">
                  <!-- <img :src="'http://7xqaxs.com1.z0.glb.clouddn.com/'+item.registr_num+'.jpg'"> -->
                  <img v-lazy="item.tmImg">
                </div>
                <div class="r_list_info">
                  <p class="til"><label>商标名称</label><span v-html="item.tm_name_temp || item.tm_name"></span></p>
                  <p class="status"><label>当前状态</label><span>{{item.status_definition}}</span></p>
                  <p class="type"><label>类别</label><span>{{item.category_id}}类 {{cateIdData[item.category_id-1].goodsname}}</span></p>
                  <p class="applytime"><label>申请时间</label><span>{{item.apply_date}}</span></p>
                </div>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </router-link>
            </div>
            <div class="r_list_right"
            @touchstart="start"
            @mousedown="start"
            @touchmove="move"
            @mousemove="move"
            @touchend="end($event, item)"
            @mouseup="end($event, item)"
            @touchcancel="end" :class="{animate_end:true, fadeInRight:item.showRight, fadeOutRight:item.showRight===false}"  @click="closeRight($event, item)">
              <div class="applyer">
                <p><b>申请人</b><br>{{item.proposer}}</p>
                <p><b>代理人</b><br>{{item.agent_name?item.agent_name:'无'}}</p>
              </div>
              <div class="applyer_btn">
                <button v-if="!item.isAdded" @click="selectTM(item, true)"><span>添加到<br>分析报告</span></button>
                <button v-if="item.isAdded" @click="selectTM(item, false)"><span>取消<br>添加</span></button>
                <button @click="itemQuery(item)"><span>查询<br>近似商标</span></button>
              </div>
            </div>
            <div class="divission"></div>
          </div>
        </div>
      </div>
    </scroller>
    <div class="empty" v-show="!loading && !resultList.length">
      <div class="notip">
        <p>暂无结果，重新筛选</p>
      </div>
    </div>
    <!-- <div class="empty" v-show="!resultList.length">
      <div class="notip">
        <p>“拾贝”暂未被注册哦~</p>
        <a href="">立即申请注册商标</a>
      </div> v-show="!loading && !resultList.length"
    </div> -->
    <div class="r_footer" v-show="!loading && !resultList.length">
      <p>您还可以缩短或修改您的搜索词，重新搜索</p>
    </div>
    <searchTip></searchTip>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import qs from 'qs'
  import $ from 'jquery'
  import searchTip from 'components/searchTip.vue'
  import Data from 'src/utils/data.js' //右侧筛选商品类别
  import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  import { Actionsheet, Popup, Spinner } from 'vux';
  const cartUrl = CONFIG.cartUrl;
  const indexUrl =  CONFIG.indexUrl;


  export default {
    directives: {
      TransferDom
    },
    components: {
      searchTip,
      Actionsheet,Popup,Spinner,
      Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    props:['resultList', 'selectMode','noMoreData', 'loading', 'scrollH'],
    data () {
      return {
        pageX:'',
        pageY:'',
        direction:'',
        valid:'',

    		fixedTop: 0,
        lastScrollTop:0,
        content:'',
        cateIdData: Data.cateIdData,
        page: 0,
      }
    },
    mounted () {
      var self = this;
      var serach_top_h = getComputedStyle(this.$parent.$refs.serach_top, null).height.slice(0,-2)-0;
      var s_contypes_h = getComputedStyle(this.$parent.$children[0].$refs.s_status, null).height.slice(0,-2)-0;
      this.fixedTop = serach_top_h + s_contypes_h;
      //console.log(this.fixedTop)
      //window.scrollTo(0,0);
      //console.log('scrollTop:',document.body.scrollTop)
      //$('body,html').animate({scrollTop: 0}, 300, 'swing');
      var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
      if (!isIOS) {
        window.addEventListener('scroll', function(){
          var scrollTop = document.body.scrollTop;
          /*console.log('------------------------------------')
          console.log('scrollTop:',document.body.scrollTop)
          console.log('scrollH:', self.scrollH)*/
          var fixedTop = self.fixedTop;
          var gap = scrollTop - self.lastScrollTop;
          var scrollH = self.scrollH + gap;
          //console.log('gap:', gap)
          if (gap>0 && self.scrollH < fixedTop) {
            self.$emit('update:scrollH', scrollH > fixedTop ? fixedTop : scrollH);
          } else if (gap<=0 && self.scrollH > 0) {
            self.$emit('update:scrollH', scrollH < 0 ? 0 : scrollH);
          }
          self.lastScrollTop = scrollTop;
        })
      }
    },
    methods: {
      ...mapMutations('main', [
        'updateSelectedTM',
      ]),
      infinite(done) {
        if (this.noMoreData) {
          done(true);
          this.page = 1;
          return;
        }
        this.page += 1;
        this.$emit('queryList', {
          start: this.page,
          isLoadMore: true,
          callback: done
        });
      },
      refresh(done) {
        this.updateSelectedTM({
          selectedTMArr: []
        });
        this.page = 1;
        this.$emit('queryList', {
          callback: done,
          isRefresh: true
        });
      },

      selectTM(item, isChecked){
        if (typeof isChecked == 'boolean') {
          item.isAdded = isChecked;
        }else{
          item.isAdded = !item.isAdded;
        }
        var arr = [].concat(this.$store.state.main.selectedTMArr);
        var inArrayOf = function(arr, sortItem, sortName){
          var ret = -1;
          arr.forEach((item, i) => {
            if (item[sortName] == sortItem[sortName]) {
              ret = i;
              return false;
            }
          });
          return ret;
        }
        var idx = inArrayOf(arr, item, 'id');
        if (idx != -1) {
          arr.splice(idx, 1);
        }else{
          arr.push(item);
        }
        this.updateSelectedTM({
          selectedTMArr: arr
        });
      },
      itemQuery(item){
        this.content = item.tm_name;
        if (this.$route.path.indexOf('affinitySearchR') !== -1) {
          //this.query();
          this.$emit('queryList', {
            content: this.content,
            cate_id: '',
            status: '',
            sort_name: ''
          });
          this.$emit('resetCondition');
        }else{
          this.$router.push({name:'affinitySearchR', query: {content: this.content}});
        }
      },
      closeRight(ev, item){
        if (ev.target.nodeName.toLowerCase() === 'span' || ev.target.nodeName.toLowerCase() === 'button') {
          return
        }
        item.showRight=false
      },
      start (ev) {
        /*if (this.isOpen) {
          return
        }*/
        const touch = ev.touches ? ev.touches[0] : ev
        this.pageX = touch.pageX
        this.pageY = touch.pageY
      },
      move (ev) {
        const touch = ev.touches ? ev.touches[0] : ev
        this.distX = touch.pageX - this.pageX
        this.distY = touch.pageY - this.pageY
        if (!this.direction) {
          this.direction = this.distX > 0 ? 'left' : 'right'
        }
        if ((this.direction === 'right' && this.distX > 0 && this.hasRightMenu) || (this.direction === 'left' && this.distX < 0 && this.hasLeftMenu)) {
          this.valid = true
          ev.preventDefault()
        }
        if (this.valid === undefined) {
          if (this.distX > 0 && this.hasLeftMenu === false) {
            this.valid = false
          } else if (this.distX < 0 && this.hasRightMenu === false) {
            this.valid = false
          } else if (Math.abs(this.distX) > 0 || Math.abs(this.distY) > 0) {
            this.valid = Math.abs(this.distX) > Math.abs(this.distY)
          } else {
            ev.preventDefault()
          }
        }
      },
      end (ev, item) {
        if (this.disabled) {
          return
        }
        if (ev.target.nodeName.toLowerCase() === 'button') {
          return
        }
        const threshold = 0.3;
        if (this.valid === true) {
          if (this.distX < 0 && this.direction === 'right') {
            if (this.distX < -threshold) {
              console.log('right')
              var resultList = this.resultList;
              resultList.forEach(function(it, i){
                it.showRight = '';
              });
              item.showRight = true;
              this.$emit('on-open')
              this.isOpen = true
            }
          } else if (this.distX > 0 && this.direction === 'left') {
            if (this.distX > threshold) {
              console.log('left')
              item.showRight = false;
              /*this.$emit('on-open')
              this.isOpen = true*/
            }
          }
          ev.preventDefault();
        } else if (this.pageX !== undefined) {}
        this.pageX = this.pageY = this.valid = undefined
        this.direction = ''
      },
    },
    watch: {
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .common_search {
    z-index: 1;
    .extra{border-top: 1px solid #f1f1f1;}
    .s_result {
      top:px(198) !important;padding-top: px(20);
      .s_result_in{
        background-color: #fff;/* border-top: 1px solid #E4E4E4;margin-top:-1px; */
        .r_list_wrap{
          height: px(262);position: relative;
          .r_list{
            height: px(260);padding-left: px(30);padding-top: px(30);position: relative;
            .r_list_in{
              height: 100%;
              .checkbox{float:left;width: px(38);height: px(38);border-radius: 50%;display: inline-block;margin-top: px(81);vertical-align: top;margin-right: px(15);background: #EEEEEE;border: 1px solid #DDDDDD;}
              .checkbox.checked{background-color: transparent;border:0;border-radius:0;background: transparent url(~assets/img/components/checked.png) 0 0 no-repeat;background-size:100% 100%;}
              .r_list_img{
                float:left;width:px(200);height: px(200);line-height: px(188);overflow:hidden;border-radius: px(7);border:1px solid #d9d9d9;display:table-cell;vertical-align: middle;text-align: center;background-color: #fff;
                img{max-width: px(198);max-height: px(198);vertical-align:middle;}
              }
              .r_list_info{
                float:left;margin-left:px(30);top:px(30);line-height: px(40);
                p{
                  font-size: px(28);line-height: px(40);padding-bottom:px(12);color: #666;vertical-align: bottom;
                  label{width: px(142);display: inline-block;vertical-align: bottom;color: #999;}
                  span{width: px(270);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display: inline-block;vertical-align: bottom;color: #999;}
                }
                p.til{
                  span{
                    color: #3DB1FA;
                    b{color: #f64744;font-weight: normal;}
                  }
                }
                p.type{
                  span{
                    width:auto;font-size:px(24);background-color: #3DB1FA;height: px(40);line-height: px(40);color: #fff;padding:0 px(8);border-radius: px(6);
                    b{color: #3DB1FA;font-weight: normal;display: inline-block;max-width: px(210);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;vertical-align: bottom;}
                  }
                }
                p.status{
                  span{color: #666;}
                }
                p.applytime{
                  span{color: #666;}
                }
              }
              .fa-angle-right{position: absolute;top: px(95);right: px(30);color: #E4E4E4;font-size:30px;font-weight: 300;}
            }
            .r_list_in.checktype{
              p{
                span{width: px(227);}
              }
              p.type{
                span{
                  b{max-width: px(167);}
                }
              }
            }
          }
          .r_list_right{
            display: none;position: absolute;right:0;top:0;width:100%;height: px(260);font-size: px(26);background: #fff;
            .applyer{
              float: left;padding-top: px(30);padding-left: px(30);
              p{
                color: #333;width: px(435);margin-bottom: px(20);line-height: px(37);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
                b{color: #999;font-weight: normal;}
              }
              p:first-child{margin-bottom:px(57);}
            }
            .applyer_btn{
              float: right;width: px(240);position: relative;
              button{
                width: px(240);height: px(130);color: #3DB1FA;text-align:center;border-left: 1px solid #E4E4E4;
                span{display: inline-block;height: px(74);line-height: px(37)}
              }
              button:first-child{color:#fff;background-image: linear-gradient(90deg, #337DFF 2%, #59AAFF 100%);border-left: 1px solid #3DB1FA;}
            }
          }
          .fadeInRight,.fadeOutRight{display: block;}
          .animate_end{
            -webkit-animation-duration: 0.3s;
            animation-duration: 0.3s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
        }
        .divission{height: px(2);background-color: #f1f1f1;}
        /* .r_list_wrap:first-child .r_list{border:0;} */
      }
      .spinner{
        span{font-size: px(24);}
        .pulldown-down,.pulldown-up{background: transparent url(~assets/img/loading.gif) left center no-repeat;-webkit-background-size: px(90) px(24);background-size: px(90) px(24);padding-left: px(100);font-size: px(24);}
        .pulldown-load{background: transparent url(~assets/img/loading2.gif) left center no-repeat;-webkit-background-size: px(90) px(24);background-size: px(90) px(24);padding-left: px(100);font-size: px(24);}
      }
    }
    .empty{
      /* margin-top: px(220);padding-top: px(288); */
      text-align: center;padding-top: px(780);background: transparent url(~assets/img/imgSearch/empty_bg.png) center px(508) no-repeat;
      background-size:px(331) px(268);
      p{font-size: px(30);line-height: px(42);color: #999;}
      a{display: inline-block;width: px(340); height: px(74);line-height: px(74);color:#fff;font-size: px(30);background-image: linear-gradient(90deg, #337DFF 2%, #59AAFF 100%);border-radius: px(6);margin-top: px(30);}
    }
    .r_footer{
      width: 100%;position: fixed;bottom: 0;height: px(124);line-height: px(124);padding:0 px(30);
      p{width: 100%;text-align: center;height: px(122);line-height: px(122);font-size: px(24);color: #999;border-top: 1px solid #E4E4E4;}
    }
  }
  body .vux-popup-dialog{background-color: #fff;}
</style>
