import { onMounted, ref, nextTick } from 'vue'
import damoyuan_logo from "@/assets/damoyuan_logo.webp"
import robotParams from "@/assets/robotParams.png"
export default function (props, emit) {
  const routeList = ref([
    // {id: _.guID(), name:'合作公司', id:'partnerCompany'},
    {id: _.guID(), name:'核心优势', id:'mainAdvance'},
    {id: _.guID(), name:'完整数据模态', id:'dataModality'},
    {id: _.guID(), name:'轮播视频', id:'video'},
    {id: _.guID(), name:'数据机器人采集平台', id:'robotPlatform'},
    {id: _.guID(), name:'遥操作', id:'remoteOperaction'},
  ])
  // 数据模态
  const dataModalList = ref([
    {id: _.guID(), background: '#dbeafe', svg: 'image', svgColor:'#2563eb', name:'图像数据', desc: 'RGB图像、深度图像、多视角视觉信息', tipbg: '#3b82f6', tip:'视觉感知'},
    {id: _.guID(), background: '#dcfce7', svg: 'set',  svgColor:'#16a34a', name:'关节位置', desc: '所有关节的实时角度、位置信息', tipbg: '#8b5cf6', tip:'位置状态'},
    {id: _.guID(), background: '#fef9e3', svg: 'speed', svgColor:'#ca8a04', name:'关节速度', desc: '关节运动的速度和加速度数据', tipbg: '#f59e08', tip:'运动控制'},
    {id: _.guID(), background: '#fee2e2', svg: 'strong', svgColor:'#dc2626', name:'末端六维力', desc: '三维力 + 三维力矩的完整力觉信息', tipbg: '#ef4444', tip:'力觉感知'},
    {id: _.guID(), background: '#f3e8ff', svg: 'adjust', svgColor:'#9333ea', name:'末端位姿', desc: '末端执行器的三维位置和姿态', tipbg: '#8b5cf6', tip:'空间定位'},
    {id: _.guID(), background: '#ffedd5', svg: 'robot', svgColor:'#ea580c', name:'动作指令', desc: '人类操作员的动作决策指令', tipbg: '#f97316', tip:'决策数据'},
    {id: _.guID(), background: '#ecfccb', svg: 'time',  svgColor:'#65a30d', name:'时间戳', desc: '精确到纳秒级的时间同步信息', tipbg: '#84cc16', tip:'时间同步'},
    {id: _.guID(), background: '#cffafe', svg: 'camera', svgColor:'#0891b2', name:'相机参数', desc: '内外参矩阵、畸变系数等标定参数', tipbg: '#3b82f6', tip:'视觉标定'},
  ])
  // 核心优势列表
  const mainAdvantageList = ref([
    {id: _.guID(), background: '#DCFCE7', svg: 'time', svgColor:'#2563eb', name:'时空硬同步技术', desc: '所有视觉传感器通过硬件级方式进行精确的时间硬同步和打戳， 确保跨模态数据的一致性和准确性。'},
    {id: _.guID(), background: '#DCFCE7', svg: 'fps', svgColor:'#16A34A', name:'超低丢帧率', desc: '遵循低于0.5%的超低丢帧率标准，通过优化的数据传输和处理流水线， 确保数据流的完整性与连续性。'},
    {id: _.guID(), background: '#F3E8FF', svg: 'adjust', svgColor:'#9333EA', name:'高精度运动控制', desc: '高频率采样记录关节角度、速度、加速度等状态数据， 支持实时高精度关节速度控制，动作平滑精准。'},
    {id: _.guID(), background: '#FEE2E2', svg: 'highPrecision', svgColor:'#DC2626', name:'出厂级高精度标定', desc: '每台机器人和传感器都经过严格的出厂标定，提供完整的相机标定参数， 用户无需额外标定即可使用。'},
    {id: _.guID(), background: '#FEF9C3', svg: 'generalization', svgColor:'#CA8A04', name:'深度泛化数据采集', desc: '针对同一任务在多样化变量下执行大量演示，包括物体属性、环境上下文、 动作轨迹和视角的泛化。'},
    {id: _.guID(), background: '#E0E7FF', svg: 'romoteRobot', svgColor:'#2563eb', name:'外骨骼遥操作优势', desc: '采用外骨骼式高精度遥操作设备，1:1高度还原人类操作员的全身运动意图与决策过程， 记录专家级操作轨迹。'},
  ])
  // 遥操作优势列表
  const remoteAdvantageList = ref([
    {id: _.guID(), background: '#EFF6FF', dotBg: '#3B82F6', name:'映射关系直接，无需复杂解算', descList: ['同构设计使主从机械臂和夹爪结构完全相同，可以直接将主臂关节角度映射到从臂，无需逆向运动学(IK)求解这避免了IK计算带来的误差和延迟，实现更快、更准确的遥操作。']},
    {id: _.guID(), background: '#FAF5FF', dotBg: '#8B5CF6', name:'计算效率高，实时性强', descList: ['简化了运动学和动力学计算，提高控制系统运算效率。', '无需SoC等高性能计算单元即可达到高响应频率，系统延迟可控制在 10ms 以内。']},
    {id: _.guID(), background: '#F0FDFA', dotBg: '#06B6D4', name:'操作直观，学习成本低', descList: ['操作者动作与机器人动作完全一致，增强使用者操作的直观性，降低培训成本']},
  ])
  const language = ref('chinese')
  function goCurId(id){
    nextTick(() => {
      const el = _.getDom(id)
      if(el) el.scrollIntoView({ behavior: 'smooth'})
    })
  }
  onMounted(() => {
    
  })
  return {
    routeList, dataModalList, mainAdvantageList, remoteAdvantageList, language,
    damoyuan_logo, robotParams,
    emit, goCurId,
  }
}