<template>
  <div class="evidenceWrap">
    <div class="header row-between">
      <p>剩余存证包数量：{{czNum}}</p>
      <p class="to_shop"><span @click="buyCz">购买存证包</span><img src="~assets/img/deposit/to_right.png" alt=""></p>
    </div>
    <div class="input_lists row-start">
      <p class="des">申请人</p>
      <div>{{authInfo.apply_name}}</div>
    </div>

    <div class="title">
      <p class="ml30">作品信息</p>
    </div>
    <div class="contentWrap">

      <div class="infoWrap">
        <div class="des">作品名称</div>
        <input type="text" class="input" :maxlength="30" v-model="productionName" placeholder="请输入作品名称" >
      </div>
      <!-- <div class="infoWrap">
        <div class="des">作品种类</div>
        <div class="labelWrap">
          <div :class="['labelItem', activeProduct === index ? 'activeLabel' : '']"
          v-for="(item ,index) in productTypes"
          @click="handleClickProdType(index)"
          :key="index">{{item.name}}</div>
        </div>
      </div> -->
      <div class="infoWrap">
        <div class="des">作品文件</div>
        <div class="uploadWrap">
          <!-- <div class="upload" @click="upload" v-if="fileInfo.url"> -->
          <div class="upload" @click="upload" v-if="imageState">
            <!-- <p>上传成功</p> -->
            <image :src="imageUrl" mode="aspectFit" />
          </div>
          <div class="upload" v-else @click="upload">+</div>
          <div class="uploadDes">
            <div class="topDes">• 上传文件大小不得超过50m</div>
            <div class="botDes">
              • 文件格式必须符合条件，支持上传格式：png/jpg/jpeg/bmp格式
            </div>
            <progress v-if="percent != 100 && percent != 0" stroke-width="6" color="#22aaf9" font-size="12" border-radius="5" :percent="percent" show-info />
          </div>
        </div>
        
      </div>
      <div class="infoWrap">
        <div class="des">创作时间</div>
        <picker mode="date" class="datePicker" :value="date" @change="bindDateChange">
          <view class="picker" :class="[date === '请选择创作完成时间' ? 'placeholderClass' : '']">
            {{date}}
          </view>
        </picker>
      </div>
      <div class="infoWrap" :style="{borderBottom: activePub == 1 ? '1px solid #eee' : 'none'}">
        <div class="des">发表状态</div>
        <div class="productionWrap">
          <div :class="['item', activePub === index ? 'activeLabel' : '']"
          v-for="(item ,index) in publishStatus"
          @click="handleClickPubStatus(index)"
          :key="index">{{item.name}}</div>
          <!-- <div class="item">已上线</div> -->
        </div>
      </div>
      <div class="infoWrap" v-if="activePub == 1">
        <div class="des">首次发表地址</div>
        <input type="text" class="input" :maxlength="30" v-model="address" placeholder="请输入首次发表地址" >
      </div>
      <div class="infoWrap" v-if="activePub == 1"  style="border-bottom: none;">
        <div class="des">首次发表时间</div>
        <picker mode="date" class="datePicker" :value="date" @change="bindDate2Change">
          <view class="picker" :class="[date2 === '请选择首次发表时间' ? 'placeholderClass' : '']">
            {{date2}}
          </view>
        </picker>
      </div>
    </div>
    <div class="checkWrap" @click="checkState = !checkState">
      <icon class="info" type="success" size="26" :color="checkState ? '#22aaf9' : '#eee'"/>
      <p>
        <i>声明：本人上传的资料为真实信息，作品著作权为本人所有，作品不存在权利纠纷，并承担由此产生的一切法律责任</i><span @click.stop="clickNotice">《权利具结声明》</span><i>且同意</i><span @click="regAgreement = true">《拾贝网用户存证服务协议》</span>
      </p>
    </div>
    <div class="footer row-between">
      <div class="row-start">
        <div class="name">
          <p class="name_title">扣除存证包</p>
          <p class="tips">（保存时间三年）</p>
        </div>
        <p class="number ml30">1<span>个</span></p>
      </div>
      <p class="btn" @click="handleSubmit">立即下单</p>
    </div>
    <div class="body-mask" v-if="regAgreement" @click="regAgreement = false">
      <div class="dialog-box">
        <h1>拾贝网用户存证服务协议</h1>
        <div class="content">
          <p class="text">版本生效日期：2017年5月20日</p>
          <p class="text">
          本协议为用户[成年且具有完全民事行为能力的自然人、法人（非独立法人）或其他组织]与杭州拾贝知识产权服务有限公司（以下简称“平台运维方”）之间关于“拾贝网”平台（以下简称“本平台”）提供公证存证类服务的协议，具有法律效力。</p>
          <p class="text">一、协议的内容及签署</p>
          <p class="text">1、本协议内容包括正文及其所涵盖的补充协议、附件、规则，以及所有有关在本平台已经发布的或将来可能发布的各类规范、规则、服务条款等。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，平台运维方通过本平台提供的各项服务均受本协议约束。</p>
          <p class="text">2、用户在使用本平台所提供的各项服务前，务请事先认真阅读本协议各条款，协议中包括了免除或者限制服务提供方责任的条款及对用户权利限制的条款。如用户对协议条款有不理解或疑问之处，务请向平台运维方垂询，由平台运维方向用户作详细的说明和解释。如选择注册成为本平台用户或使用本平台及相关公证存证机构的服务（包括通过第三方平台而使用本平台的服务），则将视为用户完全阅读并理解、且自愿接受本协议内容，本协议即对用户产生法律约束力。届时用户不应以未阅读本协议的内容或者未获得平台运维方对用户问询的解答等理由，而主张本协议无效，或要求撤销/变更本协议内容。</p>
          <p class="text">3、平台运维方有权单方根据实际需要制订、修改本协议及/或各类规则，并以网站公示或平台运维方认为适当且必要的方式进行公告，不再单独通知用户，相关的协议、规则等的修改，也不以用户的同意或事先通知为前提。变更后的协议和规则一经公布，立即自动生效。如用户不同意相关变更，应当立即停止使用本平台相关服务。用户继续使用本平台相关服务的，即表示用户接受经修订的协议和规则。</p>
          <p class="text">4、用户承诺接受并遵守本协议的约定。如果用户不同意本协议的约定，用户应立即自行停止注册程序或停止使用本平台的服务。</p>
          <p class="text">二、知识产权保护条款</p>
          <p class="text">1、本平台所提供的服务涉及的文字表述、图片、图文组合、网页设计等，以及各软件、技术等相关的著作权、专利、商标专用权、商业秘密等法律规定的权利均归属于本平台的权利人所有，受中华人民共和国法律及相关国际条约的保护。</p>
          <p class="text">2、用户应正当使用本平台的各项服务及产品。平台运维方在任何情况下不就因不适当使用、出于过失或故意使用产品、服务/不适当地利用或由于过失或故意利用产品及服务的缺陷/或其他特殊的、意外的原因（或行为）给用户或其他第三人造成的直接或间接损失承担赔偿责任。如因前述原因或行为给平台运维方造成损害的，平台运维方将在法律规定的范围内保留相应的权利。</p>
          <p class="text">3、由于本平台的各项服务、产品涉及到互联网服务、通讯网络服务、本地操作环境、互联网络、通讯网络各环节等因素的影响，因此服务可能因计算机病毒或黑客攻击、互联网络、通讯网络提供商提供的服务差异化或出现意外、用户所在位置以及其他任何技术、互联网络、通信网络原因等出现异常或其他不能满足用户要求的风险。对于非归责于平台运维方的以上风险，平台运维方不承担任何责任。</p>
          <p class="text">4、用户不得利用本平台从事任何影响互联网络或通讯网络正常运作的行为，也不得非正常干预计算机软件的正常运行与终止，包括借助装置、软件或例行程序进行干预等。</p>
          <p class="text">5、用户与任何第三方所关涉的包括但不限于知识产权等任何纠纷均与本平台及平台运维方无关，由用户独立承担相应法律责任。</p>
          <p class="text">三、账户</p>
          <p class="text">1、账户注册</p>
          <p class="text">用户在开始使用本平台服务之前，应当按本平台的要求办理注册手续，任何单位或个人向平台运维方提出注册申请，即视为无条件的完全同意本平台的现有及将来的所有规则约束。</p>
          <p class="text">用户所取得的本平台帐号的所有权归于平台运维方，用户完成注册申请手续后，获得该帐号的使用权，用户应按照本平台的规定使用帐户，平台运维方保留单方收回该帐号使用权的权利。</p>
          <p class="text">本平台实行实名制注册，任何个人及单位均需在注册时据实填写个人或单位信息及其他相关信息，用户注册时所填写的身份信息不得随意变更，除非用户能提供充分的证据证明并经公证机构认可。因此，用户注册时务必使用本人的真实信息，并确保注册时所需信息填写准确、完整、真实、合法、有效。使用虚假信息注册的，可能导致平台运维方无法对用户进行身份确认，并且，相关信息将对今后用户所交付平台运维方公证存证的证据产生非正向的影响。</p>
          <p class="text">如用户的帐户信息发生变更，建议用户按照本平台的规则及时办理变更手续。一旦用户发现自身的身份信息被冒用，请用户尽快与平台运维方联系，并提供证明材料。</p>
          <p class="text">用户应对自身的账户信息的安全，以及对通过用户的账户实施的行为负责。除非有法律规定或司法裁决，且征得平台运维方的同意，否则，账户和密码不得以任何方式转让、赠与、借用或继承（与账户相关的财产权益除外）</p>
          <p class="text">如用户向本平台提出注册申请，用户的注册信息及其后经公证机构确认的信息均将在通过本平台提供服务的公证机构、公证信息化公证云平台及平台运维方的“知金链”之间共享（根据有关法律法规的规定，本平台负有对用户信息的保密义务，因此这种共享不涉及对用户信息的泄露），且用户不得以此为由向平台运维方主张任何权利（除非本平台运维方存在过错行为）。</p>
          <p class="text">2、账户使用</p>
          <p class="text">用户应当亲自使用注册账户获取本平台及平台运维方服务，如果确有特殊情形需要由第三人代理使用用户的账户，则应向其提供合法有效的授权。在无充分的相反证据证明的前提下，平台运维方将默认用户所注册的账户所进行的任何行为均为用户所进行，相应的法律责任均由用户承担。如果该账户为机构申请，任何因用户的授权、默许、过失而取得该帐户使用权的人通过该帐户所从事的行为均视为用户的行为。为确保用户帐户的安全，请用户保管好帐户密钥，规范授权行为。如果发现任何人未经授权使用用户的账户或有任何其他可能危及用户的账户安全的情形时，用户应当立即以有效方式通知平台运维方，要求平台运维方配合暂停相关服务，但用户的请求必须按本平台的相应规则进行。用户理解平台运维方对用户的请求采取行动需要合理时间，平台运维方对在采取行动前已经产生的后果（包括但不限于用户的任何损失）不承担任何责任。</p>
          <p class="text">3、账户的强制停用与收回</p>
          <p class="text">本平台或平台运维方发现用户的帐户存在违反有关法律法规或平台相关规则的行为，平台运维方可视情节进行单方停用帐户、收回帐户使用权等必要的措施。</p>
          <p class="text">4、帐户内数据归属</p>
          <p class="text">用户帐户内的数据经由平台运维方统一寄存于第三方公证信息化公证云平台和“知金链”，由公证信息化公证云平台和“知金链”提供寄存服务。因此，用户存在以下情形的，平台运维方将视用户抛弃该数据，可单方行使包括删除该数据在内的处分行为（但不得泄露用户数据），而不必经用户同意</p>
          <p class="text">（1）用户所申请保管的数据保管期限届满，且超过三个月未申请延期的；</p>
          <p class="text">（2）用户连续三个月未依据本平台及平台运维方的规定支付相关费用的；</p>
          <p class="text">（3）用户帐户被强制停用或收回的。</p>
          <p class="text">四、平台服务使用规范</p>
          <p class="text">（一）用户应合法使用本服务，应遵守中华人民共和国相关法律法规条约、用户所在国家或地区之法令及相关国际惯例，禁止将本服务用于任何非法违规目的。</p>
          <p class="text">（二）用户不得利用本服务从事侵害他人合法权益之行为，否则平台运维方有权拒绝提供本服务，且用户应承担所有相关法律责任，由此导致平台运维方受损的，用户应承担赔偿责任。上述行为包括但不限于：</p>
          <p class="text">1、侵害他人名誉权、荣誉权、肖像权、姓名权、隐私权、商业秘密、商标专用权、著作权、专利权等合法权益。</p>
          <p class="text">2、违反依法定或约定之保密义务。</p>
          <p class="text">3、冒用他人名义使用本服务。</p>
          <p class="text">4、从事不法交易行为，如洗钱、恐怖融资、贩卖枪支、毒品、禁药、盗版软件、黄色淫秽物品，其他平台运维方认为不得使用本服务进行交易的物品等。</p>
          <p class="text">5、提供赌博资讯或以任何方式引诱他人参与赌博。</p>
          <p class="text">6、非法使用他人银行账户（包括信用卡账户）或无效银行账号（包括信用卡账户）交易。</p>
          <p class="text">7、违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金（以下简称套现）。</p>
          <p class="text">8、从事任何可能含有电脑病毒或是可能侵害本服务系统、资料之行为。</p>
          <p class="text">9、上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：</p>
          <p class="text">（1）反对宪法所确定的基本原则的；</p>
          <p class="text">（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
          <p class="text">（3）损害国家荣誉和利益的；</p>
          <p class="text">（4）煽动民族仇恨、民族歧视、破坏民族团结的；</p>
          <p class="text">（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
          <p class="text">（6）散布谣言，扰乱社会秩序，破坏社会稳定的</p>
          <p class="text">（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
          <p class="text">（8）侮辱或者诽谤他人，侵害他人合法权利的；</p>
          <p class="text">（9）含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、低俗、猥亵、或其它道德上令人反感的内容；</p>
          <p class="text">（10）含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</p>
          <p class="text">10、不得为任何非法目的而使用网络服务系统；</p>
          <p class="text">11、不利用平台运维方服务从事以下活动：</p>
          <p class="text">（1）未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</p>
          <p class="text">（2）未经允许，对计算机信息网络功能进行删除、修改或者增加的；</p>
          <p class="text">（3）未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</p>
          <p class="text">（4）故意制作、传播计算机病毒等破坏性程序的；</p>
          <p class="text">（5）其他危害计算机信息网络安全的行为。</p>
          <p class="text">（三）用户了解并同意：</p>
          <p class="text">1、平台运维方有权对用户是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向用户提供服务，且无须征得用户的同意或提前通知予用户。</p>
          <p class="text">2、经国家行政机关或司法裁判机关的生效法律文书确认用户存在违法或侵权行为，或者平台运维方根据自身的判断，认为用户的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则平台运维方有权对用户的该等涉嫌违法或违约行为采取在本平台上公示及其他必要措施。</p>
          <p class="text">3、对于用户在通过本平台发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议和/或规则的信息，平台运维方将按照规则的规定进行处理。</p>
          <p class="text">4、对于用户在本平台上实施的行为，包括用户未在本平台上实施但已经对平台及其他用户产生影响的行为，平台运维方有权单方认定用户行为的性质及是否构成对本协议和/或规则的违反，并据此作出相应处罚。用户应自行保存与用户行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。</p>
          <p class="text">5、对于用户涉嫌违反承诺的行为对任意第三方造成损害的，用户均应当以自己的名义独立承担所有的法律责任，并应确保平台运维方免于因此产生损失或增加费用。</p>
          <p class="text">6、如用户涉嫌违反有关法律或者本协议之规定，使平台运维方遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，用户应当赔偿平台运维方因此造成的一切损失，包括但不限于合理的律师费用。</p>
          <p class="text">五、数据保管规则及服务费用 提供公证存证法律服务的公证存证信息化平台公证云</p>
          <p class="text">1、用户使用本平台服务，平台运维方提供的数据保管具有期限（保管期限按本平台的规定执行），保管期限届满后，平台运维方将不另行通知用户续费，因用户逾期未办理延期手续的，平台运维方将视为用户抛弃所提交保管的数据文件，并有权单方按照系统的保管规则处置用户所提交保管的数据文件（且不再以任何形式通知）。</p>
          <p class="text">2、客户在本平台上的公证事宜通过第三方“厦门鹭江公证处”及其“公证信息化平台公证云”、“知金链”给予专业及技术上的支持实现，客户注册本平台即视为对前述第三方的自愿接受，事后不能以未知晓/未同意前述第三方的服务为由终止、撤销或变更本协议。</p>
          <p class="text">3、本平台所提交的服务为有偿服务，用户注册使用本平台即视为用户接受本平台的服务报价，以本平台明示的价格为准，如有变更不另行通知。</p>
          <p class="text">4、使用本平台所产生的费用包括：用户因电子数据保管所产生的技术服务费，此项费用由平台运维方收取（数据寄存期满的用户需及时续缴费用）。</p>
          <p class="text">5、一旦发生意外，非系统原因，收取的保管费用不予退还。收费与用户利用本平台的证据固定效果无关，用户不得以存证效果不好或达不到目的等理由向平台运维方请求退费。</p>
          <p class="text">六、在线受理服务使用规则</p>
          <p class="text">（一）在使用本平台网上受理服务过程中，用户承诺遵守以下约定：</p>
          <p class="text">1、在使用在线受理服务过程中实施的所有行为均遵守国家法律、法规等规范性文件及本平台各项规则的规定和要求，不违背社会公共利益或公序良俗，不损害他人的合法权益，不违反本协议及相关规则。用户如果违反前述承诺，产生任何法律后果的，用户应以自己的名义独立承担所有的法律责任，并确保平台运维方免于因此产生任何损失。</p>
          <p class="text">2、遵守诚实信用原则，不从事与本平台服务无关的行为。</p>
          <p class="text">3、不发布国家禁止发布的信息（除非取得合法且足够的许可），不发布涉嫌侵犯他人合法权益的信息，不发布违背社会公共利益或公序良俗或平台运维方认为不适合在平台上发布的信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。</p>
          <p class="text">4、不使用任何装置、软件或例行程序干预或试图干预平台运维方网上受理服务的正常运作。用户不得采取任何将导致不合理的庞大数据负载加诸平台运维方平台网络设备的行动。</p>
          <p class="text">（二）用户了解并同意：</p>
          <p class="text">1、平台运维方有权对用户是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向用户提供服务，且无须征得用户的同意或提前通知予用户。</p>
          <p class="text">2、经国家行政或司法机关的生效法律文书确认用户存在违法或侵权行为，或者平台运维方根据自身的判断，认为用户的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则平台运维方有权在平台运维方平台上公示用户的该等涉嫌违法或违约行为及平台运维方已对用户采取的措施。</p>
          <p class="text">3、对于用户在平台上发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议和/或规则的信息，平台运维方有权不经通知用户即予以删除，且按照规则的规定采取平台运维方认为必要的相应措施。</p>
          <p class="text">4、对于用户在本平台或本平台外对平台运维方、本平台及其他用户产生不良影响的任何言行，平台运维方有权单方认定用户行为的性质及是否构成对本协议和/或规则的违反，并据此作出相应处罚。用户应自行保存与用户行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。</p>
          <p class="text">5、对于用户涉嫌违反承诺的行为对任意第三方造成损害的，用户均应当以自己的名义独立承担一切法律责任，并应确保平台运维方免于因此产生任何损失。</p>
          <p class="text">6、如用户涉嫌违反有关法律或者本协议之规定，使平台运维方遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，用户应当赔偿平台运维方因此造成的损失及（或）发生的费用，包括但不限于合理的律师费用。</p>
          <p class="text">（三）有关办理规则</p>
          <p class="text">1、平台运维方所提供的在线受理服务是根据有关规定，对用户在线存证申请的预受理，用户在向平台运维方在线提出申请后，平台运维方将对用户的公证存证申请进行审查后，决定是否给予受理。</p>
          <p class="text">2、如用户的在线申请经平台运维方受理后，用户应按照平台运维方的要求，积极配合办理完成全部存证手续。</p>
          <p class="text">3、用户的申请如有下列情形之一的，平台运维方不予办理：</p>
          <p class="text">（1）无民事行为能力人或者限制民事行为能力人没有监护人代理申请办理存证的；</p>
          <p class="text">（2）当事人与申请存证的事项没有利害关系的；</p>
          <p class="text">（3）申请存证的事项属专业技术鉴定、评估事项的；</p>
          <p class="text">（4）当事人之间对申请存证的事项有争议的；</p>
          <p class="text">（5）当事人虚构、隐瞒事实，或者提供虚假证明材料的；</p>
          <p class="text">（6）当事人提供的证明材料不充分又无法补充，或者拒绝补充证明材料的；</p>
          <p class="text">（7）申请存证的事项不真实、不合法的；</p>
          <p class="text">（8）申请存证的事项违背社会公德的；</p>
          <p class="text">（9）当事人拒绝按照规定支付存公证存证证费的。</p>
          <p class="text">4、用户的申请有下列情形之一的，平台运维方将终止存证：</p>
          <p class="text">（1）存证申请确认前当事人撤回存证申请的；</p>
          <p class="text">（2）因申请存证的自然人死亡、法人或者其他组织终止，不能继续办理存证或者继续办理存证已无意义的；</p>
          <p class="text">（3）当事人阻挠、妨碍存证办理的</p>
          <p class="text">（4）其他应当终止的情形。</p>
          <p class="text">（四）有关费用</p>
          <p class="text">1、用户通过本平台向平台运维方提出在线申请，应按照有关规定支付相关存证费用。</p>
          <p class="text">2、本平台所列的费用为预收费用，正式费用以结算为准。</p>
          <p class="text">3、如用户需要本平台运维方提供上门服务、文书认证等服务，应另行支付相关的费用。</p>
          <p class="text">4、因用户的原因致该存证不予办理或终止存证的，如平台运维方已进行审查的，平台运维方将根据有关规定退还部分存证费用。</p>
          <p class="text">七、责任限制</p>
          <p class="text">1、平台运维方不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令，执行裁判机构的生效裁决或第三方的不作为而造成的不能服务或延迟服务承担责任。</p>
          <p class="text">2、用户在明知或有充分的理由应当知道平台运维方不能正常提供相应的服务仍然使用系统服务，由此所产生的损害由用户自行承担。</p>
          <p class="text">八、协议终止</p>
          <p class="text">1、用户同意，平台运维方有权自行全权决定以任何理由不经事先通知的中止、终止向用户提供部分或全部系统服务，暂时或永久冻结（注销）用户的账户，且无须为此向用户或任何第三方承担任何责任。</p>
          <p class="text">2、出现以下情况时，平台运维方有权直接以注销账户的方式终止本协议:</p>
          <p class="text">（1）终止向用户提供服务后，用户涉嫌再一次直接或间接或以他人名义注册为平台运维方的；</p>
          <p class="text">（2）本协议（含规则）变更时，用户明示并通知平台运维方不愿接受新的服务协议的；</p>
          <p class="text">（3）平台运维方认为应当终止服务的其它情况。</p>
          <p class="text">3、用户有权向平台运维方要求注销用户的账户，经平台运维方审核同意的，平台运维方注销（永久冻结）用户的账户，届时，用户与平台运维方基于本协议的协议关系即终止。用户的账户被注销（永久冻结）后，平台运维方没有义务为用户保留或向用户披露用户账户中的任何信息，也没有义务向用户或第三方转发任何用户未曾阅读或发送过的信息，用户在帐户被注销或永久冻结前应当采取适当的措施自行提取帐户的相关资料，平台运维方不再提供相应的数据保管服务，也不再另行通知用户提取数据。</p>
          <p class="text">4、用户同意，用户与平台运维方的协议关系终止后，平台运维方仍享有下列权利：</p>
          <p class="text">（1）继续保存用户的注册信息及用户使用系统服务期间的所有信息。</p>
          <p class="text">（2）用户在使用系统服务期间存在违法行为或违反本协议和/或规则的行为的，平台运维方仍可依据本协议向用户主张权利。</p>
          <p class="text">九、法律适用、管辖与其他</p>
          <p class="text">1.本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。</p>
          <p class="text">2、因本协议产生之争议的，应向平台运维方所在地提起诉讼。</p>
        </div>
      </div>
      <div class="close" @click="regAgreement = false"></div>
    </div>
    <div class="body-mask" v-if="noticeState" @click="noticeState = false">
      <div class="dialog-box">
        <h1>拾贝网用户存证服务协议</h1>
        <div class="content">
          <p class="text">致福建省厦门市鹭江公证处：</p>
          <p class="text">本人提交公证处保管的作品属于个人作品，本人对该作品拥有完整著作权，作品不存在侵害他人合法权利的情形，并且以下作品主要事项由本人填写并保证该事项的真实性</p>
          <p class="text">作品名称：{{productionName}}</p>
          <p class="text">作品种类：{{productTypes[activeProduct]['name']}}作品</p>
          <!-- <p class="text">作者: {{authInfo.apply_name}}</p> -->
          <p class="text">创作完成时间：{{dateText}}</p>
          <p class="text">发表状态：{{publishStatus[activePub]['name']}}</p>
          <p class="text" v-if="publishStatus[activePub]['id'] == 1">首次发表日期：{{date2Text}}</p>
          <p class="text">保管文件名称：{{fileInfo.fileName}}</p>
          <p class="text">本人保证：提交保管时填写的内容及上述声明内容均真实，若有虚假，由此所产生的一切法律责任均由声明人本人承担，与平台及贵公证处无关。</p>
          <p class="text tr"></p>
          <p class="text tr">特此声明！</p>
          <p class="text tr">声明人：{{authInfo.apply_name}}</p>
          <p class="text tr">{{authInfo.apply_type == 5 ? '证件号码：' : '统一社会信用代码：'}}{{authInfo.apply_number}}</p>
          <p class="text tr">{{curDate}}</p>
        </div>
      </div>
      <div class="close" @click="noticeState = false"></div>
    </div>
    <!-- 弹框 -->
    <div class="modal-mask" v-if="showDiaModal">
      <div class="maskBg" @click="showDiaModal = false"></div>
      <!-- <div class="maskBg"></div> -->
      <div class="mymodal-dialog mymodal-dialog1">
        <div class="mymodal-dialog-in">
          <div class="modal-title">
            <p class="tit">本人操作验证</p>
          </div>
          <div class="modal-content">
            <div class="inputWrap">
              <input type="text" v-model="msgCode" :maxlength="6" placeholder="请填写验证码"><div :class="[preventCode ? '' : 'prenentMsg', 'msgCode']" @click="getCode">{{codeText}}</div>
            </div>
            
          </div>
          <div class="modal-footer">
            <!-- <div class="btn_item btn-confirm line" @click="confirmSubmit" data-status="confirm" >取消</div> -->
            <div class="btn_item btn-confirm line" @click="confirmSubmit" data-status="confirm" >确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="imessage" :class="[messageObj.status ? 'showMsg' : '', messageObj.type === 'success' ? 'successMsg' : '']">
      {{ messageObj.content }}
    </div>
    <u-modal :showModal="showModal" :content="content" :options="options" @confirmBtn="confirmFn" />
  </div>
</template>

<script>
import interfaces from '@/api//interfaces';
import {mapState} from 'vuex';
const { czUrl } = CONFIG;
export default {
  data () {
    return {
      messageObj: {
        status: false,
        content: '',
        type: 'error'
      },
      date: '请选择创作完成时间', // 创作时间
      date2: '请选择首次发表时间', // 首次发表时间
      address: null, // 首次发表地址
      productionName: '', // 作品名称
      fileInfo: {}, // 上传的文件信息 url, fileSize
      productTypes: [
        { name: '文字', id: 4 },
        { name: '音乐', id: 6 },
        { name: '美术', id: 5 },
        { name: '其他', id: 8 }
      ],
      imageState: false,
      curDate: '',
      percent: 0, // 进度条
      regAgreement: false,
      noticeState: false,
      showModal: false,
      showDiaModal: false,
      content: '抱歉，由于您的存证包数量不足，请前往购买存证包',
      options: {
        type: 1, // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '购买存证包',
        confirmColor: '#2F80F6'
      },
      publishStatus: [
        { name: '创作完成，未上线', id: 0 },
        { name: '已上线', id: 1 },
      ],
      activePub: 0, // 选中的发表状态索引
      activeProduct: 0, //当前选中的作品类型索引
      notarizationPurpose: 4, // 选中作品类型ID
      checkState: false,
      preventCode: false,
      codeText: '60s后可重发',
      msgCodeTimer: '',
      msgCode: '',
      orderSn: '',
      imageUrl: '',
      czNum: 0, // 存证包数量
    }
  },
  components: {

  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  computed:{
    ...mapState('auth', ['authInfo']),
    dateText () {
      return this.dateFormat(this.date);
    },
    date2Text () {
      return this.dateFormat(this.date2);
    }
  },
  mounted () {
    this.imageState = false;
    console.log('route', this.$root.$mp)
    let query = this.$root.$mp.query;
    if (!query.noCache) {
      this.percent = 0;
      this.productionName = '';
      this.imageUrl = '';
      this.fileInfo = {};
      this.checkState = false;
      this.date = '请选择创作完成时间';
      this.date2 = '请选择首次发表时间';
      this.address = null;
      this.activePub = 0;
      this.activeProduct = 0;
      this.notarizationPurpose = 4;
    }
    this.curDate = this.dateFormat(new Date());
    setTimeout(() => {
      this.querycznum();
    }, 1500);
    console.log(this.authInfo)
  },
  watch: {
    messageObj: {
      handler (newVal, oldVal) {
        if (newVal.status) {
          setTimeout(() => {
            this.messageObj.status = false;
          }, 1500)
        }
      },
      deep: true
    }
  },
  methods: {
    // 
    closeDia(){
      this.showDiaModal = false
      clearInterval(this.msgCodeTimer);
      this.codeText = "重发验证码";
      this.preventCode = true;
    },
   // 重获验证码
    getCode () {
      if (this.preventCode) {
        this.preventCode = false;
        this.getMobCode();
      }
    },
    //定时器 发送验证码的定时器
    timeout () {
      var self = this;
      var second = 59;
      this.msgCodeTimer = setInterval(function(){
        if(second<=0){
          clearInterval(self.msgCodeTimer);
          second = 59;
          self.codeText = "重发验证码";
          self.preventCode = true;
        }else{
          self.codeText = second + "s后可重发";
          self.preventCode = false;
          second--;
        }
      }, 1000);
    },
    // 弹框处理事件
    confirmFn (data) {
      if (data) {
        // 确认时处理
        if (this.options.type == 1) {
          // 存证不足，跳转至购买存证页面
          this.showModal = false;
          this.buyCz();
        } else if (this.options.type == 2) {
          // 订单生成失败
          this.showModal = false;
        } else if (this.options.type == 3) {
          // 存证成功
          this.showModal = false;
          wx.switchTab({url: '/pages/index/index'})
        }
        // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时

      } else {
        // 取消时处理
        this.showModal = false;
        if (this.options.type == 3) {
          // 存证成功跳转到存证详情页面
          this.$router.replace({path: '/pages/certificate/certificateDetail?order_sn='+this.orderSn});
        }
        
      }
    },
    //upload
    async upload () {
      if (!this.productionName) {
        this.messageObj = { content: '请先输入作品名称', type: 'error', status: true };
        return;
      }
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.imageUrl = '';
          this.fileInfo = {};
          let imgArr = res.tempFilePaths[0].split('.');
          let imgType = imgArr[imgArr.length - 1];
          let imgTypes = ['jpg', 'jpeg', 'png', 'bmp']
          if (imgTypes.findIndex(item => (item == imgType)) == -1) {
            this.messageObj = { content: '请上传JPG/JPEG/PNG/BMP格式文件', type: 'error', status: true };
            this.fileInfo = {};
            return;
          }
          this.imageState = false;
          let uploadTask = wx.uploadFile({
            url: `${czUrl}/EvidenceController/uploadDataBaoQuan`,
            header: interfaces.createAuthHeader(),
            filePath: res.tempFilePaths[0],
            formData: {fileName: this.productionName},
            name: 'fileData',
            success: resd => {
              console.log(resd.data)
              let respData = JSON.parse(resd.data);
              if (respData.url) {
                this.percent = 100;
                this.imageUrl = res.tempFilePaths[0]
                this.fileInfo = respData;
                this.fileInfo.fileName = decodeURI(respData.fileName);
                this.imageState = true
                // this.$set(this.fileInfo, "url", respData.url);
                console.log('fileInfo', this.fileInfo, this.imageUrl)
              } else {
                this.messageObj = { content: respData.desc, type: 'error', status: true };
              }
            },
            fail: err => { 
              this.messageObj = { content: '上传失败', type: 'error', status: true };
              if (this.fileInfo.url) {
                this.imageState = true;
              }
              console.log('uploadfail', err);
              this.percent = 100;
            }
          })
          uploadTask.onProgressUpdate((res) => {
            if (res.progress <= 99) {
              this.percent = res.progress;
            }
          })
        },
        fail: err => { console.log(err) }
      })
    },
    clickNotice () {
      if (!this.validForm()) {
        return;
      }
      this.noticeState=true
    },
    validForm () {
      if (!this.productionName) {
        this.messageObj = { content: '请输入作品名称', type: 'error', status: true };
        return false;
      }
      if (this.date === '请选择创作完成时间') {
        this.messageObj = { content: '请选择创作完成时间', type: 'error', status: true };
        return false;
      }
      if (!this.fileInfo.url) {
        this.messageObj = { content: '请先上传作品文件', type: 'error', status: true };
        return false;
      }
      if (this.activePub == 1){
        if (this.date2 == '请选择首次发表时间') {
          this.messageObj = { content: '请选择首次发表时间', type: 'error', status: true };
          return false;
        }
        if (!this.address) {
          this.messageObj = { content: '请输入首次发表地址', type: 'error', status: true };
          return false;
        }
        if (this.address.replace(/[\u4e00-\u9fa5]/g,'***').length > 500) {
          this.messageObj = { content: '地址长度不能超过500个字符', type: 'error', status: true };
          return false;
        }
      }
      return true;
    },
    // 下单前手机号验证
    async getMobCode () {
      let mobile = this.$storage.get('auth').phone;
      let data = await this.API.homePage.getMobCode({mobile});
      if (data.code != 200) {
        this.preventCode = true;
      } else {
        this.timeout();
      }
    },
    // 下单
    async handleSubmit () {
      let da = new Date(this.date).getTime();
      console.log('date', this.date, da)
      if (!this.validForm()) {
        return;
      }
      if (!this.checkState) {
        this.messageObj = { content: '请先勾选声明！', type: 'error', status: true };
        return;
      }
      if (!this.czNum) {
        // 存证包数量不足
        this.options = {
          type: 1, // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '购买存证包',
          confirmColor: '#2F80F6'
        }
        this.content = '抱歉，由于您的存证包数量不足，请前往购买存证包';
        this.showModal = true;
        return;
      }
      this.confirmSubmit()
      // this.showDiaModal = true;
      // this.msgCode = '';
      // if (this.codeText == '60s后可重发' || this.codeText == '重发验证码') {
      //   this.getMobCode();
      // }
      
    },
    // 确定存证
    async confirmSubmit (mobCode) {
      // if (!this.msgCode) {
      //   this.messageObj = { content: '请输入验证码', type: 'error', status: true };
      //   return;
      // }
      // let msgReg = /^\d{6}$/;
      // if (!msgReg.test(this.msgCode)) {
      //   this.messageObj = { content: '请输入6位数字验证码', type: 'error', status: true };
      //   return;
      // }
      try{
        let czData = await this.API.homePage.addAttestations({
          userId: this.authInfo.userId,
          czChannel: '6',
          payType: 2, //支付类型
          orderApplySubjectId: this.authInfo.apply_id,
          // notarizationPurpose: this.notarizationPurpose,
          notarizationPurpose: 8,
          notarizationType: 2,
          source: 1,
          mobCode: this.msgCode,
          notarizationRefList: [
            {
              url: this.fileInfo.url,
              fileSize: this.fileInfo.fileSize,
              fileName: this.fileInfo.fileName,
              productionName: this.productionName,
              // productionSign: this.authInfo.apply_name, // 作者署名
              // productionLeixin: '0', // 作品类型
              publishTime: this.activePub == 1 ? new Date(this.date2).getTime() - 8*60*60*1000 : null,
              publicSite: this.activePub == 1 ? this.address : null,
              // notarizationPurpose: this.notarizationPurpose,
              notarizationPurpose: 8,
              obtain: 1,
              productionTime: new Date(this.date).getTime() - 8*60*60*1000,
              publishState: this.publishStatus[this.activePub]['id']
            }
          ]
        })
        console.log('czData', czData)
        if (czData.code == '0') {
          // 存证成功
          this.showDiaModal = false;
          clearInterval(this.msgCodeTimer);
          this.codeText = '60s后可重发';
          this.preventCode = false;
          console.log('success')
          this.options = {
            type: 3, // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时
            showCancel: true,
            cancelText: '查看存证',
            cancelColor: '#000000',
            confirmText: '继续存证',
            confirmColor: '#2F80F6'
          }
          this.content = '存证成功';
          this.showModal = true;
          this.orderSn = czData.data;
          console.log('options', this.options)
        } else if (czData.code == '3010019') {
          this.messageObj = { content: '短信验证码错误，请重新输入', type: 'error', status: true }
        } else {
          console.log('fail')
          this.showDiaModal = false;
          clearInterval(this.msgCodeTimer);
          this.codeText = '60s后可重发';
          this.preventCode = false;
          this.options = {
            type: 2, // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#2F80F6'
          }
          this.content = '订单生成失败，请重试';
          this.showModal = true;
        }
      }catch(err){
        this.showDiaModal = false;
        clearInterval(this.msgCodeTimer);
        this.codeText = '60s后可重发';
        this.preventCode = false;
        this.options = {
          type: 2, // 1,2,3 分别代表存证包不足时，订单生成失败时，存证成功时
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#2F80F6'
        }
        this.content = '订单生成失败，请重试';
        this.showModal = true;
      }
    },
    handleClickPubStatus (index) {
      this.activePub = index;
    },
    // 
    handleClickProdType (index) {
      this.activeProduct = index;
      this.notarizationPurpose = this.productTypes[index]['id'];
      console.log(this.notarizationPurpose)
    },
    bindDateChange (e) {
      this.date = e.mp.detail.value
    },
    bindDate2Change (e) {
      this.date2 = e.mp.detail.value
    },
    // 获取存证包数量
    async querycznum () {
      let data = await this.API.homePage.querycznum();
      this.czNum = data.data
      console.log(data)
    },
      //日期格式转换
    dateFormat (input) {
        var _date = new Date(input);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "年" + month + "月" + day + '日';
    },
    buyCz () {
      this.$router.push({path: '/pages/index/serviceDetail', query: {from: '/pages/index/fileEvidence'}})
    },
  }
}
</script>

<style lang="scss">
.evidenceWrap{min-height: 100%;background: #f8f8f8;padding-bottom: 160px;
  .header{height:80px;padding: 0 30px;
    p{font-size:28px;line-height: 100%;color:#333;}
    .to_shop{color:#22aaf9;
      span{vertical-align: middle;}
      img{width:11px;height:23px;vertical-align: middle;margin-left: 12px;}
    }
  }
  .input_lists{height:88px;background-color:#fff;padding:0 30px;
    p{font-size:30px;color:#333;line-height:100%;vertical-align: middle;width:165px; }
    >div{padding-left: 15px;}
    input{color:#909090;font-size:30px;vertical-align: middle;margin-left:86px;width:450px;}
  }
  .title{height:80px;background: #f8f8f8;
    p{color:#909090;font-size:28px;line-height:80px;}
  }
  .contentWrap{padding: 0 30px;background: #fff;

  }
  .infoWrap{display: flex;line-height: 88px;border-bottom: 1px solid #eee;
    .des{color: 30px; color: #333;width: 180px;}
    .datePicker{color: #eee;flex-grow: 1;
      .picker{color: #909090;width: 100%;}
      .placeholderClass{color: #ddd;}
    }
    .input{height: 88px;line-height: 88px;flex-grow: 1;}
    .labelWrap{display: flex;
      .labelItem{height: 53px;width: 111px;border: 1px solid #909090;line-height: 50px;text-align: center;font-size: 28px;border-radius: 6px;
        margin: 18px 12px 0;color: #909090;
      }
      .activeLabel{border: 1px solid #22aaf9;color:#22aaf9;background: #ebf8ff;}
    }
    .uploadWrap{
      display: flex;margin: 30px 0 40px;flex-grow: 1;
      .uploadDes{flex-grow: 1;padding-left: 15px;
        .topDes{font-size: 22px;color: #909090;width: 350px;line-height: 24px;padding-top: 0;}
        .botDes{font-size: 22px;color: #909090;width: 350px;padding-top: 20px;line-height: 24px;}
        progress{height: 50px;}
      }
    }
    .upload{width: 145px;height: 145px;border: 1px dashed #eee;line-height: 140px;text-align: center;color: #eee;font-size: 60px;
      img, image{height: 100%;width: 100%;}
      >p{font-size: 28px;color: #999;}
    }
    .productionWrap{display: flex;
      .item{height: 53px;width: 243px;border: 1px solid #909090;line-height: 50px;text-align: center;font-size: 28px;border-radius: 6px;
        margin: 18px 12px 0;color: #909090;}
      .activeLabel{border: 1px solid #22aaf9;color:#22aaf9;}
    }
  }
  .checkWrap{background: #fff;margin-top: 20px;padding: 30px 30px;display: flex;
    icon{width: 52px;height: 52px;margin-top: 24px;}
    >p{font-size: 22px;color: #333;padding-left: 26px;word-break: break-all;
      span{color: #22aaf9;}
      span, i{word-break: break-all;display: inline;}
    }
  }
  .footer{width:100%;height:100px;background-color:#fff;position: fixed;bottom:0;left:0;padding-left: 35px;
    .name{
      .name_title{font-size:30px;color:#333;}
      .tips{font-size:24px;color:#909090;}
    }
    .number{font-size:50px;color:#fa1313;
      span{font-size:30px;}
    }
    .btn{width:280px;height:100px;color:#fff;font-size:32px;text-align:center;line-height:100px;background-color:#22aaf9;}
  }
    .body-mask {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      width: 750px;
      height: 100%;
      background: rgba(0,0,0,0.40);

      .dialog-box {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 30px;
        width: 690px;
        height: 1071px;
        background: #fff;
        padding: 0 40px;
        box-shadow: 0 6px 30px 0 rgba(0,0,0,0.10);
        border-radius: 6px;

        h1 {
          margin: 60px auto 20px;
          font-size: 32px;
          color: #333;
        }

        .content {
          width: 610px;
          height: 870px;
          margin: 0 auto;
          overflow: auto;

          p {
            font-size: 24px;
            line-height: 36px;
            color: #666;
            text-align: left;
            word-break: break-all;
          }
          .tr{text-align: right;}

        }

      }

      .close {
        position: absolute;
        top: 1060.8px;
        left: 336.8px;
        width: 90.5px;
        height: 90.5px;
        border-radius: 50%;
        background: url(~assets/img/icon/chacha.png) no-repeat center center #666;
        background-size: 42.5px;
      }

    }
  .maskBg{width: 100%;height: 100%;position: absolute;left: 0;top:0;background: rgba(0,0,0,.1);}
  .mymodal-dialog1{width: 690px;margin-left: -345px;
    .modal-title{padding-top: 70px;text-align: center;font-size: 34px;line-height: 36px;color:#333;padding-bottom: 60px;}
    .mymodal-dialog-in .modal-content{margin-bottom: 60px;padding: 0 70px;
      .inputWrap{display: flex;}
      input{background: #f8f8f8;height: 70px;line-height: 70px;border-radius: 4px;width: 360px;text-align: left;padding-left: 15px;
        font-size: 26px;color: #909090;
      }
      .msgCode{width: 190px;height: 70px;line-height: 70px;text-align: center;background:#22aaf7;font-size: 22px;color: #fff;}
      .prenentMsg{background: #909090;}
    }
    .modal-footer{
      .btn_item{height: 104px;line-height: 104px;color: #22aaf7;font-size: 36px;}
    }
  }
  .imessage{
      display:none;width:750px;min-height:64px;line-height:2.3;position:fixed;top:0;left:0;right: 0;color:#fff;text-align:center;font-size:28px;z-index:10100;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background:#ed3f14;height: 64px;
      opacity: 0;transition: all 0.3s;
    }
  .showMsg{opacity: 1;display: block;}
  .successMsg{background: #19be6b;}
}
 
</style>
