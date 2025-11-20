import { isString } from "@/common.js"
/**
 * 跨域文件下载
 * 跨域文件设置download会不生效。如果要保证设置的文件名起效果的话，请调用这个函数
 * 详情请看：https://blog.csdn.net/qq_41801059/article/details/125679903
 * @param {String} fileName 文件名
 * @param {String} url 请求地址
 * @举例子 crossOriginDownload('文件.xlsx', "http://192.168.10.11:48079/admin-api/infra/file/4/get/4c71bd392f26b860420330100f6f2471d3f281c6acae74d16e0b5ec60297d92f.xlsx")
 */
export async function crossOriginDownload(fileName, url) {
  // const res = await request({ method: "GET", url: url, responseType: 'blob' }, 0) // 如果采用axios请求的话
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)  // url 文件的完整地址 http:XXX
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      const res = xhr.response;
      const link = document.createElement('a')
      link.style.display = 'none'
      const url = window.URL.createObjectURL(res)
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }
  }
  xhr.send()
}
/**
 * 二进制流文件下载：支持blob对象和url地址
 * @举例1 downloadFile('123123.png', 'https://xxxxxxx.png')
 * @举例2 downloadFile('123123.png', 'http://192.168.10.36:18049/open/file/download?data=M80/CELarJJQA1OgRtank6oq+/1xrY/rnMLA86dc1AAGXROW5FENy3V4MWWkNfGo')
 * @举例3 downloadFile('123123.png', Blob二进制对象) // 第二个参数是二进制流，后端返回的
 */
export async function downloadFile(fileName, pathOrBlob){
  const url = isString(pathOrBlob) ? pathOrBlob : window.URL.createObjectURL(new Blob([pathOrBlob]))
  if(isString(pathOrBlob)) { return crossOriginDownload(fileName, pathOrBlob) }
  const link = window.document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  !isString(pathOrBlob) && window.URL.revokeObjectURL(url)
  document.body.removeChild(link)
}
/**
 * 用户在个人中心上传头像，很多人选择高清原图导致，上传慢，服务器压力大，加载影响性能。可以通过此函数进行压缩生成新的二进制数据
 * @param {*} file 
 * @param {*} quality 
 * @returns 
 * @举例 
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const compressedBlob = await compressImage(file, 0.7)
      const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' })
      uploadToServer(compressedFile) // 上传到服务器
    }
  }
 */
export function compressImage(file, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        canvas.toBlob(blob => resolve(blob), 'image/jpeg', quality)
      }
    }
    reader.onerror = reject
  })
}
// 打开全屏
export function toFullScreen(){
  let el = document.documentElement
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  if(rfs) {
    rfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    let wscript = new ActiveXObject("WScript.Shell")
    if (wscript != null) { wscript.SendKeys("{F11}") }
  }else{
    alert("浏览器不支持全屏")
  }
}
// 退出全屏
export function exitFullscreen(){
  let el = parent.document
  let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  if (cfs) {
    cfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
    let wscript = new ActiveXObject("WScript.Shell")
    if (wscript != null) { wscript.SendKeys("{F11}") }
  } else {
    alert("切换失败,可尝试Esc退出")
  }
}