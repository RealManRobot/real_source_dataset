/** 
  @举例模板
    <div id="" class="schoolForm f mb20" style="gap:0 20px;">
      <div class="f1">
        <atomLabel required label="姓名" desc="学生的姓名"></atomLabel>
        <el-input v-id v-label="'姓名：'" v-model="formObj.name" v-max="5" v-required="true" placeholder="请输入学生的姓名" />
      </div>
      <div class="f1">
        <atomLabel required label="学校" desc="学生所在的学校"></atomLabel>
        <el-select v-id v-label="'场景:'" v-model="formObj.scene" placeholder="请选择场景" style="width: 100%">
          <el-option v-for="item in sceneList" :key="item.id" :label="item.id" :value="item.id" />
        </el-select>
        <!--透明input去做校验--->
        <input class="abs r0 l0 b0 zx-1 op0 bd0" v-id v-label="'场景:'" v-model="formObj.scene" v-required="formObj.scene"/> 
      </div>
      <div class="f1">
        <atomLabel required label="年龄" desc="学生的年龄"></atomLabel>
        <el-input v-id v-label="'年龄：'" v-model="formObj.age" v-custom="e => {if(e > 10) { return ['不得超过10'] }}"  v-int v-required="true" placeholder="请输入学生的年龄" />
      </div>
    </div>
    <div class="f mb20">
      <atomButton @click="clickMe" type="primary" className="mr20" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">保存</atomButton>
      <atomButton @click="reset" type="error" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">重置</atomButton>
    </div>
  @举例js
    import atomLabel from "@/atomUI/atomLabel/index.vue"
    const {formObj, reset, validate} = _.useFormRender({ name: '', school: '', age: '' }, '.schoolForm') // 参数1：初始化入参 + 表单选择器
  @举例function
    async function clickMe(){
      await validate(async () => {
        // 基础校验通过编写业务代码。或者再做复杂校验
        await _.wait(100) 
        console.log(formObj.value)

      })
    }
*/
import { ref } from "vue"
export default function (props, emit) {
  
  return {
    
    emit,
  }
}