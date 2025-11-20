/**
<UploadZip :fileArr="fileArr" @setFileArr="e => fileArr = e" type="1"></UploadZip>
let fileArr = ref([{id:1, name:'测试文件.png', url:'http://xxxxx.zip'}])
*/
import { ref, onUnmounted } from "vue"
import file from "@/assets/file.png"
import { ElMessage } from 'element-plus'
export default function (props, emit) {
  const guID = _.guID()
  const refId = _.guID()
  const testVal = ref('')
  // 检查文件
  const checkFile = function (curFiles) {
    // 前端做基础的校验
    if(!curFiles.some(item => ['zip'].some(v => item.type.includes(v)))) {
      return '请上传.zip格式的压缩包'
    }
  // else if(curFiles.length + props.fileArr.length > this.limit ){
    //   return `最多只能上传${this.limit}个文件`
    // } else if(curFiles.some(v => v.size > this.maxSize)) {
    //   return '文件大小超过了限制'
    // }
    return ''
  }
  // 读取文件
  const readFile = async function (files) {
    let formDatas = new FormData()
    const curFiles = Object.keys(files).map(v => files[v])
    if(curFiles.length > 1) { return ElMessage.error('每次只能上传一个文件') }
    const checkMsg = checkFile(curFiles)
    if(checkMsg) { return ElMessage.error(checkMsg) }
    // 本地图片显示, formData追加数据
    curFiles.forEach(v => {
      formDatas.append("file", v)
      const reader = new FileReader()
      reader.readAsDataURL(v)
      reader.onload = e => {
        fetch(`${import.meta.env.VITE_DEVICE_URL}/api/dataset/upload/file?type=${props.type}`, {
          method: 'POST', // 设置请求方法为POST  
          body: JSON.stringify({base64: e.target.result.split(';base64,')[1]}),// 将数据转换为JSON格式并作为请求体发送  
          headers: { 'Content-Type': 'application/json' },
        }).then(async response => {
          const res = await response.json() // 解析返回的JSON数据  
          dataset_upload_file(res)
        }).catch(e => { console.log(e) })
      }
    })
  }
  function dataset_upload_file(res){
    if(res.code != 0 && res.code != 200) { return _.message.error(res.msg) }
    const { file_name, file_url, id } = res.result
    const fileObj = {
      id: id,
      name: file_name,
      url: file_url
    }
    const newFileArr = [...props.fileArr, fileObj]
    emit('setFileArr', newFileArr)
    let inputDOM = document.getElementById(refId)
    inputDOM.value = ''
  }
  // 改变文件
  const changeFile = function (e) {
    readFile(e.target.files)
  }
  // 鼠标进入
  const dropOver = function (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  // 获取上传的文件
  const drop = function (e) {
    e.stopPropagation()
    e.preventDefault()
    readFile(e.dataTransfer.files)
  }
  function handleRemove(id){
    const newFileList = props.fileArr.filter(v => v.id != id)
    emit('setFileArr', newFileList)
  }
  return {
    file,guID,refId,testVal,
    emit,checkFile,readFile,dataset_upload_file,changeFile,dropOver,drop,handleRemove
  }
}