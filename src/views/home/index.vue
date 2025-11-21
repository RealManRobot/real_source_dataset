<template>
  <div class="rel ovya pb100" style="background-color: #e7ecf3;">
    <div class="gf rel blankBg" style="background:linear-gradient(135deg, #1e293b 0%, #334155 100%);padding:0.6rem 0.3rem">
      <div class="lt5r fs14r mb10r g9 pl7">REALMAN ROBOTICS</div>
      <div class="f ac">
        <div class="b lt2r" style="font-size:0.52rem;background: linear-gradient(135deg, #3b82f6, #8b5cf6);-webkit-background-clip: text;-webkit-text-fill-color: transparent;background-clip: text;">
          Real Source Dataset
        </div>
        <!-- <div class="pl10r b" style="font-size:0.52rem;">数据采集系统</div> -->
      </div>
      <div class="pt30r fs20r w50" style="color:rgb(229 231 235 / var(--tw-text-opacity, 1))">
        全球首个高质量、模态数量最多的机器人开源真机数据集
      </div>
      <div class="auto rds30 f ac mt30 fd pl10 pr5" style="width:900px;background:#131c2f;">
        <div class="f1 pt12 pb12 f ac xc gc">{{$t('quick_navigation') }}</div>
        <div
          v-for="item in routeList" :key="item.id" 
          class="f1 pt12 pb12 f ac xc poi rel hoverTagBg"
          @click="goCurId(item.id)"
        >
          {{item.name}}
        </div>
      </div>
      <!-- <div @click="toggleLanguage" class="abs zx10 poi" style="top:10px;right:10px;">
        <atomSvg :type="language" width="32" height="32" color="#ffffff"></atomSvg>
      </div> -->
      <div @click="" class="abs r0 b0" style="bottom:10px;right:10px;">
        <div class="f gf mb5 fs16 contact">
          <div class="pr2">电话：</div>
          <div class="">400-898-2018</div>
        </div>
        <div class="f gf fs16 contact">
          <div class="pr2">邮箱：</div>
          <div class="">realsource@realman-robot.com</div>
        </div>
      </div>
    </div>
    <!--下面-->
    <div class="w80 auto pt30r">
      <div class="f ac fs30r b pb10r" style="">开源地址</div>
      <div class="f ac xc mb30r">
        <div @click="goUrl('https://huggingface.co/datasets/RealSourceData/RealSource-World')" class="gf fs18 rds30 pl15 pr15 pt8 pb8 poi f ac" style="background:#262626;">
          <svg t="1763710691462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11973" width="20" height="20"><path d="M508.700444 881.777778A395.377778 395.377778 0 1 0 113.777778 486.4 395.377778 395.377778 0 0 0 508.700444 881.777778z" fill="#FFD21E" p-id="11974"></path><path d="M904.078222 486.4A395.377778 395.377778 0 1 0 508.700444 881.777778a395.377778 395.377778 0 0 0 395.377778-395.377778zM68.266667 486.4A440.888889 440.888889 0 1 1 508.700444 927.288889 440.888889 440.888889 0 0 1 68.266667 486.4z" fill="#FF9D0B" p-id="11975"></path><path d="M637.155556 378.766222c14.563556 5.12 20.252444 34.929778 34.929777 27.192889a56.888889 56.888889 0 1 0-76.913777-23.552c6.940444 13.084444 29.013333-8.192 41.984-3.640889zM369.208889 378.766222c-14.563556 5.12-20.366222 34.929778-34.929778 27.192889a56.888889 56.888889 0 1 1 76.913778-23.552c-6.940444 13.084444-29.127111-8.192-41.984-3.640889zM505.856 651.832889c111.843556 0 147.911111-99.669333 147.911111-150.869333 0-26.624-17.863111-18.318222-46.535111-4.096-26.510222 13.084444-62.122667 31.175111-101.376 31.175111-81.692444 0-147.911111-78.279111-147.911111-27.079111s36.067556 150.869333 147.911111 150.869333z" fill="#3A3B45" p-id="11976"></path><path d="M508.700444 768a98.759111 98.759111 0 0 0 34.133334-191.260444l-4.096-1.479112c-9.557333-2.958222-19.683556 29.582222-30.151111 29.582223s-19.342222-32.768-28.103111-30.151111a98.759111 98.759111 0 0 0 28.216888 193.422222z" fill="#F94040" p-id="11977"></path><path d="M776.078222 432.355556A36.977778 36.977778 0 1 0 739.555556 395.377778 36.977778 36.977778 0 0 0 776.078222 432.355556zM247.011556 432.355556a36.977778 36.977778 0 1 0-36.977778-36.977778A36.977778 36.977778 0 0 0 247.011556 432.355556zM170.666667 557.511111a59.392 59.392 0 0 0-45.511111 21.276445 67.356444 67.356444 0 0 0-15.132445 42.666666 82.830222 82.830222 0 0 0-22.072889-3.413333A60.302222 60.302222 0 0 0 42.552889 637.155556a65.991111 65.991111 0 0 0-18.090667 54.499555A63.488 63.488 0 0 0 33.450667 716.8a61.667556 61.667556 0 0 0-20.366223 32.085333 66.901333 66.901333 0 0 0 8.988445 53.930667c-0.910222 1.365333-1.706667 2.958222-2.503111 4.437333a59.164444 59.164444 0 0 0-1.592889 52.679111c11.377778 26.396444 40.618667 47.104 96.938667 69.518223 34.929778 13.767111 67.015111 22.755556 67.242666 22.755555a501.987556 501.987556 0 0 0 124.359111 18.090667c66.673778 0 114.346667-20.366222 141.767111-60.643556C492.430222 844.8 486.172444 785.066667 429.056 728.177778a313.230222 313.230222 0 0 1-56.888889-88.405334c-8.760889-30.264889-32.199111-63.943111-70.997333-63.943111a57.685333 57.685333 0 0 0-9.784889 0.796445 64.625778 64.625778 0 0 0-42.439111 27.079111A150.414222 150.414222 0 0 0 216.177778 572.074667 84.309333 84.309333 0 0 0 170.666667 557.511111z m0 45.511111a40.96 40.96 0 0 1 20.707555 7.395556C216.177778 625.777778 262.712889 706.332444 279.893333 737.621333a27.648 27.648 0 0 0 24.348445 14.904889c17.635556 0 31.288889-17.408 1.706666-39.594666-44.600889-33.336889-29.013333-87.836444-7.736888-91.022223a11.377778 11.377778 0 0 1 2.730666 0c19.342222 0 27.875556 33.336889 27.875556 33.336889a358.968889 358.968889 0 0 0 68.266666 105.699556c42.894222 42.894222 45.511111 77.368889 13.880889 123.335111-21.390222 31.288889-62.236444 40.732444-104.220444 40.732444A472.291556 472.291556 0 0 1 193.422222 908.060444c-1.251556 0-153.031111-43.235556-133.802666-79.644444a15.815111 15.815111 0 0 1 15.246222-8.647111c27.079111 0 76.344889 40.277333 97.507555 40.277333A8.760889 8.760889 0 0 0 182.044444 853.333333c8.988444-32.312889-137.216-45.511111-125.155555-92.842666a14.904889 14.904889 0 0 1 16.384-11.377778c35.726222 0 116.053333 62.919111 132.892444 62.919111a3.185778 3.185778 0 0 0 2.730667-1.251556c8.419556-13.539556 3.754667-22.755556-55.637333-59.050666S52.337778 694.044444 76.003556 667.875556a14.791111 14.791111 0 0 1 11.377777-4.323556c36.067556 0 121.287111 77.596444 121.287111 77.596444s22.755556 23.893333 36.977778 23.893334a8.419556 8.419556 0 0 0 7.736889-4.323556c9.784889-16.611556-91.704889-93.525333-97.393778-125.155555C152.120889 614.4 159.288889 603.022222 170.666667 603.022222z" fill="#FF9D0B" p-id="11978"></path><path d="M410.737778 883.939556c31.288889-45.511111 29.013333-80.440889-13.880889-123.335112a358.968889 358.968889 0 0 1-68.266667-105.699555s-9.329778-36.522667-30.606222-33.109333-36.864 57.799111 7.736889 91.022222-8.874667 55.978667-26.055111 24.689778S216.177778 625.777778 191.601778 610.417778s-41.301333-6.712889-35.612445 25.031111 107.292444 108.657778 97.393778 125.155555-44.714667-19.569778-44.714667-19.569777-108.885333-98.986667-132.664888-73.159111 18.090667 47.445333 77.482666 83.057777 64.056889 45.511111 55.637334 59.050667S69.404444 713.386667 56.888889 760.263111 191.032889 820.792889 182.044444 853.333333s-103.082667-61.44-122.197333-25.031111 132.551111 79.644444 133.802667 79.644445c49.038222 12.856889 173.511111 39.822222 217.088-24.007111z" fill="#FFD21E" p-id="11979"></path><path d="M852.195556 557.511111a59.278222 59.278222 0 0 1 46.648888 21.276445 67.356444 67.356444 0 0 1 15.132445 42.666666 83.626667 83.626667 0 0 1 22.755555-3.413333A60.302222 60.302222 0 0 1 980.650667 637.155556a66.332444 66.332444 0 0 1 18.090666 54.499555A65.422222 65.422222 0 0 1 989.866667 716.8a60.302222 60.302222 0 0 1 20.366222 32.085333 66.901333 66.901333 0 0 1-8.988445 53.816889c0.910222 1.365333 1.820444 2.958222 2.616889 4.437334a59.847111 59.847111 0 0 1 1.592889 52.679111c-11.377778 26.396444-40.732444 47.104-96.938666 69.518222-35.043556 13.767111-67.015111 22.755556-67.356445 22.755555A501.987556 501.987556 0 0 1 716.8 970.183111c-66.673778 0-113.777778-20.366222-141.767111-60.643555C530.659556 844.8 536.917333 785.066667 594.147556 728.177778a309.361778 309.361778 0 0 0 56.888888-88.405334c8.874667-30.264889 32.199111-63.943111 70.997334-63.943111a55.864889 55.864889 0 0 1 9.784889 0.796445 64.853333 64.853333 0 0 1 42.552889 27.079111 145.521778 145.521778 0 0 1 32.654222-31.857778A83.626667 83.626667 0 0 1 852.195556 557.511111z m0 45.511111a41.301333 41.301333 0 0 0-20.707556 7.395556C807.822222 625.777778 760.376889 706.332444 743.196444 737.621333a27.534222 27.534222 0 0 1-24.348444 14.904889c-17.521778 0-31.288889-17.408-1.592889-39.594666 44.487111-33.336889 28.899556-87.836444 7.623111-91.022223a11.377778 11.377778 0 0 0-2.730666 0c-19.342222 0-27.875556 33.336889-27.875556 33.336889a360.106667 360.106667 0 0 1-68.266667 105.699556c-43.008 42.894222-45.511111 77.368889-13.880889 123.335111 21.276444 31.288889 62.236444 40.732444 104.106667 40.732444a473.429333 473.429333 0 0 0 112.981333-16.611555c1.137778 0 153.031111-43.235556 133.802667-79.644445a15.928889 15.928889 0 0 0-15.246222-8.647111c-27.079111 0-76.344889 40.277333-97.507556 40.277334a8.647111 8.647111 0 0 1-9.443555-6.940445c-9.102222-32.312889 136.533333-45.511111 125.155555-92.842667a14.904889 14.904889 0 0 0-16.384-11.377777c-35.726222 0-116.053333 62.919111-132.892444 62.919111a2.844444 2.844444 0 0 1-2.616889-1.251556c-8.419556-13.539556-3.868444-22.755556 55.523556-59.050666s101.148444-57.799111 77.482666-83.968a14.677333 14.677333 0 0 0-11.377778-4.323556c-36.181333 0-121.400889 77.596444-121.400888 77.596444s-22.755556 23.893333-36.864 23.893334a8.419556 8.419556 0 0 1-7.736889-4.323556c-9.898667-16.611556 91.022222-93.525333 97.28-125.155555C870.968889 614.4 864.711111 603.022222 852.195556 603.022222z" fill="#FF9D0B" p-id="11980"></path><path d="M612.465778 883.939556c-31.288889-45.511111-29.127111-80.440889 13.880889-123.335112a360.106667 360.106667 0 0 0 68.266666-105.699555s9.329778-36.522667 30.606223-33.109333 36.864 57.799111-7.623112 91.022222 8.874667 55.978667 25.941334 24.689778S807.822222 625.777778 831.488 610.417778s41.415111-6.712889 35.612444 25.031111-107.178667 108.657778-97.28 125.155555 44.600889-19.569778 44.600889-19.569777 108.999111-99.100444 132.664889-73.272889-17.976889 47.445333-77.368889 83.399111-64.056889 45.511111-55.637333 59.050667 139.605333-96.938667 151.893333-50.062223-133.802667 60.529778-125.155555 92.842667 102.4-61.212444 122.197333-24.803556-132.551111 79.644444-133.802667 79.644445c-48.696889 12.970667-173.283556 39.936-216.746666-23.893333z" fill="#FFD21E" p-id="11981"></path></svg>
          <div class="pl5">huggingface</div>
        </div>
      </div>
      <!-- <div id="partnerCompany" class="f ac xc fs24r b pt20r pb20r">合作公司</div>
      <div class="f ac xc">
        <img v-lazyImg="damoyuan_logo" style="width:200px;" alt="">
        <img v-lazyImg="damoyuan_logo" style="width:200px;" alt="">
        <img v-lazyImg="damoyuan_logo" style="width:200px;" alt="">
      </div> -->
      <!--核心优势-->
      <div id="mainAdvance" class="f ac fs30r b pb10r" style="">核心优势</div>
      <div class="fs16r f ac mb40r" style="color:#4b5563;">六大技术优势，确保数据质量与算法效果</div>
      <div class="f ac xb rw auto mb50" style="gap: 20px 0px;">
        <div v-for="item in mainAdvantageList" :key="item.id" class="trans3 poi rds10 hoverShadow pl30r pr30r pt30r pb30r bgf borderBox" style="height:240px;width: clamp(290px, 32%, 500px)">
          <div class="rds5 f ac xc mb20r" :style="{width:'60px',height:'60px',background: item.background}">
            <atomSvg :type="item.svg" width="28" height="28" :color="item.svgColor"></atomSvg>
          </div>
          <div class="fs20 b mb20r">{{item.name}}</div>
          <div class="fs14">{{item.desc}}</div>
        </div>
        <div style="width: clamp(290px, 32%, 500px)"></div>
        <div style="width: clamp(290px, 32%, 500px)"></div>
        <div style="width: clamp(290px, 32%, 500px)"></div>
      </div>
      <!--完整数据模态-->
      <div id="dataModality" class="f ac fs30r b pb10r">完整数据模态</div>
      <div class="fs16r f ac mb30r" style="color:#4b5563">涵盖机器人感知、决策、执行的全链路多模态数据</div>
      <div class="f ac xb rw auto mb50" style="gap:20px;">
        <div v-for="item in dataModalList" :key="item.id" class="trans3 poi rds10 hoverShadow pl30r pr30r pt30r pb30r bgf borderBox" style="height:230px;width: clamp(240px, 22%, 360px)">
          <div class="f ac xc">
            <div class="rds50 f ac xc" :style="{width:'70px', height:'70px',background: item.background}">
              <atomSvg :type="item.svg" width="28" height="28" :color="item.svgColor"></atomSvg>
            </div>
          </div>
          <div class="fs18 b f ac xc mt10r mb10r">{{item.name}}</div>
          <div class="fs14 f ac xc mt10r mb10r g6">{{ item.desc }}</div>
          <div class="f xc ac g6">
            <div class="rds50 mr5" :style="{width:'14px',height:'14px',background: item.tipbg}"></div>
            <div>{{item.tip}}</div>
          </div>
        </div>
        <div style="width: clamp(290px, 23%, 360px)"></div>
        <div style="width: clamp(290px, 23%, 360px)"></div>
        <div style="width: clamp(290px, 23%, 360px)"></div>
      </div>
      <!--轮播视频-->
      <div id="video" class="f ac fs30r b pb10r">轮播视频</div>
      <div class="mb50">
        <video 
          src="@/assets/real_source_video.mp4" 
          class="rds10"
          controls 
          width="100%"
          muted
          autoplay
          loop
          preload="metadata"
        >
          您的浏览器不支持 video 标签
        </video>
      </div>
      <!--数据机器人采集平台-->
      <div id="robotPlatform" class="f ac fs30r b pb10r">数据机器人采集平台</div>
      <div class="fs16r dib mb30r poi hover1890ff g4b5563 borderBox" @click="goUrl('https://develop.realman-robotics.com/datatraining/guide/datacollectionrobot/')">
        <div class="f">
          <atomSvg type="tip" width="24" height="24" color="#1890ff"></atomSvg>
          先进的本体才能产生高质量的数据，专为数采而生的机器人
        </div>
      </div>
      <div class="trans3 rds10 fs16 borderBox mb50" >
        <div class="f xb" style="gap: 0 20px;">
          <div class="rds20" style="width:270px;background: linear-gradient(to bottom, #195DE3 0%, #A2BDEC 100%);">
            <div class="fs20 b mb5 gf f ac xc pt20">RS-01</div>
            <div class="fs20 b mb5 gf f ac xc mb30">轮式人形机器人</div>
            <img src="@/assets/RS01.png" style="width:192px;height:411px;margin-left:52px;" class="" alt="">
          </div>
          <div class="rds20" style="width:270px;background: linear-gradient(to bottom, #195DE3 0%, #A2BDEC 100%);">
            <div class="fs20 b mb5 gf f ac xc pt20">RS-01</div>
            <div class="fs20 b mb5 gf f ac xc mb30">轮式人形机器人</div>
            <img src="@/assets/RS02.png" style="width:192px;height:411px;margin-left:40px;" class="" alt="">
          </div>
          <div class="rds20" style="width:270px;background: linear-gradient(to bottom, #195DE3 0%, #A2BDEC 100%);">
            <div class="fs20 b mb5 gf f ac xc pt20">RS-01</div>
            <div class="fs20 b mb5 gf f ac xc mb30">轮式人形机器人</div>
            <img src="@/assets/RS03.png" style="width:192px;height:411px;margin-left:40px;" class="" alt="">
          </div>
          <div class="rds20 borderBox pt20 pb10 pl30 pr30 f1" style="background: linear-gradient(to bottom, #b6cdf4 0%, #f1f9ff 100%);;">
            <div class="g0 fs24 f ac xc pb10">高负载自重比-全球第一</div>
            <div class="g6 fs16 pb20" style="border-bottom:1px solid #fff;">负载自重比1:1.44；额定负载5kg；整机20个自由度（右臂=7，左臂=7，腰部=3，膝部=1，颈部=2）</div>
            <div class="g0 fs24 f ac xc pt10 pb10">多模态视觉感知</div>
            <div class="g6 fs16 pb20" style="border-bottom:1px solid #fff;">RGB、深度相机；支持硬同步</div>
            <div class="g0 fs24 f ac xc pt10 pb10">集成式六维力传感</div>
            <div class="g6 fs16 pb20" style="border-bottom:1px solid #fff;">集成六维力传感器，六维力量程：200N /7Nm，六维力精度：&lt;0.1% FS</div>
            <div class="g0 fs24 f ac xc pt10 pb10">泛化操作末端器</div>
            <div class="g6 fs16 pb20" style="border-bottom:1px solid #fff;">适应多种型号2指夹爪，3指夹爪，5指灵巧手</div>
            <div class="g0 fs24 f ac xc pt10 pb10">空间感知</div>
            <div class="g6 fs16 pb20" style="border-bottom:1px solid #fff;">深度智能相机，IMU+编码器;激光雷达、安全触边；超声波</div>
          </div>
        </div>
      </div>
      <!--遥操作-->
      <div id="remoteOperaction" class="f ac fs30r b mt50 pb10r">遥操作</div>
      <img src="@/assets/remote_operation.png" style="width:720px;height:405px;" class="db auto rds10" alt="" />
      <div class="fs16r f ac mb30r  mb40r" style="color:#4b5563">三大优势</div>
      <div class="f rw xb auto" style="gap:20px 0;">
        <div v-for="item in remoteAdvantageList" :key="item.id" class=" trans3 poi bgf ovh rds10 hoverShadow" style="height:190px;width: clamp(320px, 32%, 500px)">
          <div class="f ac pl20r pr30r pt15r pb15r" :style="{background: item.background}">
            <div class="rds50 mr10" :style="{width:'10px',height:'10px',background: item.dotBg}"></div>
            <div class="b fs16">{{ item.name }}</div>
          </div>
          <div class="pl30r pr30r pt30r pb30r">
            <div v-for="(desc, index) in item.descList" :key="index" class="rel dot mb10 fs14">{{ desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--回到顶部-->
  <el-backtop :right="100" :bottom="100" />
</template>
<script>
import f from "./index.js"
import atomSvg from "@/atomUI/atomSvg/index.vue"
import Column from "@/components/Column/index.vue"
export default {
  name: 'home',
  components: {
    atomSvg,
    Column
  },
  props: {
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css">
</style>