<template>
  <div class="materials_info">
    <div class="image_list">
      <p class="tit mb20">主体文件</p>
      <!-- 大陆个人 -->
      <div class="lists row-around">
        <div class="list_info" v-if="type == 2">
          <up-image :valueName="'Image01'" @setUpImage="setUpImage"></up-image>
          <p>申请人身份证正反面复印件</p>
          <p class="attention">（需签名）</p>
        </div>
        <div class="list_info" v-if="type == 2">
          <up-image :valueName="'Image02'" @setUpImage="setUpImage"></up-image>
          <p>申请人身份证正反面复印件</p>
          <p class="attention">（需签名）</p>
        </div>
        <!-- 大陆企业 -->
        <div class="list_info" v-if="type == 1">
          <up-image :valueName="'Image01'" @setUpImage="setUpImage"></up-image>
          <p>营业执照副本复印件</p>
          <p class="attention">（需盖公章）</p>
        </div>
        <!-- 港台境外企业 -->
        <div class="list_info" v-if="type == 3">
          <up-image :valueName="'Image03'" @setUpImage="setUpImage"></up-image>
          <p>企业登记证件</p>
          <p class="attention">（需加盖企业公章）</p>
        </div>
        <div class="list_info" v-if="type == 3">
          <up-image :valueName="'Image04'" @setUpImage="setUpImage"></up-image>
          <p>企业登记证件译本1</p>
          <p class="attention">（需加盖企业公章）</p>
        </div>
        <div class="list_info" v-if="type == 3">
          <up-image :valueName="'Image05'" @setUpImage="setUpImage"></up-image>
          <p>企业登记证件译本2</p>
          <p class="attention">（需加盖企业公章）</p>
        </div>
      </div>
      <div class="lists row">
        <div class="list_info" v-if="type == 3">
          <up-image :valueName="'Image06'" @setUpImage="setUpImage"></up-image>
          <p>企业登记证件译本3</p>
          <p class="attention">（需加盖企业公章）</p>
        </div>
      </div>
    </div>

    <div class="image_list">
      <p class="tit mb20">委托文件</p>
      <div class="lists row-around">
        <div class="list_info">
          <up-image :valueName="'Image07'" @setUpImage="setUpImage"></up-image>
          <p>委托书</p>
          <p class="attention">（需盖公章）</p>
        </div>
      </div>
    </div>
    <button type="warn" @click="type=1">个人</button>
    <button type="warn" @click="type=2">企业</button>
    <button type="warn" @click="type=3">境外</button>
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
        type:3,//大陆个人1  企业2  港台境外企业3
        imageUrl:'',
        Image01:'',
        Image02:'',
        Image04:'',
        Image05:'',
        Image06:'',
        Image07:''
      }
    },
    methods :{
      testImg(){
        console.log(this.imageUrl)
      },
      setUpImage(data){
        this[data.valueName] = data.url;
        console.log(this.Image01,'测试图片url')
      }
      
    },
    mounted(){
    }
  }
</script>

<style lang="scss">
  .materials_info{
    .image_list{border-bottom:1px solid #eee;padding-bottom: 20px;
      .tit{font-size:30px;border-bottom:1px solid #eee;padding:5px 20px;}
      .lists{
        .list_info{text-align:center;width:250px;
          p{font-size:25px;}
          .attention{color:#e96900;font-size:25px;}
        }
      }
    }

  }
</style>