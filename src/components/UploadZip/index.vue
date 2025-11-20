<template>
  <div class="w100">
    <div v-if="props.type == 1" class="gec6102 mb5 fs12">请上传YOLO格式数据集的压缩包</div>
    <div v-else-if="props.type == 0" class="gec6102 mb5 fs12">请上传mp4格式的压缩包</div>
    <label v-if="!props.fileArr.length" @dragover="dropOver" @drop="drop" :for="refId" ref="label" class="rds5 pt20 pb20 tc db" style="border:1px dashed #ccc;">
      <atomSvg type="file" width="48" height="59" color="#666666"></atomSvg>
      <div>拖拽文件至此处上传，或<span class="g329cff poi tdu pl4">点击上传</span></div>
      <input type="file" :ref="refId" :id="refId" accept="zip" class="op0" @change="changeFile">
    </label>
    <div class="dn">{{ testVal }}</div>
    <div v-for="item in props.fileArr" :key="item.id" class="pt8 pb8 pl30 f ac rds5 mt5" style="background:#F5F7FA;">
      <svg t="1721873880579" class="mr8" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4340" width="20" height="20"><path d="M0 345.6h1024v332.8H0V345.6z" fill="#F95F5D" p-id="4341"></path><path d="M1018.514 345.6V80.457c0-32.914-29.257-62.171-64-62.171H64c-34.743 0-64 29.257-64 62.171V345.6h1018.514z" fill="#55C7F7" p-id="4342"></path><path d="M0 678.4v265.143c0 32.914 29.257 62.171 64 62.171h897.829c34.742 0 64-29.257 64-62.171V678.4H0z" fill="#7ECF3B" p-id="4343"></path><path d="M400.457 18.286H629.03v987.428H400.457V18.286z" fill="#FDAF42" p-id="4344"></path><path d="M629.029 446.171v138.972H389.486V446.17h239.543m38.4-56.685H351.086c-5.486 0-14.629 5.485-14.629 14.628v221.257c0 5.486 5.486 14.629 14.629 14.629h316.343c5.485 0 14.628-5.486 14.628-14.629V404.114c-3.657-10.971-9.143-14.628-14.628-14.628z" fill="#FFFFFF" p-id="4345"></path></svg>
      <!-- <svg t="1692169073238" class="mr8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6101" width="15" height="19"><path d="M768 977.92H256c-30.72 0-66.56-15.36-87.04-35.84-25.6-25.6-35.84-56.32-35.84-87.04V168.96c0-30.72 15.36-66.56 35.84-87.04S225.28 46.08 256 46.08h343.04c10.24 0 20.48 5.12 25.6 10.24l256 256c5.12 5.12 10.24 15.36 10.24 25.6v512c0 30.72-15.36 66.56-35.84 87.04-20.48 25.6-56.32 40.96-87.04 40.96zM256 122.88c-10.24 0-25.6 5.12-30.72 15.36-10.24 10.24-15.36 20.48-15.36 30.72v680.96c0 10.24 5.12 25.6 15.36 30.72 10.24 10.24 20.48 15.36 30.72 15.36h512c10.24 0 25.6-5.12 30.72-15.36 10.24-10.24 15.36-20.48 15.36-30.72V358.4l-235.52-235.52H256z" fill="#1AADA7" p-id="6102"></path><path d="M855.04 378.88h-256c-20.48 0-40.96-15.36-40.96-40.96v-256c0-20.48 15.36-40.96 40.96-40.96s40.96 15.36 40.96 40.96v215.04h215.04c20.48 0 40.96 15.36 40.96 40.96s-20.48 40.96-40.96 40.96zM680.96 593.92H343.04c-20.48 0-40.96-15.36-40.96-40.96 0-20.48 15.36-40.96 40.96-40.96h343.04c20.48 0 40.96 15.36 40.96 40.96-5.12 20.48-25.6 40.96-46.08 40.96zM680.96 762.88H343.04c-20.48 0-40.96-15.36-40.96-40.96s15.36-40.96 40.96-40.96h343.04c20.48 0 40.96 15.36 40.96 40.96s-25.6 40.96-46.08 40.96zM424.96 419.84H343.04c-20.48 0-40.96-15.36-40.96-40.96s15.36-40.96 40.96-40.96h87.04c20.48 0 40.96 15.36 40.96 40.96s-25.6 40.96-46.08 40.96z" fill="#1AADA7" p-id="6103"></path></svg> -->
      <div class="f1 b fs14">{{item.name}}</div>
      <div @click="handleRemove(item.id)" class="fs14 ml10 mr30 poi" style="color: #E91616;">删除</div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import atomSvg from "@/atomUI/atomSvg/index.vue"
export default {
  components: {
    atomSvg
  },
  props: {
    fileArr: { type: Array, default: () => [] },
    type: { type: [String, Number], default: '1' }, // 1代表上传数据集   0代表上传视频
  },
  emits: ['setFileArr'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>

<style scoped></style>