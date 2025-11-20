/**
 * 图片懒加载指令
 * @ {item} fn - 执行事件
 * @param {String} item - 图片链接  例："https://upload.qianfanyun.com/jj_design_bnt.png"
 * @param {Array} binding.value - [item, defaultImg]  第一个参数是图片，第二个参数是默认图片
 * const imgArr = ref(['http://xxx1.png', 'http://xxx2.png'])
 * 使用默认图片<img v-for="(item, index) in imgArr" :key="index" v-lazyImg="item" style="width:300px;height:50px;" class="db auto mb50r">
 * 主动传入设置的默认图片： <img v-for="(item, index) in imgArr" :key="index" v-lazyImg="[item, 'https://upload.qianfanyun.com/jj_design_check.png']" style="width:300px;height:50px;" class="db auto mb50r">
 */
import { isArray } from "@/common.js"
export const lazyImg = {
  mounted: (ele, {value}) =>{
    const observer = new IntersectionObserver(entries => {
      let [src, defaultImg] = isArray(value) ? value : [value, 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png']
      if(entries[0].intersectionRatio > 0) { 
        ele.src = src
      } else if(!ele.src){
        ele.src = defaultImg //图片显示默认的图片
      }
    }, {
      root: null, // 相对的视口元素，传入 null 则为顶级文档视口
      rootMargin: '0px 0px 200px 0px', // 触发交叉回调时被观察元素相对于视口的偏移量
      threshold: [0.0001, 0.001, 0.01, 0] // 一个具体数值或数值数组， 触发交叉回调时被观察元素的可见比例
    })
    observer.observe(ele) // 监听加载更多的位置
  },
}