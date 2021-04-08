<template>
    <div class="dt-detail">
        <div style="height:100%;background-color:#fff" v-show="datadetail&&!loading">
            <div class="head-fix">
                <div class="head">
                    <div class="head-left fl">
                        <img :src="datadetail.tm_image_format" alt="">
                    </div>
                    <div class="head-right fl">
                        <p>
                            <span class="head-name">商标名称</span>
                            <span class="head-concent">{{datadetail.tm_name}}</span>
                        </p>
                        <p>
                            <span class="head-name">当前状态</span>
                            <span class="color-r head-concent">{{datadetail.status_definition}}</span>
                        </p>
                        <p>
                            <span class="head-name">申请时间</span>
                            <span class="head-concent">{{datadetail.apply_date}}</span>
                        </p>
                        <p>
                            <span class="head-name">注册号</span>
                            <span class="head-concent">{{datadetail.registr_num}}</span>
                        </p>
                    </div>
                </div>

            </div>
            <div class="concent concent-fix">
                <!-- tab -->
                <div class="concent-tab">
                    <ul>
                        <li class="fl" :class="{'check-list':check==1}" @click="jump(0),check=1">基本信息</li>
                        <li class="fl" :class="{'check-list':check==2}" @click="jump(1),check=2">日期/期号</li>
                        <li class="fl" :class="{'check-list':check==3}" @click="jump(2),check=3">商品/服务</li>
                    </ul>
                </div>
            </div>
            <div class="concent concent-list" :scrollTop.prop='scrollTop'>
                <!-- 基本信息 -->
                <div class="basis cate-item">
                    <p>基本信息</p>
                    <div class="inform">
                        <p class="inform-left fl">类别</p>
                        <p class="inform-right fl">第{{datadetail.category_id}}类 {{cateIdData[datadetail.category_id-1] && cateIdData[datadetail.category_id-1].goodsname}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">申请人</p>
                        <p class="inform-right fl">{{datadetail.proposer}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">申请地址</p>
                        <p class="inform-right fl">{{datadetail.proposer_addr}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">商标流程</p>
                        <div class="inform-right fl">
                            <p v-for="list in tmannlist">{{list}}</p>
                        </div>

                    </div>
                </div>
                <!-- 日期 -->
                <div class="time cate-item">
                    <p>日期/期号</p>
                    <div class="inform">
                        <p class="inform-left fl">初审公告日期</p>
                        <p class="inform-right fl">{{datadetail.first_annc_date || "--"}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">初审公告期号</p>
                        <p class="inform-right fl">{{datadetail.first_annc_issue || "--"}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">注册公告日期</p>
                        <p class="inform-right fl">{{datadetail.reg_annc_date || "--"}}</p>
                    </div>
                    <div class="inform">
                        <p class="inform-left fl">注册公告期号</p>
                        <p class="inform-right fl">{{datadetail.reg_annc_issue || "--"}}</p>
                    </div>
                </div>
                <!-- 商品 -->
                <div class="service cate-item">
                    <p>商品/服务</p>
                    <div class="inform" v-for="item in datadetail.tm_service_list">
                        <p class="inform-left fl">{{item.goodsName}}</p>
                        <!-- <p class="inform-right fl">自来水设备及调节、安全附件</p>    -->
                    </div>
                </div>
            </div>
        </div>
        <div class="concent-null" v-show="!datadetail&&!loading">
            <img src="~assets/img/search/data-null.png" alt="">
            <p class="prompt">哎呀，未匹配到商标详情</p>
            <p class="apply-btn" @click="search">刷新</p>
            <p class="concent-bot">您还可以咨询我们的服务专员：4000-315-426</p>
            <p class="concent-bot-txt">快速的获得专业服务</p>
        </div>
        <div v-transfer-dom>
            <loading v-model="loading" text="请稍候"></loading>
        </div>
        <div class="scoller-bot" v-show="botbounced">
            <p>已经到底了</p>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import qs from 'qs'
    import $ from "jquery";
    import Data from 'src/utils/data.js' //右侧筛选商品类别
    //import dingtalk from 'weex-dingtalk';
    import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
  const wxUrl = CONFIG.wxUrl;

    export default {
        directives: {
          TransferDom
        },
        components: {
            Alert,
            CheckIcon,
            Loading
        },
        data(){
            return{
                datadetail:'',
                check:1,
                dnfoid:'',
                regcode:'',
                tmannlist:'',
                loading:false,
                scrollTop:0,
                cateIdData: Data.cateIdData,
                botbounced:false//底部弹框
            }
        },
        mounted(){
            this.dnfoid = this.$route.query.id;
            this.regcode = this.$route.query.code;
            this.search();
            this.$nextTick(function () {
                window.addEventListener('scroll', this.onScroll);
            })
            //this.setTitle();
            /*var self = this;
            this.setRight({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '刷新',//控制显示文本，空字符串表示显示默认文本
              }, function(){
                self.search();
              });*/
        },
        methods:{
            onScroll () {
                let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        　　　 // 126,173分别为第二个和第三个锚点对应的距离
                if (scrolled >= 450) {
                    this.check = 3
                } else if (scrolled < 450 && scrolled >= 173) {
                    this.check = 2
                } else {
                    this.check = 1
                }
                // 当滚动到底部时候，弹框
                var bottomscoller = $('.concent-list').height() - 405;
                var self = this;
                // 控制底部浮层弹框
                if(bottomscoller<=scrolled){
                    self.botbounced = true;
                    setTimeout(function(){
                        self.botbounced = false;
                    },2000);
                }

            },
            jump(index){
                const cateItem = document.querySelectorAll('.cate-item');
                let total = cateItem[index].offsetTop;
                let distance = document.documentElement.scrollTop || document.body.scrollTop; // 获取到顶部的距离
                let step = total / 50;
                // this.isActive = index; // 菜单列表显示当前样式
                const _this = this;
                if (total > distance) {
                    smoothDown();
                } else {
                    let newTotal = distance - total;
                    step = newTotal / 50;
                    smoothUp()
                }
                function smoothDown () {
                  if (distance < total) {
                    distance += step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                  } else {
                    _this.scrollTop = total
                  }
                }
                function smoothUp () {
                  if (distance > total) {
                    distance -= step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothUp, 10)
                  } else {
                    _this.scrollTop = total
                  }
                }
             },
            search(){
                var self = this;
                self.loading = true;
                this.$http.get(wxUrl+ '/bzgapi/detaile?info_id='+this.dnfoid+'&reg_code='+this.regcode)
                .then((response) => {
                    self.loading = false;
                    if(response.docs){
                        self.datadetail = response.docs;
                        if(self.datadetail){
                            self.tmannlist = self.datadetail.tm_ann_list.split(',');
                        }
                    }

                })
                .catch((error) => {
                    self.loading = false;
                });
            }
        }
    }
</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
    .dt-detail{width:px(750);background-color:#f8f8f8;height:100vh;position: relative;
        // 底部弹框
        .scoller-bot{background-color:rgba(0,0,0,0.1);width:px(750);height:px(50);position: fixed;bottom:0;
            p{color:#fff;text-align:center;font-size:px(30);}
        }
        .head-fix{position: fixed;padding-top:px(20);background-color:#f8f8f8;top:0;height: px(314);}
        .head{padding:px(40) px(30);background-color:#fff;overflow:hidden;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;box-sizing:border-box;width:px(750);
            .head-left{border:px(2) solid #e5e5e5;width:px(210);height:px(210);border-radius:px(6);box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:px(13);
                img{width:px(180);height:px(180);}
            }
            .head-right{margin-left:px(30);
                p{height:px(42);line-height:px(42);margin-bottom:px(10);text-align:left;
                    span{font-size:px(30);vertical-align: middle;}
                    .head-name{color:#999;width:px(130);display:inline-block;margin-right:px(30);}
                    span.color-r{color:#F64744}
                    .head-concent{color:#666;overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;white-space:nowrap;width:px(260);display:inline-block;}
                }
            }
        }
        .concent-fix{position: fixed;top:px(314);background-color:#f8f8f8;padding-top:px(20);}
        .concent-list{margin-top:px(405);}
        .concent{background-color:#f8f8f8;
            .concent-tab{border-top:1px solid #e5e5e5;background-color:#fff;
                ul{overflow:hidden;
                    .check-list{color:#479CFF;border-bottom:px(4) solid#479CFF;}
                    li{width:px(250);height:px(92);border-bottom:1px solid #e5e5e5;text-align:center;line-height:px(92);color:#666;font-size:px(30);}
                }
            }
            .basis,.time,.service{background-color:#fff;
                padding:px(40) px(30);border-bottom:1px solid #f5f5f5;
                >p{font-size:px(30);color:#333;margin-bottom:px(30);}
            }
            // 基础信息
            .basis{
                .inform-left{width:px(130);}
                .inform-right{width:px(530);}
            }
            // 日期
            .time{
                .inform-left{width:px(200);}
                .inform-right{width:px(380);}
            }
            .service{.inform .inform-left{color:#666;}}
            .inform{overflow:hidden;text-align:left;margin-bottom:px(15);
                // tab信息部分公共样式
                .inform-left{font-size:px(28);color:#999;line-height:px(40);}
                .inform-right{font-size:px(28);color:#666;margin-left:px(30);line-height:px(40);
                    p{line-height:px(40);}
                    .inform-btn{font-size:px(26);padding:0 px(15);background-color:#479cff;color:#fff;border-radius:px(6);line-height:px(40);height:px(40);margin-right:px(10);margin-bottom:px(10);}
                }
            }
        }
        .concent-null{padding-top:px(220);text-align:center;
            img{width:px(330);height:px(268);}
            p{font-size:px(30);}
            .prompt{color:#999;margin-top: px(20);margin-bottom: px(30);}
            .apply-btn{color:#479CFF;line-height: px(64);height:px(64);width:px(200);margin:0 auto;border-radius:px(6);border:1px solid #479CFF;margin-bottom:px(315);}
            .concent-bot{width:px(690);margin:0 auto;font-size:px(24);line-height:px(33);padding:px(45) px(0) 0;color:#999;}
            .concent-bot-txt{width:px(690);margin:0 auto;font-size:px(24);line-height:px(33);color:#999;padding-bottom:px(45);}
        }
    }
</style>
