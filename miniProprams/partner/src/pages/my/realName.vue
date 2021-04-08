<template>
  <div class="real_name_page">
    <div class="line_wrap">
      <div class="line_item">
        <span class="lef">{{realNameObj.memberCreateType == 2 ? '机构名称' : '真实姓名'}}</span>
        <span class="rig">{{ realNameObj.starName }}</span>
      </div>
      <div class="line_item">
        <span class="lef">{{realNameObj.memberCreateType == 2 ? '统一社会信用代码' : '身份证号码'}}</span>
        <span class="rig">{{ realNameObj.memberCreateType == 2 ? realNameObj.idCardNo : realNameObj.starIdCardNo }}</span>
      </div>
      <!-- <div class="line_item">
        <span class="lef">银行号码</span>
        <span class="rig">{{ realNameObj.starBankCardNo }}</span>
      </div>
      <div class="line_item">
        <span class="lef">预留手机号</span>
        <span class="rig">{{ realNameObj.starPhone }}</span>
      </div> -->
    </div>
    
  </div>
</template>

<script>

  import filter from 'utils/filters';
  export default {
    components: {
    },
    data () {
      return {
        realNameObj: {},
        Filters: filter.filters,
      }
    },
    computed: {
      // starPhone () {
      //   let str = this.realNameObj.phone;
      //   return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      // }
    },
    methods: {
      // 查询实名认证信息
      async getRealNameInfoFn () {
        try {
          let resp = await this.API.my.getAuthInfo();
          this.realNameObj = resp;
          let info = resp;
          this.realNameObj.starPhone = info.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
          // this.realNameObj.starName = '*' + info.name.slice(1);
          let showLen = 1;
          if (info.name.length==2 || info.name.length==3) {
            showLen = info.name.length - 1
          }
          else if (info.name.length==4 || info.name.length==5) {
            showLen = info.name.length - 2
          }
          else if (info.name.length >=5 ) {
            showLen = info.name.length - 3
          }
          this.realNameObj.starName = this.Filters.strToStar(info.name, 0, showLen)
          this.realNameObj.starIdCardNo = this.Filters.strToStar(info.idCardNo, 4, 4);
        }
        catch (e) {}
      }
    },
    mounted () {
      this.getRealNameInfoFn();
    }
  }
</script>

<style lang='scss'>
  .real_name_page {
    width: 100%; height: 100%; background: #f8f8f8; padding-top: 20px;
    .line_wrap{margin-top: 0;}
  }
</style>
