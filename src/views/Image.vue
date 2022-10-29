<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action='/api/upload/video'
    name="video"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    list-type="picture"
  >
    <el-button type="primary">点击上传视频</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const handleSuccess = (res:any)=>{
    console.log(res.data.path);
    console.log(res.data.actPath);
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}
</script>

<style lang="scss" scoped></style>
