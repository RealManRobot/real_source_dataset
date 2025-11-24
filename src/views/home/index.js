import { onMounted, ref, nextTick } from 'vue'
import damoyuan_logo from "@/assets/damoyuan_logo.webp"
import robotParams from "@/assets/robotParams.png"
import {setLocale, currentLocale} from "@/i18n/index.js"
import { t } from "@/i18n/index.js" // i18n 国际化
export default function (props, emit) {
  const routeList = ref([
    // {id: _.guID(), name:'合作公司', id:'partnerCompany'},
    {id: _.guID(), name: t('open_source_address'), id:'sourceAddress'},
    {id: _.guID(), name: t('core_strengths'), id:'mainAdvance'},
    {id: _.guID(), name: t('all_data_modality'), id:'dataModality'},
    // {id: _.guID(), name: t('carousel_video'), id:'video'},
    {id: _.guID(), name: t('data_robot_collection_platform'), id:'robotPlatform'},
    {id: _.guID(), name: t('Teleoperation'), id:'remoteOperaction'},
  ])
  // 核心优势列表
  const mainAdvantageList = ref([
    {id: _.guID(), background: '#DCFCE7', svg: 'time', svgColor:'#2563eb', name: t('space_time_hard'), desc: t('space_time_hard_desc')},
    {id: _.guID(), background: '#DCFCE7', svg: 'fps', svgColor:'#16A34A', name:t('ultra_low_frame'), desc: t('ultra_low_frame_desc')},
    {id: _.guID(), background: '#F3E8FF', svg: 'adjust', svgColor:'#9333EA', name: t('high_precision_motion_control'), desc: t('high_precision_motion_control_desc')},
    {id: _.guID(), background: '#FEE2E2', svg: 'highPrecision', svgColor:'#DC2626', name: t('factory_level_high_precision_calibration'), desc: t('factory_level_high_precision_calibration_desc')},
    {id: _.guID(), background: '#FEF9C3', svg: 'generalization', svgColor:'#CA8A04', name: t('deep_generalization_data_collection'), desc: t('deep_generalization_data_collection_desc')},
    {id: _.guID(), background: '#E0E7FF', svg: 'romoteRobot', svgColor:'#2563eb', name: t('advantages_of_exoskeleton_teleoperation'), desc: t('advantages_of_exoskeleton_teleoperation_desc')},
  ])
  // 数据模态
  const dataModalList = ref([
    {id: _.guID(), background: '#dbeafe', svg: 'image', svgColor:'#2563eb', name: t('image_data'), desc: t('image_data_desc'), tipbg: '#3b82f6', tip: t('image_data_tip')},
    {id: _.guID(), background: '#dcfce7', svg: 'set',  svgColor:'#16a34a', name: t('joint_position'), desc: t('joint_position_desc'), tipbg: '#8b5cf6', tip: t('joint_position_tip')},
    {id: _.guID(), background: '#fef9e3', svg: 'speed', svgColor:'#ca8a04', name: t('joint_speed'), desc: t('joint_speed_desc'), tipbg: '#f59e08', tip:t('joint_speed_tip')},
    {id: _.guID(), background: '#fee2e2', svg: 'strong', svgColor:'#dc2626', name: t('six_axis_force_at_the_end'), desc: t('six_axis_force_at_the_end_desc'), tipbg: '#ef4444', tip: t('six_axis_force_at_the_end_tip')},
    {id: _.guID(), background: '#f3e8ff', svg: 'adjust', svgColor:'#9333ea', name: t('end_effector_pose'), desc: t('end_effector_pose_desc'), tipbg: '#8b5cf6', tip:t('end_effector_pose_tip')},
    {id: _.guID(), background: '#ffedd5', svg: 'robot', svgColor:'#ea580c', name:t('action_command'), desc: t('action_command_desc'), tipbg: '#f97316', tip: t('action_command_tip')},
    {id: _.guID(), background: '#ecfccb', svg: 'time',  svgColor:'#65a30d', name: t('timestamp'), desc: t('timestamp_desc'), tipbg: '#84cc16', tip:t('timestamp_tip')},
    {id: _.guID(), background: '#cffafe', svg: 'camera', svgColor:'#0891b2', name: t('camera_parameters'), desc: t('camera_parameters_desc'), tipbg: '#3b82f6', tip: t('camera_parameters_tip')},
  ])
 
  // 遥操作优势列表
  const remoteAdvantageList = ref([
    {id: _.guID(), background: '#EFF6FF', dotBg: '#3B82F6', name: t('remote_title1'), descList: [t('remote_desc1')]},
    {id: _.guID(), background: '#FAF5FF', dotBg: '#8B5CF6', name: t('remote_title2'), descList: [t('remote_desc2')]},
    {id: _.guID(), background: '#F0FDFA', dotBg: '#06B6D4', name: t('remote_title3'), descList: [t('remote_desc3')]},
  ])
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
    routeList, dataModalList, mainAdvantageList, remoteAdvantageList, currentLocale,
    damoyuan_logo, robotParams,
    emit, goCurId, toggleLanguage, goUrl
  }
}