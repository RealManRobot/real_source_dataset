import { onMounted, ref, nextTick } from 'vue'
import damoyuan_logo from "@/assets/damoyuan_logo.webp"
import robotParams from "@/assets/robotParams.png"

// 使用 import.meta.glob 让 Vite 正确打包 assets 下的 1-30.jpg
const heroImages = Object.entries(
  import.meta.glob('@/assets/*.jpg', { eager: true, query: '?url', import: 'default' })
)
  .filter(([path]) => /\/\d+\.jpg$/.test(path))
  .sort(([a], [b]) => {
    const na = parseInt(a.match(/(\d+)\.jpg$/)?.[1] || '0', 10)
    const nb = parseInt(b.match(/(\d+)\.jpg$/)?.[1] || '0', 10)
    return na - nb
  })
  .map(([, url]) => url)
import {setLocale, currentLocale} from "@/i18n/index.js"
import { t } from "@/i18n/index.js" // i18n 国际化

const ACCENT = '#2563eb'
const ACCENT_SOFT = 'rgba(37, 99, 235, 0.08)'

// Hero mosaic: simulated embodied-data video frames
// Replace `bg` with real dataset thumbnail URLs: `background: url(...)` for production
const FRAME_PALETTES = [
  // Robot arm operation scenes (cool industrial tones)
  'linear-gradient(135deg, #1a2332 0%, #2a3f5f 50%, #1e3a5f 100%)',
  'linear-gradient(135deg, #0f1923 0%, #1a3044 50%, #243b53 100%)',
  'linear-gradient(135deg, #1c2e4a 0%, #16344a 50%, #0d2137 100%)',
  'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e3a5f 100%)',
  // Depth camera views (blue-green tints)
  'linear-gradient(135deg, #0a2e38 0%, #134e5e 50%, #0d3b4a 100%)',
  'linear-gradient(135deg, #0c2d3e 0%, #1a4a5a 50%, #0b3545 100%)',
  'linear-gradient(135deg, #0e3344 0%, #175060 50%, #0a2836 100%)',
  // Force sensor heatmaps (warm dark tones)
  'linear-gradient(135deg, #2d1b2e 0%, #3d2344 50%, #2a1a30 100%)',
  'linear-gradient(135deg, #1f1a2e 0%, #2d2445 50%, #1a1530 100%)',
  // Gripper close-ups (neutral darks)
  'linear-gradient(135deg, #1a1a2e 0%, #252540 50%, #1e1e35 100%)',
  'linear-gradient(135deg, #1c1c28 0%, #28283c 50%, #202030 100%)',
  'linear-gradient(135deg, #222230 0%, #2e2e42 50%, #1a1a28 100%)',
  // Joint trajectory visualizations (accent hints)
  'linear-gradient(135deg, #0d1b2a 0%, #1b2d4a 50%, #152238 100%)',
  'linear-gradient(135deg, #0f1e30 0%, #1d3352 50%, #122640 100%)',
  // Environment overview (wide angle, lighter darks)
  'linear-gradient(135deg, #1e2530 0%, #2a3340 50%, #1a2028 100%)',
  'linear-gradient(135deg, #20272e 0%, #2c353e 50%, #1c2228 100%)',
]

function generateHeroFrames(count = 40) {
  const frames = []
  for (let i = 0; i < count; i++) {
    frames.push({
      id: _.guID(),
      bg: FRAME_PALETTES[i % FRAME_PALETTES.length],
      opacity: 0.5 + Math.random() * 0.5, // 0.5 ~ 1.0
    })
  }
  return frames
}

export default function (props, emit) {
  const heroFrames = ref(generateHeroFrames(40))
  const routeList = ref([
    {id: _.guID(), name: t('open_source_address'), id:'sourceAddress'},
    {id: _.guID(), name: t('core_strengths'), id:'mainAdvance'},
    {id: _.guID(), name: t('all_data_modality'), id:'dataModality'},
    {id: _.guID(), name: t('carousel_video'), id:'video'},
    {id: _.guID(), name: t('data_robot_collection_platform'), id:'robotPlatform'},
    {id: _.guID(), name: t('Teleoperation'), id:'remoteOperaction'},
  ])

  // 数据模态
  const dataModalList = ref([
    {id: _.guID(), background: ACCENT_SOFT, svg: 'image',  svgColor: ACCENT, name: t('image_data'),   desc: t('image_data_desc'),       tip: t('image_data_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'set',    svgColor: ACCENT, name: t('joint_position'),   desc: t('joint_position_desc'),            tip: t('joint_position_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'speed',  svgColor: ACCENT, name: t('joint_speed'),   desc: t('joint_speed_desc'),             tip: t('joint_speed_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'strong', svgColor: ACCENT, name: t('six_axis_force_at_the_end'), desc: t('six_axis_force_at_the_end_desc'),        tip: t('six_axis_force_at_the_end_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'adjust', svgColor: ACCENT, name: t('end_effector_pose'),   desc: t('end_effector_pose_desc'),             tip: t('end_effector_pose_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'robot',  svgColor: ACCENT, name: t('action_command'),   desc: t('action_command_desc'),               tip: t('action_command_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'time',   svgColor: ACCENT, name: t('timestamp'),     desc: t('timestamp_desc'),             tip: t('timestamp_tip')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'camera', svgColor: ACCENT, name: t('camera_parameters'),   desc: t('camera_parameters_desc'),          tip: t('camera_parameters_tip')},
  ])

  // 核心优势列表
  const mainAdvantageList = ref([
    {id: _.guID(), background: ACCENT_SOFT, svg: 'time',           svgColor: ACCENT, name: t('space_time_hard'),  desc: t('space_time_hard_desc')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'fps',            svgColor: ACCENT, name: t('ultra_low_frame'),      desc: t('ultra_low_frame_desc')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'adjust',         svgColor: ACCENT, name: t('high_precision_motion_control'),  desc: t('high_precision_motion_control_desc')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'highPrecision',  svgColor: ACCENT, name: t('factory_level_high_precision_calibration'), desc: t('factory_level_high_precision_calibration_desc')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'generalization', svgColor: ACCENT, name: t('deep_generalization_data_collection'), desc: t('deep_generalization_data_collection_desc')},
    {id: _.guID(), background: ACCENT_SOFT, svg: 'romoteRobot',    svgColor: ACCENT, name: t('advantages_of_exoskeleton_teleoperation'), desc: t('advantages_of_exoskeleton_teleoperation_desc')},
  ])

  // 遥操作优势列表
  const remoteAdvantageList = ref([
    {id: _.guID(), name: t('remote_title1'), descList: [t('remote_desc1')]},
    {id: _.guID(), name: t('remote_title2'), descList: [t('remote_desc2')]},
    {id: _.guID(), name: t('remote_title3'), descList: [t('remote_desc3')]},
  ])

  // 机器人平台参数
  const robotSpecs = ref([
    { label: t('freedom_degree'),          value: '21个' },
    { label: t('work_range'),        value: `${currentLocale.value == 'zh' ? '上下' : 'up and down'} 2000mm / ${currentLocale.value == 'zh' ? '左右' : 'left and right'} 1900mm / ${currentLocale.value == 'zh' ? '向前' : 'forward'} 600mm` },
    { label: t('weight'),            value: '90kg' },
    { label: t('max_single_arm_load'),    value: '9KG' },
    { label: t('perception_range'),        value: '360°' },
    { label: t('arm_freedom_degree'),      value: '7个' },
    { label: t('single_arm_range'),        value: '610mm' },
    { label: t('arm_repeat_position_accuracy'), value: '±0.05mm' },
    { label: t('work_duration'),        value: '6H' },
    { label: t('overcoming_obstacle_ability'),        value: '30mm' },
  ])

  // Scroll reveal handlers
  function onSectionVisible(entry) {
    entry.target.classList.add('section-visible')
  }
  function onCardVisible(entry) {
    entry.target.classList.add('card-visible')
  }

  function goCurId(id){
    nextTick(() => {
      const el = _.getDom(id)
      if(el) el.scrollIntoView({ behavior: 'smooth'})
    })
  }
  function toggleLanguage(){
    if(currentLocale.value == 'zh') {
      setLocale('en')
    } else {
      setLocale('zh')
    }
  }
  function goUrl(url, target = '_blank'){
    window.open(url, target);
  }
  onMounted(() => {
    
  })
  return {
    heroFrames,
    heroImages,
    routeList, dataModalList, mainAdvantageList, remoteAdvantageList, currentLocale,
    robotSpecs,
    damoyuan_logo, robotParams,
    emit, goCurId,
    onSectionVisible, onCardVisible, toggleLanguage, goUrl,
  }
}
