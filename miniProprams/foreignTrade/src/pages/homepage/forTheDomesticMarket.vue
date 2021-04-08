<template>
<div class="otherproblem">
  <div class="kefu"><button open-type="contact"></button></div>
  <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
  <div v-if="k==1">
    <div class="banner1 banner"></div>
    <div class="market">
      <div class="market_h1">出口转内销服务——品牌注册</div>
      <div class="market_txt">跨境电商作为外贸新业态，炙手可热。与传统商业渠道的知识产权保护相比，其发展规模与保护模式呈现出新的特征与挑战。目前，跨境电商之亚马逊的零售商品线涵盖了图书、音像制品、软件、消费电子产品、家用电器、厨具、食品、玩具、母婴用品、化妆品、日化用品、运动用具、服装鞋帽、首饰等类目。对中国卖家开发的亚马逊站点：包括亚马逊美国、加拿大、墨西哥、德国、英国、法国、意大利、西班牙、澳洲、日本、印度、中东、新加坡、越南站与中国在内的15大站点已向中国卖家全面开放。遍布全球的140多个运营中心帮助中国卖家可将产品销往世界185多个国家和地区。</div>
      <div class="fenge1 fenge">
        <div>关于品牌商入驻</div>
      </div>
      <div class="market_txt">
        亚马逊全球开店品牌+是一项扶持中国互联网新兴品牌、传统知名品牌，以及有意愿打造自有国际品牌的制造商和贸易商，通过跨境电商扬帆出海并做大做强自有国际品牌的专属项目。该项目通过本地化的专属团队，为企业提供定制化的品牌咨询和服务；通过严苛的机制和政策，提供便捷的品牌注册和全方位的品牌保护；通过一系列创新的互联网产品和工具，满足品牌在不同发展阶段的推广和发展需求。
      </div>
      <div class="fenge2 fenge">
        <div>面向卖家</div>
      </div>
      <div class="market_txt">有意愿拓展海外市场的中国知名/新兴品牌，有意愿转型升级、打造自有品牌的中国企业（包括制造商、贸易商）。</div>
      <div class="fenge2 fenge">
        <div>资质条件</div>
      </div>
      <div class="market_txt">以客户为中心、以产品为基础、以品牌为导向，已经拥有境内或境外注册商标（R标）或正在申请/有意愿申请境外注册商标的卖家。跨境电商平台优势：3亿活跃付费账户包括亚马逊Prime会员，覆盖全球四大洲，18个站，遍布全球的超过175个电商运营中心，商品可配送至全球185个国家和地区。</div>
      <div class="mar_1">
        <div class="mar_tit"></div>
      </div>
      <div class="shangbiao">商标系列</div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>国内商标注册</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>国内商标变更申请</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>国内商标续展申请</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>马德里国际商标注册</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>单一国商标注册</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="k==2">
    <div class="banner2 banner"></div>
    <div class="market">
      <div class="market_h1">境内电商维权——平台维权</div>
      <div class="market_txt">电商平台有义务监督卖家在平台上售卖商品的真假，如果买家在平台购买到假货，平台也需要承担连带责任的。而任何电商平台都不会愿意为别人的“假货”买单。由此，各大电商平台陆续开始出台知识产权新规，帮助权利人维权。</div>
      <div class="fenge1 fenge">
        <div>常规应对投诉需要四步走</div>
      </div>
      <div class="market_txt">
        <text>
          第一步：权利人登录电商平台知识产权保护系统<br/>
          第二步：上传身份证明材料与权利证明材料<br/>
          第三步：选择要投诉的涉嫌侵权的商品/店铺所在的平台，提交相应的侵权商品和信息所在的链接，并填写对方侵权的理由<br/>
          第四步：平台将投诉通知被投诉方。在规定时间内，被投诉方是可以发起反通知的，即申诉自己未侵权。\n
          投诉一旦成立，平台就会删除侵权链接，并按照前面所提到的知识产权规则进行处罚。但是只有当被投诉方没有在规定时间内发起反通知，或者反通知不通过的时候，投诉才能成立。所以在填写对方侵权理由的时候就要谨慎了，如果自己所主张的知识产权与被投诉产品信息不匹配，你的投诉审核是不会通过的或者被投诉人很容易申诉成功。简单点说，侵权理由没填对，投诉是不会成功的！再加上部分卖家侵权应诉很有一套，使得有些权利人维权的时候反倒有点找不到头绪了。这个时候，第二招就变得非常重要了。
        </text>
      </div>
      <div class="fenge1 fenge">
        <div>第二招：咨询知产服务公司，高效维权</div>
      </div>
      <div class="market_txt">
        <text>
          如果你遇到了各种维权难题，损失惨重并为此伤透了脑筋，感到维权艰难，这时候千万不要放弃，而是应该聪明的咨询专业的、了解海外市场的知产服务公司，为你提供有针对性的法律意见咨询，帮助你进行线上维权、甚至是在海外进行线下维权。<br/>
          很多商家都会觉得找知产服务公司代理维权成本高昂，但是，如果维权策略得当的话，不仅能打击抄袭假冒产品，还可以通过索赔拿回损失。\n\n
          结尾：尊重知识产权、保护知识产权，已经成为电商在内的任何一个行业所需恪守的原则。在各国政府从严打假的政策推动下，电商平台对于知识产权侵权现象越来越零容忍。但是要想迎来一个更加规范的电商行业，不仅需要政府和平台的通力合作，还需要每个自主品牌的商家学会打好知识产权这把出海“保护伞”，为自己的品牌保驾护航。
        </text>
      </div>
      <div class="mar_1">
        <div class="mar_tit"></div>
      </div>
      <div class="shangbiao">国内电商系列</div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>原创存证</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>内容侵权维权</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>电商侵权维权</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>知识产权侵权鉴定</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>侵权监测</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="k==3">
    <div class="banner3 banner"></div>
    <div class="market">
      <div class="market_h1">跨境电商服务——电商产品入驻主要要点</div>
      <div class="market_txt">疫情带来的一个最大的改变，是全球消费者消费行为从线下转向线上，伴随这一变化是中国卖家的不断成熟以及在多站点开布局。而疫情对传统外贸制造业带来的冲击，也进一步加速这一行业对跨境电商的迁徙，而这其中，有多个环节需要格外注意。</div>
      <div class="fenge1 fenge">
        <div>在跨境电商平台中，卖家又需要注意哪些知识产权方面的入驻要点呢？</div>
      </div>
      <div class="market_txt">
        <text>
          \n
          跨境电商平台规则是保护所有卖家的知识产权的，限制卖家销售任何未经授权的产品，因此正规的跨境电商平台会惩罚任何侵犯了第三方知识产权的卖家。例如，有一些卖家正在销售带有双接口的iPhone\tUSB线。如果销量大，其他卖家可能会出售同样的产品，如果他们没有得到任何授权，销售这些双接口USB线的行为就会违规。平台将致力于保护每一个卖家的知识产权，一旦他们发现了这些未经授权的卖家，就会惩罚他们。处罚包括产品移除和商店排名下降。\n
          而且大平台可以通过关键词扫描，轻松地收集产品的名称，一旦发现侵权行为，他们就会给予惩罚。例如，一些卖家可能会在平台名称上添加世界知名品牌，以便在搜索引擎中获得更高的店面排名。然而，这绝对违反了保护规定，因为这些卖家大多没有得到这些品牌的授权。因此，需要注意的是，卖家不应该上传未经授权的品牌的任何信息，比如产品标题或产品图片。 \n
          切记，不能用品牌名称来命名店铺。正如在前面的要点中所描述的那样，任何未经授权的品牌名称都不允许与商店名称或产品名称放在一起。此外，商店名称的设置需与产品名称不同。一旦商店名称发生改变，卖家要在规定月份以后才可以再次修改店铺名称。这意味着，卖方不被允许在规定月份内销售带有非法商店名称的产品。 
        </text>
      </div>
      <div class="fenge1 fenge">
        <div>另外，在亚马逊平台上申请注册品牌备案要提供以下信息内容：</div>
      </div>
      <div class="market_txt">
        <text>
          \n
          1.合理商标申请注册的品牌名字，该商标务必为文字商标，而不可以是风格化的、示意的或设计方案的商标\n
          2.商标许可证号或序列号，针对美国商标，该商标的种类务必为“规范标识符”商标或排版设计式的文本、字母或是数字\n
          3.商标图片
          4.能显示信息商标样图的商品和包装，如果商标在商品上不显示，则务必在包装上显示信息\n
          5.包括该品牌的商品目录明细\n
          6.生产制造和市场销售该品牌商品的国家明细\n
        </text>
        
      </div>
      <div class="market_bot">拾贝可提供专业的跨境电商系列服务：维权系列、电商平台代运营</div>
      <div class="mar_1">
        <div class="mar_tit"></div>
      </div>
      <div class="shangbiao">跨境电商系列</div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>维权系列</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
      <div class="mar_kuang">
        <div class="mar_k_bd">
          <div>电商平台代运营</div>
          <div>立即咨询<button class="but_zx" open-type="contact"></button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="k==4">
    <div class="banner4 banner"></div>
    <div class="market">
      <div class="market_h1">贸易纠纷处理——337</div>
      <div class="market_txt">众所周知，美国是世界上最早施行专利制度和严格保护知识产权的国家，近年来中国企业在美连续遭遇各领域专利巨头以及NPE（非专利实施主体）的专利诉讼或“337调查”，并对企业的经营产生了不小的影响。</div>
      <div class="fenge1 fenge">
        <div>何为“337调查”</div>
      </div>
      <div class="market_txt">
          美国国际贸易委员会（ITC）是一个独立的、无党派的准司法机构。[1]ITC根据1930年《关税法》第337节对不公平进口行为的调查，国内通常简称为“美国337调查”。如果ITC认定某项进口产品侵犯了美国国内知识产权，或虽未侵犯知识产权但其效果却破坏或实质上损害美国某一产业，或阻碍该产业的建立，或对美国商业或贸易造成限制或垄断，则ITC有权采取制裁措施。
      </div>
      <div class="fenge1 fenge">
        <div>“337”条款特点</div>
      </div>
      <div class="market_txt">
        <text>
          337条款的特点有二，一是短平快的调查程序（限定在12或15个月内结束调查），如果案件较复杂则可能需要延至20个月以上，这相比其它诉讼而言无疑耗时较短。二是非常严厉的补救措施。ITC启动“337调查”后，若最终认定被告方的进口产品构成侵权，可发出普遍排除令、有限排除令和禁止令，尤以普遍排除令最为严厉、影响最广，被告国内同行业的同类产品也可能永远被禁止进入美国市场。\n
          337原告申请ITC调查到ITC正式立案的30天内，被告该做什么准备？
          一般来说，从337原告申请ITC调查到ITC正式立案只有30天。这30天对于被告来说特别宝贵，因为美国337调查的速度，就其复杂度而言，可以称为“火箭速度”。一旦ITC启动调查（不启动的情形很罕见），被告一般只有20天答辩期，并且至关重要的证据披露随即开始，被告一般只有令人窒息的10天反应期。而且任何一般的在民事诉讼中可以拖延时间的策略，在ITC均不奏效而且会招致不利的印象。
          被告应尽快聘请律师，确定应诉策略，避免因中美法律制度的巨大差异而造成的无法挽回的错误，并为即将开始的调查做好准备，包括答辩和证据披露等，同时向全公司相关人员发出诉讼冻结通知（litigation hold）通知，通知全公司保护与涉案专利和产品有关的证据，以满足美国证据披露（discovery）的要求，否则可能会就灭失证据承担举证不能的不利后果（adverse inference），甚至会被认定毁灭证据（spoli ation）而被决定缺席。\n 
          “337调查”之于中国
          数据表明，亚洲以44%的涉案占比领先于其它各大洲，在国家或地区方面，中国大陆的涉案量高居榜首，可见中国乃是最受“337调查”青睐的国家。\n
          涉华调查的又究竟涉及哪些诉因呢？\n
          知识产权（专利/商标/著作权/商业秘密）相关的侵权行为成为“337调查”的绝对诱因，占总量的96%。其中，以专利权作为诉因的占比高达67%，可见“337调查”之争实质上很大程度是知识产权之争，尤其是专利权之争。
          值得关注的是，被诉方大多是中小型新兴企业。普遍排除令的颁布，对行业，尤其对我国涉及同类产品的中小企业而言无疑是一记重击。这为即将或是筹谋“出海”美国掘金的中国科技企业的前行之路提了个醒。
        </text>
      </div>
    </div>
  </div>
  <div v-if="k==5">
    <div class="banner5 banner"></div>
    <div class="market">
      <div class="market_h1">展会知识服务——海外参展的知识产权侵权后果及应对手段</div>
      <div class="market_txt">近年来，国际展会逐渐成为中国企业走向世界树立形象、推广品牌、展示实力的窗口。但是，由于缺乏对参展国知识产权规则的了解，13%的中国企业在境外参展过程中曾遇到过知识产权纠纷。这些事件的发生，严重损害了企业的国际形象，为企业产品出口带来了极为不利的影响。</div>
      <div class="fenge1 fenge">
        <div>企业海外参展常见的知识产权风险集中在专利权（发明、实用新型和外观设计）风险、商标权风险和版权风险三大方面。</div>
      </div>
      <div class="fenge2 fenge" style="margin-top:68px">
        <div>专利权风险</div>
      </div>
      <div class="market_txt">
        <text>
          参展产品一般融合了最先进的研发成果，因其外型、结构、原理被抄袭而引发的专利侵权纠纷是展会中发生比例最高的。外观设计专利、普通的实用新型专利，内行人只要看一眼，立刻就能模仿。
        </text>
      </div>
      <div class="fenge2 fenge">
        <div>商标权风险</div>
      </div>
      <div class="market_txt">
        <text>
          商标具有地域性，在中国注册的商标，只在中国受保护，在参展地没有注册，则不受保护。如果某企业的商标在中国注册，但在参展地却被其他人抢注成功，那么企业未经授权在参展地使用该商标就属于侵权行为。如果是被他人许可使用的商标，还需要注意商标许可是有期限性的，超期仍使用有可能被诉商标侵权。此外，如果在商品、包装以及相关广告宣传品商出现了在中国属于通用名称而在其他国家受法律保护的商标时，企业也可能在不知情的情况下被视为商标侵权。
        </text>
      </div>
      <div class="fenge2 fenge">
        <div>版权风险</div>
      </div>
      <div class="market_txt">
        <text>
          参展企业散发的参展材料中如果使用了他人作品，或者搭建的展台使用了他人设计方案，都可能导致侵犯他人版权。会展中，因使用背景音乐、他人摄影作品或美术作品等而被追究责任的纠纷也时有发生，企业还应注意展会现场使用的电脑中所承载的软件是否是正版。
        </text>
      </div>
      <div class="fenge1 fenge">
        <div>海外参展侵犯知识产权的后果</div>
      </div>
      <div class="fenge2 fenge">
        <div>直接后果</div>
      </div>
      <div class="market_txt">
        <text>
          参展企业一旦被举报侵犯他人知识产权，其展品将有可能被扣押、查封、颁发临时禁令或追诉等，企业将无法政策进行产品展示、商贸洽谈等活动。
        </text>
      </div>
      <div class="fenge2 fenge">
        <div>间接后果</div>
      </div>
      <div class="market_txt">
        <text>
          企业在展会中遭遇的知识产权纠纷不仅仅使企业参展受挫，而且可能极大地损害企业的国际形象，影响其市场营销，展后还可能使其陷入诉讼纠纷的泥潭，使得企业损失惨重。
        </text>
      </div>
      <div class="fenge1 fenge">
        <div>海外参展遇到侵犯他人知识产权如何应对？</div>
      </div>
      <div class="market_txt">
        <text>
          参展企业收到警告信后应核实警告信的发出人是否为权利人或者其代理人，并判断自身产品是否构成侵权（如侵权事实是否清楚和法律依据是否充分等）。如果认为内容属实且标的值合理，可以与该企业进行沟通协调，尽量选择和解，以避免进入冗长的诉讼程序或遭受临时禁令等强制措施。
          \n
          如果认为不构成侵权，可拒绝签署警告信，同时可以提出反警告，并向法官或海关书面申请保护。
          \n\n
          海外参展遇他人侵犯自身知识产权如何应对？
          参展中，当发现有参展产品涉嫌侵犯自身知识产权时，应立即保留好证据，并确认自身知识产权的有效性和稳定性。根据收集的证据材料，自主或委托专业咨询机构、律师对构成侵权的可能性进行分析评估。视侵权情况，参展企业应及时整理相关材料。对涉嫌侵权的展品可以通过拍照、索取产品宣传册或购买等方式来固定证据，必要时还可通过公证方式保全证据。最后，可寻找渠道并采取措施。参展企业可通过展会举办方设立的知识产权投诉部门、展会举办地的知识产权行政和司法部门采取维权措施。
        </text>
      </div>
    </div>
  </div>
</div>
</template>

<script>

  export default{
    data(){
      return{
        k:''
      }
    },
    components:{
      
    },
    methods: {
      phoneCall(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      },
    },
    onShow(){
      this.k = wx.getStorageSync('k');
    },
    mounted(){
    }

  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.otherproblem{
  position: relative;
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 30px;
  .market{
    padding: 0 23px;
  }
  .banner{
    width: 100%;
    height: 472px;
  }
  .banner1{
    background: url('~assets/img/homepage/lia1.png') no-repeat;
    background-size: 100%;;
  }
  .banner2{
    background: url('~assets/img/homepage/lib1.png') no-repeat;
    background-size: 100%;;
  }
  .banner3{
    background: url('~assets/img/homepage/lic1.png') no-repeat;
    background-size: 100%;;
  }
  .banner4{
    background: url('~assets/img/homepage/lid1.png') no-repeat;
    background-size: 100%;;
  }
  .banner5{
    background: url('~assets/img/homepage/lie1.png') no-repeat;
    background-size: 100%;;
  }
  .shangbiao{
    height:103px;
    background:rgba(61,136,205,1);
    border-radius:8px 8px 0px 0px;
    font-size:42px;
    color:rgba(255,255,255,1);
    line-height:103px;
    text-align: center;
  }
  .mar_kuang{
    height:184px;
    background:rgba(255,255,255,1);
    box-shadow:0px 9px 14px -6px rgba(240,178,178,0.5);
    padding: 57px 0;
    margin: 4px 0 50px;
    .mar_k_bd{
      display: flex;
      align-items: center;
      border-left: 6px solid #FB5C5C;
      justify-content: space-between;
      padding: 0 20px 0 30px;
      >div:first-child{
        font-size:34px;
        color:rgba(51,51,51,1);
        line-height:70px;
      }
      >div:last-child{
        width:184px;
        height:70px;
        background:linear-gradient(270deg,rgba(239,119,119,1) 0%,rgba(253,88,88,1) 100%);
        border-radius:35px;
        font-size:28px;
        color:rgba(255,255,255,1);
        line-height:70px;
        text-align: center;
        position: relative;
      }
      .but_zx{
        width: 100%;
        height: 100%;
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }

  }
  .mar_1{
    margin-top: 65px;
    .mar_tit{
      background: url('~assets/img/homepage/mar_1.png') no-repeat;
      background-size: contain;
      width: 100%;
      height: 270px;
      margin: 0 auto;
    }
  }
  .market_h1{
    font-size:44px;
    font-weight:600;
    color:rgba(51,51,51,1);
    margin: 54px 0;
    line-height:62px;
  }
  .market_txt{
    font-size:34px;
    color:rgba(51,51,51,1);
    line-height:64px;
    text-align: justify;
    text{
      font-size:34px;
      color:rgba(51,51,51,1);
      line-height:64px;
      text-align: justify;
    }
  }
  .market_bot{
    font-size: 35px;
    font-weight: bold;
    margin-top: 64px;
  }
  .fenge{
    position: relative;
    height: 280px;
    width: 100%;
  }
  .fenge2{
    background: url('~assets/img/homepage/lia3.png') no-repeat;
    background-size: 80%;
    background-position-y: 40%;
    background-position-x: center;
  }
  .fenge1{
    background: url('~assets/img/homepage/lia2.png') no-repeat;
    background-size: contain;
    background-position-y: 40%;
  }
  .fenge1>div,.fenge2>div{
    font-size:34px;
    font-weight:500;
    color:rgba(61,136,205,1);
    position: absolute;
    top: 180px;
    width: 100%;
    text-align: center;
  }
}
</style>
