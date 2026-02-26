<template>
  <div class="page-bg">
    <div @click="toggleLanguage" class="abs zx100 poi" style="top:10px;right:10px;">
      <atomSvg :type="currentLocale" width="32" height="32" color="#ffffff"></atomSvg>
    </div>
    <div @click="" class="abs r0 b0 zx100" style="bottom:10px;right:10px;">
      <div class="f gf mb5 fs16">
        <div class="pr2 ">{{ $t('telephone') }}：</div>
        <div class="">400-898-2018</div>
      </div>
      <div class="f gf fs16">
        <div class="pr2">{{$t('email')}}：</div>
        <div class="">realsource@realman-robot.com</div>
      </div>
    </div>
    <!-- ==================== HERO ==================== -->
    <div class="hero-section rel f cn ac xc" style="min-height: 100vh;">
      <!-- Video frames mosaic background -->
      <!-- <div class="abs t0 l0 r0 f rw xb" style="gap:5px;">
        <img v-for="(url, index) in heroImages" :key="index" :src="url" style="width:clamp(170px,9vw,180px);height:clamp(100px,5.5vw,110px);" alt="" />
      </div> -->
      <div class="hero-mosaic abs" style="top:0;left:0;right:0;bottom:0;">
        <div
          v-for="(url, index) in heroImages" :key="index"
          class="mosaic-tile"
          :style="{ backgroundImage: `url(${url})` }"
        >
        </div>
      </div>
      <!-- Dark overlay + blur -->
      <div class="hero-overlay abs" style="top:0;left:0;right:0;bottom:0;"></div>
      <!-- Accent glow -->
      <div class="hero-glow abs"></div>
      <div class="rel f cn ac xc" style="z-index:2;">
        <img src="@/assets/logo.png" style="width:90px;height:90px;" class="mr20" alt="">
        <div class="hero-brand fs14 mb20">REALMAN ROBOTICS</div>
        <div class="hero-title b tc">Real Source Dataset</div>
        <div class="hero-subtitle tc mt30">
          {{$t('head_text') }}
        </div>

        <div class="hero-nav f ac rds30 mt60" :style="{width: currentLocale == 'zh' ? '900px' : '1400px'}">
          <div class="hero-nav-label f1 pt12 pb12 f ac xc">{{$t('quick_navigation')}}</div>
          <div
            v-for="item in routeList" :key="item.id"
            class="hero-nav-item f1 pt12 pb12 f ac xc poi rel"
            v-ripple="'rgba(255,255,255,0.1)'"
            @click="goCurId(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="scroll-hint abs f cn ac">
        <div class="scroll-hint-line"></div>
      </div>
    </div>

    <!-- ==================== CONTENT ==================== -->
    <div class="content-area auto">
      <!-- <div id="sourceAddress" class="section-title">{{$t('open_source_address')}}</div> -->
      <div id="sourceAddress" class="ds-section" style="padding-bottom:0;">
        <div class="section-header"
          v-intersect="{ handler: onSectionVisible, options: { threshold: 0.3 }, once: true }"
        >
          <div class="section-label">OPEN SOURCE ADDRESS</div>
          <div class="section-title">{{$t('open_source_address')}}</div>
        </div>
        <div class="f ac xs ">
          <div @click="goUrl('https://huggingface.co/datasets/RealSourceData/RealSource-World')" class="gf fs18 rds30 pl15 pr15 pt8 pb8 poi f ac" style="background:#262626;">
            <svg t="1763710691462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11973" width="20" height="20"><path d="M508.700444 881.777778A395.377778 395.377778 0 1 0 113.777778 486.4 395.377778 395.377778 0 0 0 508.700444 881.777778z" fill="#FFD21E" p-id="11974"></path><path d="M904.078222 486.4A395.377778 395.377778 0 1 0 508.700444 881.777778a395.377778 395.377778 0 0 0 395.377778-395.377778zM68.266667 486.4A440.888889 440.888889 0 1 1 508.700444 927.288889 440.888889 440.888889 0 0 1 68.266667 486.4z" fill="#FF9D0B" p-id="11975"></path><path d="M637.155556 378.766222c14.563556 5.12 20.252444 34.929778 34.929777 27.192889a56.888889 56.888889 0 1 0-76.913777-23.552c6.940444 13.084444 29.013333-8.192 41.984-3.640889zM369.208889 378.766222c-14.563556 5.12-20.366222 34.929778-34.929778 27.192889a56.888889 56.888889 0 1 1 76.913778-23.552c-6.940444 13.084444-29.127111-8.192-41.984-3.640889zM505.856 651.832889c111.843556 0 147.911111-99.669333 147.911111-150.869333 0-26.624-17.863111-18.318222-46.535111-4.096-26.510222 13.084444-62.122667 31.175111-101.376 31.175111-81.692444 0-147.911111-78.279111-147.911111-27.079111s36.067556 150.869333 147.911111 150.869333z" fill="#3A3B45" p-id="11976"></path><path d="M508.700444 768a98.759111 98.759111 0 0 0 34.133334-191.260444l-4.096-1.479112c-9.557333-2.958222-19.683556 29.582222-30.151111 29.582223s-19.342222-32.768-28.103111-30.151111a98.759111 98.759111 0 0 0 28.216888 193.422222z" fill="#F94040" p-id="11977"></path><path d="M776.078222 432.355556A36.977778 36.977778 0 1 0 739.555556 395.377778 36.977778 36.977778 0 0 0 776.078222 432.355556zM247.011556 432.355556a36.977778 36.977778 0 1 0-36.977778-36.977778A36.977778 36.977778 0 0 0 247.011556 432.355556zM170.666667 557.511111a59.392 59.392 0 0 0-45.511111 21.276445 67.356444 67.356444 0 0 0-15.132445 42.666666 82.830222 82.830222 0 0 0-22.072889-3.413333A60.302222 60.302222 0 0 0 42.552889 637.155556a65.991111 65.991111 0 0 0-18.090667 54.499555A63.488 63.488 0 0 0 33.450667 716.8a61.667556 61.667556 0 0 0-20.366223 32.085333 66.901333 66.901333 0 0 0 8.988445 53.930667c-0.910222 1.365333-1.706667 2.958222-2.503111 4.437333a59.164444 59.164444 0 0 0-1.592889 52.679111c11.377778 26.396444 40.618667 47.104 96.938667 69.518223 34.929778 13.767111 67.015111 22.755556 67.242666 22.755555a501.987556 501.987556 0 0 0 124.359111 18.090667c66.673778 0 114.346667-20.366222 141.767111-60.643556C492.430222 844.8 486.172444 785.066667 429.056 728.177778a313.230222 313.230222 0 0 1-56.888889-88.405334c-8.760889-30.264889-32.199111-63.943111-70.997333-63.943111a57.685333 57.685333 0 0 0-9.784889 0.796445 64.625778 64.625778 0 0 0-42.439111 27.079111A150.414222 150.414222 0 0 0 216.177778 572.074667 84.309333 84.309333 0 0 0 170.666667 557.511111z m0 45.511111a40.96 40.96 0 0 1 20.707555 7.395556C216.177778 625.777778 262.712889 706.332444 279.893333 737.621333a27.648 27.648 0 0 0 24.348445 14.904889c17.635556 0 31.288889-17.408 1.706666-39.594666-44.600889-33.336889-29.013333-87.836444-7.736888-91.022223a11.377778 11.377778 0 0 1 2.730666 0c19.342222 0 27.875556 33.336889 27.875556 33.336889a358.968889 358.968889 0 0 0 68.266666 105.699556c42.894222 42.894222 45.511111 77.368889 13.880889 123.335111-21.390222 31.288889-62.236444 40.732444-104.220444 40.732444A472.291556 472.291556 0 0 1 193.422222 908.060444c-1.251556 0-153.031111-43.235556-133.802666-79.644444a15.815111 15.815111 0 0 1 15.246222-8.647111c27.079111 0 76.344889 40.277333 97.507555 40.277333A8.760889 8.760889 0 0 0 182.044444 853.333333c8.988444-32.312889-137.216-45.511111-125.155555-92.842666a14.904889 14.904889 0 0 1 16.384-11.377778c35.726222 0 116.053333 62.919111 132.892444 62.919111a3.185778 3.185778 0 0 0 2.730667-1.251556c8.419556-13.539556 3.754667-22.755556-55.637333-59.050666S52.337778 694.044444 76.003556 667.875556a14.791111 14.791111 0 0 1 11.377777-4.323556c36.067556 0 121.287111 77.596444 121.287111 77.596444s22.755556 23.893333 36.977778 23.893334a8.419556 8.419556 0 0 0 7.736889-4.323556c9.784889-16.611556-91.704889-93.525333-97.393778-125.155555C152.120889 614.4 159.288889 603.022222 170.666667 603.022222z" fill="#FF9D0B" p-id="11978"></path><path d="M410.737778 883.939556c31.288889-45.511111 29.013333-80.440889-13.880889-123.335112a358.968889 358.968889 0 0 1-68.266667-105.699555s-9.329778-36.522667-30.606222-33.109333-36.864 57.799111 7.736889 91.022222-8.874667 55.978667-26.055111 24.689778S216.177778 625.777778 191.601778 610.417778s-41.301333-6.712889-35.612445 25.031111 107.292444 108.657778 97.393778 125.155555-44.714667-19.569778-44.714667-19.569777-108.885333-98.986667-132.664888-73.159111 18.090667 47.445333 77.482666 83.057777 64.056889 45.511111 55.637334 59.050667S69.404444 713.386667 56.888889 760.263111 191.032889 820.792889 182.044444 853.333333s-103.082667-61.44-122.197333-25.031111 132.551111 79.644444 133.802667 79.644445c49.038222 12.856889 173.511111 39.822222 217.088-24.007111z" fill="#FFD21E" p-id="11979"></path><path d="M852.195556 557.511111a59.278222 59.278222 0 0 1 46.648888 21.276445 67.356444 67.356444 0 0 1 15.132445 42.666666 83.626667 83.626667 0 0 1 22.755555-3.413333A60.302222 60.302222 0 0 1 980.650667 637.155556a66.332444 66.332444 0 0 1 18.090666 54.499555A65.422222 65.422222 0 0 1 989.866667 716.8a60.302222 60.302222 0 0 1 20.366222 32.085333 66.901333 66.901333 0 0 1-8.988445 53.816889c0.910222 1.365333 1.820444 2.958222 2.616889 4.437334a59.847111 59.847111 0 0 1 1.592889 52.679111c-11.377778 26.396444-40.732444 47.104-96.938666 69.518222-35.043556 13.767111-67.015111 22.755556-67.356445 22.755555A501.987556 501.987556 0 0 1 716.8 970.183111c-66.673778 0-113.777778-20.366222-141.767111-60.643555C530.659556 844.8 536.917333 785.066667 594.147556 728.177778a309.361778 309.361778 0 0 0 56.888888-88.405334c8.874667-30.264889 32.199111-63.943111 70.997334-63.943111a55.864889 55.864889 0 0 1 9.784889 0.796445 64.853333 64.853333 0 0 1 42.552889 27.079111 145.521778 145.521778 0 0 1 32.654222-31.857778A83.626667 83.626667 0 0 1 852.195556 557.511111z m0 45.511111a41.301333 41.301333 0 0 0-20.707556 7.395556C807.822222 625.777778 760.376889 706.332444 743.196444 737.621333a27.534222 27.534222 0 0 1-24.348444 14.904889c-17.521778 0-31.288889-17.408-1.592889-39.594666 44.487111-33.336889 28.899556-87.836444 7.623111-91.022223a11.377778 11.377778 0 0 0-2.730666 0c-19.342222 0-27.875556 33.336889-27.875556 33.336889a360.106667 360.106667 0 0 1-68.266667 105.699556c-43.008 42.894222-45.511111 77.368889-13.880889 123.335111 21.276444 31.288889 62.236444 40.732444 104.106667 40.732444a473.429333 473.429333 0 0 0 112.981333-16.611555c1.137778 0 153.031111-43.235556 133.802667-79.644445a15.928889 15.928889 0 0 0-15.246222-8.647111c-27.079111 0-76.344889 40.277333-97.507556 40.277334a8.647111 8.647111 0 0 1-9.443555-6.940445c-9.102222-32.312889 136.533333-45.511111 125.155555-92.842667a14.904889 14.904889 0 0 0-16.384-11.377777c-35.726222 0-116.053333 62.919111-132.892444 62.919111a2.844444 2.844444 0 0 1-2.616889-1.251556c-8.419556-13.539556-3.868444-22.755556 55.523556-59.050666s101.148444-57.799111 77.482666-83.968a14.677333 14.677333 0 0 0-11.377778-4.323556c-36.181333 0-121.400889 77.596444-121.400888 77.596444s-22.755556 23.893333-36.864 23.893334a8.419556 8.419556 0 0 1-7.736889-4.323556c-9.898667-16.611556 91.022222-93.525333 97.28-125.155555C870.968889 614.4 864.711111 603.022222 852.195556 603.022222z" fill="#FF9D0B" p-id="11980"></path><path d="M612.465778 883.939556c-31.288889-45.511111-29.127111-80.440889 13.880889-123.335112a360.106667 360.106667 0 0 0 68.266666-105.699555s9.329778-36.522667 30.606223-33.109333 36.864 57.799111-7.623112 91.022222 8.874667 55.978667 25.941334 24.689778S807.822222 625.777778 831.488 610.417778s41.415111-6.712889 35.612444 25.031111-107.178667 108.657778-97.28 125.155555 44.600889-19.569778 44.600889-19.569777 108.999111-99.100444 132.664889-73.272889-17.976889 47.445333-77.368889 83.399111-64.056889 45.511111-55.637333 59.050667 139.605333-96.938667 151.893333-50.062223-133.802667 60.529778-125.155555 92.842667 102.4-61.212444 122.197333-24.803556-132.551111 79.644444-133.802667 79.644445c-48.696889 12.970667-173.283556 39.936-216.746666-23.893333z" fill="#FFD21E" p-id="11981"></path></svg>
            <div class="pl5">huggingface</div>
          </div>
        </div>
      </div>
      <!-- ========== Core Advantages ========== -->
      <div id="mainAdvance" class="ds-section">
        <div class="section-header"
          v-intersect="{ handler: onSectionVisible, options: { threshold: 0.3 }, once: true }"
        >
          <div class="section-label">CORE ADVANTAGES</div>
          <div class="section-title">{{$t('core_strengths')}}</div>
          <div class="section-desc">{{ $t('core_strengths_desc') }}</div>
        </div>
        <div class="advantage-grid">
          <div
            v-for="(item, index) in mainAdvantageList" :key="item.id"
            class="advantage-card poi borderBox"
            v-intersect="{ handler: onCardVisible, options: { threshold: 0.15 }, once: true }"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <div class="advantage-icon f ac xc mb20" :style="{ background: item.background }">
              <atomSvg :type="item.svg" width="24" height="24" :color="item.svgColor"></atomSvg>
            </div>
            <div class="fs18 b mb12" style="color: var(--ds-text-primary);">{{ item.name }}</div>
            <div class="fs14" style="color: var(--ds-text-secondary); line-height: 1.6;">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <!-- ========== Data Modality ========== -->
      <div id="dataModality" class="ds-section" style="">
        <div class="section-header"
          v-intersect="{ handler: onSectionVisible, options: { threshold: 0.3 }, once: true }"
        >
          <div class="section-label">DATA MODALITY</div>
          <div class="section-title">{{$t('all_data_modality')}}</div>
          <div class="section-desc">{{$t('all_data_modality_desc')}}</div>
        </div>
        <div class="modality-grid">
          <div
            v-for="(item, index) in dataModalList" :key="item.id"
            class="modality-card poi borderBox"
            v-intersect="{ handler: onCardVisible, options: { threshold: 0.15 }, once: true }"
            :style="{ transitionDelay: `${index * 60}ms` }"
          >
            <div class="f ac xc">
              <div class="rds50 f ac xc" :style="{ width: '56px', height: '56px', background: item.background }">
                <atomSvg :type="item.svg" width="24" height="24" :color="item.svgColor"></atomSvg>
              </div>
            </div>
            <div class="fs16 b mt15 mb8" style="color: var(--ds-text-primary);">{{ item.name }}</div>
            <div class="fs13 mb12" style="color: var(--ds-text-tertiary); line-height: 1.5;">{{ item.desc }}</div>
            <div class="f ac xc">
              <div class="modality-badge">{{ item.tip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== Video Section (full-bleed dark) ========== -->
    <div id="video" class="video-section"
      v-intersect="{ handler: onSectionVisible, options: { threshold: 0.2 }, once: true }"
    >
      <div class="video-inner">
        <!-- <div id="video" class="section-header section-visible">
          <div class="section-label">VIDEO SHOWCASE</div>
          <div class="section-title">{{$t('carousel_video')}}</div>
        </div> -->
        <div class="video-placeholder f ac xc">
          <!-- <div style="color: var(--ds-gray-500); font-size: 16px;">视频内容区域</div> -->
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
      </div>
    </div>

    <!-- ==================== CONTENT (continued) ==================== -->
    <div class="content-area auto">

      <!-- ========== Robot Platform ========== -->
      <div id="robotPlatform" class="ds-section">
        <div class="section-header"
          v-intersect="{ handler: onSectionVisible, options: { threshold: 0.3 }, once: true }"
        >
          <div class="section-label">COLLECTION PLATFORM</div>
          <div class="section-title">{{$t('data_robot_collection_platform')}}</div>
        </div>
        <div class="platform-section"
          v-intersect="{ handler: onCardVisible, options: { threshold: 0.15 }, once: true }"
          style="transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease;"
        >
          <div style="flex: 1; min-width: 0;">
            <div class="specs-grid">
              <div class="spec-item" v-for="spec in robotSpecs" :key="spec.label">
                <div class="spec-label">{{ spec.label }}</div>
                <div class="spec-value">{{ spec.value }}</div>
              </div>
            </div>
          </div>
          <div class="f ac xc" style="flex: 1; min-width: 0;">
            <img v-lazyImg="robotParams" class="platform-img db" alt="Robot Platform">
          </div>
        </div>
      </div>

      <!-- ========== Remote Operation ========== -->
      <div id="remoteOperaction" class="ds-section" style="padding-top: 0;">
        <div class="section-header"
          v-intersect="{ handler: onSectionVisible, options: { threshold: 0.3 }, once: true }"
        >
          <div class="section-label">REMOTE OPERATION</div>
          <div class="section-title">{{ $t('Teleoperation') }}</div>
          <div class="section-desc">{{ $t('three_major_advantages') }}</div>
        </div>
        <div class="remote-grid">
          <div
            v-for="(item, index) in remoteAdvantageList" :key="item.id"
            class="remote-card borderBox"
            v-intersect="{ handler: onCardVisible, options: { threshold: 0.15 }, once: true }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="remote-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="fs18 b mb16" style="color: var(--ds-text-primary);">{{ item.name }}</div>
            <div>
              <div v-for="(desc, di) in item.descList" :key="di" class="remote-desc-item">{{ desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to top -->
    <div class="backtop-wrap">
      <el-backtop :right="60" :bottom="60" />
    </div>
  </div>
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
