/**
 * 高级定时器
 * @param {*} fn 需要执行的函数
 * @param {*} time 执行时间间隔
 * @returns 
 * const timerFn = highInterval(() => {console.log(1)}, 5e3)
 */
function highInterval(fn,time){
  let timer = null
  function loop() {
    timer = setTimeout(async () => { await fn();loop() }, time)
  }
  loop()
  return () => clearTimeout(timer)
}
// 检查更新函数
const checkUpdate = (function (){
  let curEtag = ''
  return async () => {
    const res = await fetch(`/index.html`, { method: 'HEAD' })
    if(!res.ok) { return }
    const newEtag = res.headers.get('ETag') || res.headers.get('Last-Modified') // 通过比对Etag标签获取是否更新
    if(!curEtag) { curEtag = newEtag }
    if(curEtag != newEtag) {
      self.postMessage('update')
    }
    curEtag = newEtag
  }
})()
// 监听向worker的传参
self.onmessage = async (event) => {
  const type = event.data
  if(type == 'startCheck') {
    highInterval(checkUpdate, 15e3)
  }
}