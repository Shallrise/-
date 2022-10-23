<template>
    <el-dialog
    v-model="visible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
  <div style="margin: 20px" />
   <el-form
    :label-position="labelPosition"
    :label-width="formLableWidth"
    :model="form"
    style="max-width: 460px"
  >
    <el-form-item label="课程名称">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="授课老师">
      <el-input v-model="form.teacher" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.hour" />
    </el-form-item>
    <el-form-item label="封面">
      <el-input v-model="form.image" />
    </el-form-item>
    <el-form-item label="课程介绍">
      <el-input v-model="form.introduce" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible= false">Cancel</el-button>
        <el-button type="primary" @click="visible= false"
          >Confirm</el-button
        >
      </span>
</template>

<script setup lang="ts">
import {reactive,toRefs} from 'vue'


const props = defineProps({visible:boolean});

const labelPosition = ref('right')
const state = reactive({
    form:{
        name:''
    }
    formLableWidth:'120px'
})

const {from,formLableWidth} = toRefs(state)
</script>

<style lang="scss" scoped>

</style>