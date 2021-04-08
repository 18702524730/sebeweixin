<template>
  <div class="category_group">
    <div class="searchPanelWrap">
      <div class="searchPanel">
        <sebe-icon type="search" :size="40"></sebe-icon>
        <input type="search" placeholder="请输入小项名称或ID" @focus="keyword = ''" v-model="keyword" @input="keywordChange"/>
        <div class="searchBtn" @click="keyword = '',showSearch=false" v-if="keyword">取消</div>
      </div>
    </div>
    <div class="itemMins" v-if="keyword && showSearch">
      <div class="row-between itemMin" v-for="(it, idx) in filterMinData" :key="it.minId" :class="{'hight': isHight}" @click="checkMin(it)">
        <label>{{it.minName}}</label>
      </div>
      <p v-if="!filterMinData.length">没有找到搜索结果</p>
    </div>
    <div class="groupInfo">
      <div class="categoryItem"
        v-for="(item, index) in groupData"
        :key="item.groupId"
        :class="{'itemHight': !!item.checkedNum}" @click="showMins(index)">
        <div class="itemName">
          {{item.groupName}}
        </div>
        <div class="itemDes">
          <label>{{item.checkedNum>0 ? item.checkedNum : ''}}</label>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
    </div>
    <div class="fixed-bottom row-center bottomBar">
      <span class="lc save" @click="saveData">保存</span>
    </div>
    <!-- 消息提示 -->
    <u-message />

    <div class="transition_up" v-if="minsVisible" :class="{'show_animation': minsVisible}">
      <div class="mask_bg"  @click="hideFn"></div>
      <div class="transition_wrap" >
        <div class="popup_wrap">
          <div class="chooseMin">
            <div class="row-between top_header">
              <span>选择小项</span><label @click="hideFn">取消</label>
            </div>
          </div>
          <div class="mid_content">
            <div class="categoryItem" :class="{'itemHight': !!curDroupData.checkedNum}">
              <div class="itemName">
                <i class="icon iconfont icon-xiaochengxu-1"></i>{{curDroupData.groupName}}
              </div>
              <div class="itemDes">
                <label>{{curDroupData.checkedNum>0 ? curDroupData.checkedNum : ''}}</label>
              </div>
            </div>
            <scroll-view class="categoryItemMinWrap" scroll-y="true" @scroll="minScroll">
              <div class="row-between categoryItemMin" :class="{ 'nodata': !it}" v-for="(it, idx) in curDroupData.serviceNiceMin" :key="idx" @click="doCheck(it, idx)">
                <label v-if="it">{{it.minName}}</label><icon v-if="it" type="success" size="19" :color="it.checked ? '#FF9639' : '#EEEEEE'"/>
              </div>
            </scroll-view>
          </div>
          <div class="bt_footer" @click="hideFn">确定</div>
        </div>
      </div>
    </div>

    <mptoast />
  </div>
</template>
<script>
  // import mixin from 'mixins/';
  import Vue from 'vue'
  import tmTypeData from '@/utils/tmTypeData.js'
  const cateIdData = tmTypeData.cateIdData;
  const screenNum = 5; // 前screenNum屏/后screenNum屏
  const perN = 8; // 每屏几个(小项的行数)
  const N = (screenNum*2+1)*perN; //每次渲染的总数量：当前屏+前screenNum屏+后screenNum屏 * perN
  const SystemData = WXP.getSystemInfoSync()
  const screenWidth = SystemData.screenWidth;
  const pixelRatio = SystemData.pixelRatio;
  let G = new Vue();
  /*
  orderData: {}, //工单数据
  workOrderService: [], //工单数据中的大类小项数据
  curMinDataArrO:[], //curMinDataArr的初始拷贝
  */
  export default{
    components: {
    },
    // mixins: [mixin],
    data() {
      return{
        showSearch: false, //显示搜索结果
        id: '', //当前大类id
        minsVisible: false, //显示弹框
        groupData: [], //当前大类下的所有群组和小项数据
        curIndex:'',
        curDroupData: {
          serviceNiceMin: [] //当前选择的群组下的小项数据
        }, //当前选择的群组和小项数据
        keyword: '', //小项名称或ID搜索关键词
        filterMinData: [], //小项名称或ID搜索关键词过滤的小项数据
      }
    },
    onUnload() {
      this.groupData = [];
    },
    mounted() {
      console.log(G)
      this.keyword = '';
      let query = this.$root.$mp.query;
      console.log('group_query:', query)
      let id = this.id = query.classId;
      if (id) {
        let title = (id < 10 ? '0'+ id : id) + ' ' + cateIdData[id-1]['goodsname'];
        wx.setNavigationBarTitle({title});
        this.getNiceGroup(id);
      }
      if (query.workOrderId) {
        // 获取工单详情（本地缓存）
        G.orderData = this.$storage.get(query.workOrderId) || {}
        //cateIdData[query.id-1]['checkedNum'] = query.checkedNum;
      }else{
        // 获取自定义的详情数据（本地缓存）
        G.orderData = this.$storage.get('workOrderData') || {}
      }
      G.orderData.workOrderService = G.orderData.workOrderService || [];
      G.workOrderService = G.orderData.workOrderService;
      this.initWorkOrderService();
    },
    methods: {
      // 监听小项滚动
      minScroll(e) {
        // 这儿的timer不能挂在data中，因为timer变化会导致所有的数据从微信小程序的 JSCore 进程，通过 setData 序列化成字符串后发送到 JSRender 进程。所以，如果你的数据量巨大的时候，会导致页面非常卡顿。
        G.timer && clearTimeout(G.timer);
        G.timer = setTimeout(() => {
          let arrO = G.curMinDataArrO;
          let arr = this.curDroupData.serviceNiceMin;
          if (arr.length<=N) {return;}
          console.log('length:', arrO.length, arr.length)
          let H = e.mp.detail.scrollTop;
          // 每行高度94px不同机型换算后，用滚动高度计算获得滚动了几行
          let num = Math.floor(H/(94*screenWidth/750));
          arr.fill(0);
          let l = arr.length;
          // 保证滚动的任何时候(顶部或底部)都是N行数据
          let startIndex = Math.min(Math.max(num-screenNum*perN, 0), l-N);
          arr.splice(startIndex, N, ...arrO.slice(startIndex, startIndex+N));
          console.log('scrollTop_行数：', e.mp.detail.scrollTop, num)
        }, 100)
      },
      // 初始化已有的大类群组数据（减少后面的数据遍历）
      initWorkOrderService() {
        G.workOrderService.forEach((item) => {
          let serviceNiceMin = item.serviceNiceMin;
          let arr = [];
          serviceNiceMin.forEach((it) => {
            it.checked = true;
            let idx = this.inArrayOf(arr, it, 'groupId');
            if(idx !== -1) {
              arr[idx].serviceNiceMin.push(it);
            }else{
              let ret = {
                groupId: it.groupId,
                groupName: it.groupName,
                checkedNum: 0,
                serviceNiceMin: []
              }
              ret.serviceNiceMin.push(it);
              arr.push(ret)
            }
          });
          arr.forEach((its) => {
            its.checkedNum = its.serviceNiceMin.length;
          });
          item.groupData = arr;
        });
        console.log('this.workOrderService:', G.workOrderService)
      },
      inArrayOf(arr, sortItem, sortName){
        var ret = -1;
        arr.some((item, i) => {
          if (item[sortName] == sortItem[sortName]) {
            ret = i;
            return true;
          }
        });
        return ret;
      },
      // 点击小项选择
      doCheck(ret, index) {
        let item = {...ret};
        item.checked = !item.checked;
        this.curDroupData.serviceNiceMin.splice(index, 1, item);
        G.curMinDataArrO[index] = item;
        let checkedNum = this.curDroupData.checkedNum || 0;
        if (item.checked) {
          this.curDroupData.checkedNum = checkedNum + 1
        }else{
          this.curDroupData.checkedNum = checkedNum - 1
        }
        /*this.curDroupData.checkedNum = this.curDroupData.serviceNiceMin.filter((item) => {
          return item.checked
        }).length;*/
        console.log(this.curDroupData.checkedNum)
      },
      // 点击群组，展开小项弹框
      showMins(index) {
        let item = G.groupData[index];
        this.minsVisible = true;
        this.curIndex = index;
        this.curDroupData = item;
        let arr = this.curDroupData.serviceNiceMin;
        arr = item.serviceNiceMin;
        G.curMinDataArrO = [...arr];
        if (arr.length > N) {
          arr.fill(0, N);
        }
      },
      // 收起小项弹框
      hideFn(){
        this.minsVisible = false;
        this.curDroupData.serviceNiceMin = G.curMinDataArrO;
        G.groupData[this.curIndex].checkedNum = this.curDroupData.serviceNiceMin.filter((it) => {
          return it.checked;
        }).length;
        this.initGroupData(G.groupData);
      },
      // 小项自动搜索
      keywordChange(e) {
        let v = e.mp.detail.value;
        let groupData = G.groupData;
        let arr = [];
        groupData.some((item) => {
          let serviceNiceMin = item.serviceNiceMin;
          serviceNiceMin.some((it) => {
            if (it.minName.indexOf(v) !== -1) {
              arr.push(it);
              if (arr.length>=10) {
                return true;
              }
            }
          })
          if (arr.length>=10) {
            return true;
          }
        });
        this.filterMinData = arr;
        this.showSearch = true;
        return v;
      },
      // 搜索结果：点击选中小项
      checkMin(min) {
        this.initMinCheckStatusAndNum(G.groupData, min.groupId, min.minId);
        this.initGroupData(G.groupData);
        this.showSearch = false;
        this.$mptoast('添加成功');
      },
      // 设置小项选中状态及数量
      initMinCheckStatusAndNum(groupData, groupId, minId) {
        groupData.some((it) => {
          if (it.groupId == groupId) {
            let serviceNiceMin = it.serviceNiceMin;
            serviceNiceMin.some((item) => {
              if (item.minId == minId) {
                item.checked = true;
                return true;
              }
            })
            it.checkedNum = serviceNiceMin.filter((item) => {
              return item.checked
            }).length;
            return true;
          };
        });
      },
      // 获得该大类下群组和小项数据
      async getNiceGroup(id) {
        let groupData = await this.API.operation.getNiceGroup(id);
        // 初始化小项选中状态
        G.workOrderService.some((it) => {
          if (it.classId == id) {
            let selfGroupData = it.groupData;
            selfGroupData.forEach((item) => {
              groupData.some((its) => {
                if (its.groupId == item.groupId) {
                  its.checkedNum = item.checkedNum;
                  let serviceNiceMin = item.serviceNiceMin;
                  let oServiceNiceMin = its.serviceNiceMin;
                  serviceNiceMin.forEach((items) => {
                    oServiceNiceMin.some((p) => {
                      if (p.minId == items.minId) {
                        p.checked = true;
                        return true;
                      }
                    })
                  });
                  return true;
                };
              });
            });
            return true;
          }
        });
        G.groupData = groupData;
        this.initGroupData(groupData)
      },
      initGroupData(arrData) {
        let arr = [];
        arrData.forEach((item) => {
          let ret = {
            ...item,
            ...{serviceNiceMin: ''}
          };
          arr.push(ret);
        });
        this.groupData = arr;
      },
      // 拼装总的选中的小项数据到一个arr
      getMinsArr() {
        let groupData = G.groupData;
        let arr = [];
        groupData.forEach((item) => {
          if (item.checkedNum) {
            let serviceNiceMin = item.serviceNiceMin;
            serviceNiceMin.forEach((it) => {
              if (it.checked) {
                arr.push(it);
              }
            })
          }
        });
        return arr;
      },
      // 保存数据
      saveData() {
        let query = this.$root.$mp.query;
        let { id } = this
        let arr = this.getMinsArr();
        let ret = {
          classId: id - 0,
          className: (id < 10 ? '0' + id : id) + " " + cateIdData[id-1]['goodsname'],
          serviceNiceMin: arr
        };
        let isIn = false;
        G.workOrderService.forEach((item) => {
          // 当classId不存在时
          if (!item.classId) {
            item.classId = ret.classId;
            item.className = ret.className;
          }
          if (item.classId == ret.classId) {
            isIn = true;
            item.serviceNiceMin = arr;
          }
        });
        if (!isIn && arr.length) {
          G.workOrderService.push(ret);
        }
        // 本地缓存
        this.$storage.set(query.workOrderId ? query.workOrderId : 'workOrderData', G.orderData)
        this.$router.go(-1);
      }
    },
  }
</script>
<style lang="scss">
  .category_group{
    min-height: 100%;position: relative;background-color: #fff;padding-bottom: 98px;
    .searchPanelWrap{
      padding: 20px 0;
      .searchPanel{
        border:1px solid #eee;border-radius: 32px;padding: 0 30px 0 20px;display: flex;background: #F8F8F8;margin:0 20px;background-color: #F8F8F8;font-size: 28px;
        .i-icon{line-height: 60px;padding: 0 20px 0 0;
          &.clearIcon{padding: 0 20px;}
        }
        .searchBtn{line-height: 60px; color: #999;flex-basis:60rpx;}
        .input-placeholder{color: #999;}
        input{height: 60px;line-height: 60px;flex-basis:530rpx;}
      }
    }
    .itemMins{
      position: absolute;top: 102px;left: 0;right: 0;bottom: 0;background-color: #fff;z-index:100 ;
      .itemMin{
        height: 94px;border-bottom:1px solid #eee;line-height: 94px;margin: 0 30px;
        label{padding-left: 24px;}
        &.hight{
          label{color: #FF9639;}
        }
      }
      >p{height: 94px;line-height: 94px;padding-left: 54px;}
    }
    .groupInfo{
      width: 100%;background-color: #fff;
      .u_input:first-child{border-top: 0;}
      .categoryItem:last-child{border-bottom: 0;}
      .file_card{height: 200px;padding: 0 20px;}
    }

    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }

    .transition_up {
      position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
      .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
      .transition_wrap {
        position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
      }
    }
    .show_animation {
      .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
      .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
    }

    .popup_wrap{
      padding-top: 10px;position: relative;
      .chooseMin{
        height: 85px;line-height: 85px;padding: 0 20px;
        span{font-size: 32px;}
        label{color: #999;}
      }
      .mid_content{
        height: 940px;padding-bottom: 98px;
        .categoryItem{
          background-color: #F8F8F8;margin: 0;padding: 0 30px 0 25px;border-bottom: 0;
          .icon{}
        }
        .categoryItemMinWrap{
          height: 742px;overflow: auto;
          .nodata{background: #fff url(~assets/img/operation/min_bg.jpg) 0 0 repeat-y;background-size: 100%;border-bottom: 0;margin: 0;padding: 0 30px;}
        }
      }
      .bt_footer{position: absolute;bottom:0; text-align: center;z-index: 10000; width: 100%; height: 98px;line-height: 98px;font-size: 32px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
  @keyframes moveUp {
    from {
      transform: translateY(100%)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(100%)
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
