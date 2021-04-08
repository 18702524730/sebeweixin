<template>
	<div class="pdfPreview">
    <div v-for="(item, index) in pdfImgsData">
      <img :src="item" width="100%">
      <div class="divssion" v-if="(index+1) != pdfImgsData.length"></div>
    </div>
    <div v-transfer-dom>
      <loading v-model="loading2" text="请稍候"></loading>
    </div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
  const wxUrl = CONFIG.wxUrl;
  const title = '商标查询报告';
  const imgUrl = 'http://sebe360test.oss-cn-beijing.aliyuncs.com/A37318A3AD678B3715C88BDC0F70DDFA.jpg';
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
          loading2: false,
	    		pdfImgsData:[],
	    	}
	    },
	    mounted(){
	    	this.pdfUrl = this.$route.query.pdfUrl;
	    	this.getPreviewImg(this.pdfUrl, 'pdfImgsData');
        var link = wxUrl + '/wechat/shareUrl?shareContent=' + encodeURIComponent('pdfPreview?pdfUrl=' + this.pdfUrl);
        this.wxShare(title,link,imgUrl, '商标查询报告', location.href.split('#')[0]); //微信分享  在mian.js里Vue的原型里已定义
	    	/*this.$nextTick(function () {
		    	window.addEventListener('scroll', this.onScroll);
		    })*/
	    },
	    methods:{
	    	getPreviewImg(pdf_url, dataName){
          this.loading2 = true;
          this.$http.get(wxUrl + '/bzgapi/preview.do?pdfUrl='+pdf_url)
          .then((response) => {
            this.loading2 = false;
            this[dataName] = response.urls || [];
          })
          .catch((error) => {
            this.loading2 = false;
            console.log(error)
          });
        },
	    }
	}
</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
	.pdfPreview{width:px(750);background-color:#f8f8f8;height:100vh;position: relative;
    img{display: block;}
    .divssion{background-color: #f8f8f8;height: 5px;}
	}
</style>
