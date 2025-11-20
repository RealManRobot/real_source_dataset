/**
<Calendar :date="date" @setDate="e => date = e"></Calendar>
const date = ref('2025-11-11')
 */
import { ref, watch } from "vue"
import { addZero, getDays, socketTime, addDays, guID } from "@/common.js"
export default function (props, emit) {
  const dateListPrev = ref([]) // 前一个月的日期数组
  const dateList = ref([]) // 当前传入日期所在月的日期数组
  const dateListNext = ref([]) // 后一个月的日期数组
  const init_year = ref(0) // 传入的初始年
  const init_month = ref(0) // 传入的初始月
  const init_day = ref(0) // 传入的初始日
  const year = ref(0) // 当前切换到哪一个年
  const month = ref(0) // 当前切换到哪一个月
  const startX = ref(0) // 开始X位置
  const startY = ref(0) // 开始Y位置
  const slideType = ref('') // ''不操作  'left'左滑   'right'右滑  'move' 移动中 
  const translateX = ref(0) // 指尖平移距离

  watch(() => [props.date], newVal => {
    // 没有传入值则默认选择今天
    newVal = newVal ? newVal : _.dateFormat('YYYY-MM-DD', new Date())
    const socketTimeObj = _.socketTime(newVal)
    init_year.value = socketTimeObj.year
    init_month.value = socketTimeObj.month
    init_day.value = socketTimeObj.day
    year.value = socketTimeObj.year
    month.value = socketTimeObj.month
    updateDateList()
  }, {immediate: true, deep: true})

  function getDateArr(year, month) {
    const totalDays = getDays(year, month)
    const firstDayOfMon = socketTime(`${year}-${month}-01`)
    const endDayOfMon = socketTime(`${year}-${month}-${totalDays}`)
    // 当前所在月的天数数组
    const curMonthDays = new Array(totalDays).fill('').map((v, i) => String(i + 1)).map(v=>{
      const day = addZero(v,2)
      const date = `${year}-${month}-${day}`
      return { id:guID(), date, year, month, day, init_day: Number(v), disabled: false, isChecked: date == `${init_year.value}-${init_month.value}-${init_day.value}` }
    })
    // 前面一段日期
    const prevDays = new Array(firstDayOfMon.week).fill('').map((v, i) => {
      const date = addDays(firstDayOfMon.today, -1*i - 1, '-')
      const [year, month, day] = date.split('-')
      return { id:guID(), date, year, month, day: addZero(day,2), init_day: Number(day), disabled: true, isChecked: false }
    }).reverse()
    // 后面一段日期
    const nextDays = new Array(42 - prevDays.length - curMonthDays.length).fill('').map((v, i) => {
      const date = addDays(endDayOfMon.today, i + 1, '-')
      const [year, month, day] = date.split('-')
      return { id:guID(), date, year, month, day, init_day: Number(day), disabled: true, isChecked: false }
    })
    return [...prevDays, ...curMonthDays, ...nextDays]
  }
// 上一个月
 function prevMonth() {
  const prevMonth = addZero(Number(month.value) - 1, 2)
  if(prevMonth == 0) {
    year.value = Number(year.value) - 1
    month.value = 12
  } else {
    month.value = prevMonth
  }
  dateList.value = getDateArr(year.value, month.value)
}
// 下一个月
 function nextMonth() {
  const nextMonth = addZero(Number(month.value) + 1, 2)
  if(nextMonth == 13) {
    year.value = Number(year.value) + 1
    month.value = 1
  } else {
    month.value = nextMonth
  }
  dateList.value = getDateArr(year.value, month.value)
}
// 下一年
 function prevYear() {
  year.value = Number(year.value) - 1
  dateList.value = getDateArr(year.value, month.value)
}
// 下一年
 function nextYear() {
  year.value = Number(year.value) + 1
  dateList.value = getDateArr(year.value, month.value)
}
// 选中当前天
 function selectCurDate(item) {
  emit('setDate', item.date)
}
// 更新日期
 function updateDateList() {
  dateListPrev.value = getDateArr(..._.afterNMonthDate(`${year.value}-${month.value}-01`, -1).split('-'))
  dateList.value = getDateArr(year.value, month.value)
  dateListNext.value = getDateArr(..._.afterNMonthDate(`${year.value}-${month.value}-01`, 1).split('-'))
}
//滑动开始
 function touchStart(e) {
  // 记录初始位置
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientX
}
// 移动
 function touchMove(e) {
  const { clientX: endX, clientY: endY } = e.changedTouches[0]
  slideType.value = 'move'
  translateX.value = endX - startX.value
}
//滑动结束
 function touchEnd(e) {
  const { clientX: endX, clientY: endY } = e.changedTouches[0]
  if(Math.abs(endY - startY.value) < 100) {
    if(endX - startX.value > 20) {
      slideType.value = 'right'
      const [init_year, init_month] = _.afterNMonthDate(`${year.value}-${month.value}-01`, -1).split('-')
      year.value = init_year
      month.value = init_month
    } else if(endX - startX.value < -20) {
      slideType.value = 'left'
      const [init_year, init_month] = _.afterNMonthDate(`${year.value}-${month.value}-01`, 1).split('-')
      year.value = init_year
      month.value = init_month
    }
  } 
  setTimeout(() => {
    updateDateList()
    slideType.value = ''
    translateX.value = 0
  },150)
}
  return {
    dateListPrev, dateList, dateListNext, init_year, init_month, init_day, year, month, startX, startY, slideType, translateX,
    emit, getDateArr, prevMonth, nextMonth, prevYear, nextYear, selectCurDate, updateDateList, touchStart, touchMove, touchEnd
  }
}