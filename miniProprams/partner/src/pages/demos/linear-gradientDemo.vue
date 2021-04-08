<template>
  <div class="add_tit_wrap">
    <button type="success" @click="colorBol = !colorBol">测试111111111分享组件</button>
    <up-image :valueName="'Image01'" @setUpImage="setUpImage"></up-image>
    <div class="test_color" :class="{'br':colorBol}">
      
    </div>
    <div class="section">
      <div class="section__title">省市区选择器</div>
      <picker mode="region" @change="bindRegionChange($event)" v-bind:value="regions" :custom-item="customItem">
        <div class="picker">
          当前选择：{{regions[0]}}，{{regions[1]}}，{{regions[2]}}
        </div>
      </picker>
    </div>
  </div>
</template>
<script>
  import verifyUtils from '../../utils/utils.js';
  import upImage from '../../components/upImage';
  import qs from 'qs';
  export default{
    components:{
      upImage
    },
    data(){
      return{
        imageUrl:'',
        Image01:'',
        colorBol:false,
        regions:['广东省', '广州市', '海珠区'],
        customItem:'全部'
      }
    },
    methods :{
      testImg(){
        console.log(this.imageUrl)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      setUpImage(data){
        this[data.valueName] = data.url;
        console.log(this.Image01,'测试图片url')
      },
      bindRegionChange (e) {
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.regions = e.mp.detail.value;
      }
    },
    mounted(){
    }
  }
</script>
<style lang="scss">
.add_tit_wrap{height: 50px;
  .test_color{width:500px;height:500px;background: olive linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,.5));transition:all 1s;}
  div.br{background-color: purple;transition:all 1s;}
}
</style>