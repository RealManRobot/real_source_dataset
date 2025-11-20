import { ElMessageBox } from 'element-plus'
if(import.meta.env.MODE == 'production') {
  // 在web后台启一个web多线程服务去检测更新
  const worker = new Worker('/updateWorker.js');
  worker.onmessage = (e) => {
    if(e.data === 'update') {
      ElMessageBox.confirm(
        '检测到网页有更新，是否立即刷新？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          closeOnClickModal: false, // 禁止点击遮罩关闭
          closeOnPressEscape: false, // 禁止按 `ESC` 关闭
          showClose: false // 可选，隐藏右上角关闭按钮
        }
      ).then(() => {
        location.reload() // 刷新浏览器以获得更新
      }).catch(() => {
        console.log('用户放弃了更新')
      })
    }
  }
  worker.postMessage('startCheck')
}
// import { looseEqual } from "/src/common.js"
// 通过检查html文件去检测更新
// const checkForUpdates = (function (){
//   let currentHTML = ''
//   return async () => {
//     try {
//       const html = await fetch(`/index.html?t=${Date.now()}`)
//       const lastHTML = await html.text()
//       if(!currentHTML) { currentHTML = lastHTML }
//       if (!looseEqual(lastHTML, currentHTML)) {
//         ElMessageBox.confirm(
//           '检测到网页有更新，是否立即刷新？',
//           '温馨提示',
//           {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: 'info',
//             closeOnClickModal: false, // 禁止点击遮罩关闭
//             closeOnPressEscape: false, // 禁止按 `ESC` 关闭
//             showClose: false // 可选，隐藏右上角关闭按钮
//           }
//         ).then(() => {
//           currentHTML = lastHTML
//           location.reload()
//         }).catch(() => {
//           currentHTML = lastHTML
//           console.log('用户放弃了更新')
//         })
//       }
//     } catch (error) {
//       console.error("检查更新失败:", error)
//     }
//   }
// })()