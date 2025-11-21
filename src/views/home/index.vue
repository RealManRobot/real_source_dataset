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
    </div>
    <!--下面-->
    <div class="w80 auto pt50r">
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
      <div class="bdc rds10 mb50" style="width:600px;height:300px;">1</div>
      
      <!--数据机器人采集平台-->
      <div id="robotPlatform" class="f ac fs30r b pb10r">数据机器人采集平台</div>
      <div class="fs16r dib mb30r poi hover1890ff g4b5563 borderBox" @click="goUrl">
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
      <div id="remoteOperaction" class="f ac fs30r b pb10r">遥操作</div>
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