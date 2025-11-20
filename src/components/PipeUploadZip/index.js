/**
  <PipeUploadZip :fileArr="fileArr" @setFileArr="e => fileArr = e" type="1"></PipeUploadZip>
  let fileArr = ref([{id:1, name:'测试文件.png'}])
 */
import { ref } from "vue"
import { ElLoading } from 'element-plus'
export default function (props, emit) {
  // 接收事件
  const refId = _.guID()
  const testVal = ref('')
  const loadingObj = ref({})
  const vscodeObj = ref({ finishNum: 0, totalChunks: 0 })
   // 检查文件
  function checkFile(curFiles) {
    // 前端做基础的校验
    if(!curFiles.some(item => ['zip'].some(v => item.type.includes(v)))) { return '请上传.zip格式的压缩包' }
    return ''
  }
  async function readFile(files) {
    const curFiles = Object.keys(files).map(v => files[v])
    if(curFiles.length > 1) { return  _.message.error('每次只能上传一个文件') }
    const checkMsg = checkFile(curFiles)
    if(checkMsg) { return  _.message.error(checkMsg) }
    const file = files[0]
    const { name } = file
    if(file.size > 200 * 1024 * 1024) { return _.message.error('您上传的文件大小超过了限制') }
    loadingObj.value = ElLoading.service({lock: true,text: '正在上传...',background: 'rgba(0, 0, 0, 0.7)',})
    const userId = _.guID()
    const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB per chunk
    const totalChunks = Math.ceil(file.size  / CHUNK_SIZE);
    let finishNum = 0
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);
      const blob = new Blob([chunk], {type: 'application/octet-stream'})
      // 4、将分片上传
      try {
        fetch(`${import.meta.env.VITE_DEVICE_URL}/api/public/upload/file?file_name=${i}_${userId}.bin&tmp=${props.tmp}`, {
          method: 'POST',
          body: blob,
          header: { 'Content-Type': 'application/octet-stream'}
        }).then(async () => {
          finishNum++ 
          if(finishNum == totalChunks) {
            // 5、合并分片，生成文件id
            let id = await _.post(`${import.meta.env.VITE_DEVICE_URL}/api/public/merge/bin_file?merge_id=${userId}&tmp=${props.tmp}`)
            loadingObj.value.close()
            const fileObj = { id: id, name: name }
            const newFileArr = [...props.fileArr, fileObj]
            emit('setFileArr', newFileArr)
            let inputDOM = document.getElementById(refId)
            inputDOM.value = ''
          }
        }).catch(e => {
          _.message.error(e)
        })
      } catch(e) {
        _.message.error(e)
      }
    }
  }
  // 改变文件
  function changeFile(e) {
    readFile(e.target.files)
  }
  // 鼠标进入
  function dropOver(e) {
    e.stopPropagation()
    e.preventDefault()
  }
  // 获取上传的文件
  function drop(e) {
    e.stopPropagation()
    e.preventDefault()
    readFile(e.dataTransfer.files)
  }
  function handleRemove(id){
    const newFileList = props.fileArr.filter(v => v.id != id)
    emit('setFileArr', newFileList)
  }
  return {
    refId,testVal,loadingObj,vscodeObj,
    emit,checkFile,readFile,changeFile,dropOver,drop,handleRemove
  }
}