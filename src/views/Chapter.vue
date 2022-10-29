<template>
  <div style="margin-top: 20px">
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>添加章节</el-button
    >
  </div>
  <el-table :data="chapterDataList.records" style="width: 100%">
    <!-- <el-table-column prop="id" label="章节序列" width="140" /> -->
    <el-table-column prop="video" label="视频" width="200">
      <template #default="scope">
        <video controls muted style="width: 200px; height: 200px">
          <source :src="scope.row.video" type="video/mp4" />
        </video>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="课程名称" width="200" align="center" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button links size="large" @click.prevent="editRow(scope.row)">
          <el-icon><i-ep-EditPen /></el-icon>
        </el-button>
        <el-button
          links
          size="large"
          type="danger"
          @click.prevent="delRow(scope.row)"
        >
          <el-icon><i-ep-Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加章节对话框 -->
  <el-dialog v-model="addDialogVisible" title="添加章节" width="30%" center>
    <el-form :model="addFormList.addForm">
      <el-form-item label="课程序列id">
        <el-input v-model="addFormList.addForm.courseId" disabled />
      </el-form-item>
      
      <el-form-item label="课程名称">
        <el-input v-model="addFormList.addForm.title" />
      </el-form-item>
      <el-form-item label="课程视频">
        <!-- <el-input v-model="addFormList.addForm.video" /> -->
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="/api/upload/video"
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
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addConfirm"> 确定 </el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑章节对话框 -->
  <el-dialog v-model="eddDialogVisible" title="编辑章节" width="30%" center>
    <el-form :model="eddFormList.editForm">
      <el-form-item label="章节id">
        <el-input v-model="eddFormList.editForm.id" />
      </el-form-item>
      <!-- <el-form-item label="课程视频">
        <el-input v-model="eddFormList.editForm.video" />
      </el-form-item> -->
      <el-form-item label="课程名称">
        <el-input v-model="eddFormList.editForm.title" />
      </el-form-item>
      <el-form-item label="课程视频">
        <!-- <el-input v-model="addFormList.addForm.video" /> -->
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="/api/upload/video"
          name="video"
          :on-preview="handlePrevie"
          :on-remove="handleRemov"
          :on-success="handleSucces"
          list-type="picture"
        >
          <el-button type="primary">点击上传视频</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="eddConfirm"> 确定 </el-button>
        <el-button @click="eddDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除章节对话框 -->
  <el-dialog v-model="delDialogVisible" title="删除章节" width="30%" center>
    <div class="warning custom-block">
      <p class="custom-block-title">warning</p>
      <p>确定删除章节 {{ deltitle }} ?</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delConfirm" type="primary">确定</el-button>
        <el-button @click="closeDelDialog"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs, Ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
import { getChapter, addChapter, eddChapter, delChapter } from "../api/chapter";
import {
  ChapterData,
  addformData,
  eddformData,
  eddformInt,
} from "../type/chapterType";

const router = useRoute();
const courseId: any = ref(router.query.courseId);
const chapterDataList = reactive(new ChapterData());
const addFormList = reactive(new addformData());
const eddFormList = reactive(new eddformData());
const fileList = ref<UploadUserFile[]>([]);

const state = reactive<{
  addDialogVisible: boolean;
  eddDialogVisible: boolean;
  delDialogVisible: boolean;
  deltitle: string;
  delId: string;
  url:string
}>({
  addDialogVisible: false,
  eddDialogVisible: false,
  delDialogVisible: false,
  deltitle: "",
  delId: "",
  url:''
});

const {
  addDialogVisible,
  eddDialogVisible,
  delDialogVisible,
  deltitle,
  delId,
  url
} = toRefs(state);

const getChapterList = () => {
  getChapter(courseId.value)
    .then((res: any) => {
      chapterDataList.records = res.data.data.records;
    })
    .catch(() => {
      ElMessage({
        message: "获取章节失败",
        type: "error",
      });
    });
};

const openAddDialog = () => {
  addDialogVisible.value = true;
  addFormList.addForm.courseId = courseId.value;
};

const closeAddDialog = () => {
  addDialogVisible.value = false;
};

const addConfirm = () => {
  addChapter(addFormList.addForm)
    .then((res: any) => {
      // console.log(res);
      if (res.data.code === 200) {
        ElMessage({
          message: "添加章节成功",
          type: "success",
        });
      }
      closeAddDialog();
      getChapterList();
    })
    .catch(() => {
      ElMessage({
        message: "添加章节失败",
        type: "error",
      });
    });
};

const openEddDialog = () => {
  eddDialogVisible.value = true;
};

const closeEddDialog = () => {
  eddDialogVisible.value = false;
};

const editRow = (row: eddformInt) => {
  url.value=row.video
  fileList.value.push({
    'url':url
  })
  openEddDialog();
  eddFormList.editForm = row;
  addFormList.addForm.video=fileList.value[0].url
  console.log(row);
};

const eddConfirm = () => {
  eddChapter(eddFormList.editForm)
    .then((res: any) => {
      console.log(res);
      if (res.data.code === 200) {
        ElMessage({
          message: "编辑章节成功",
          type: "success",
        });
      }
      closeEddDialog();
      getChapterList();
    })
    .catch(() => {
      ElMessage({
        message: "添加章节失败",
        type: "error",
      });
    });
};

const openDelDialog = () => {
  delDialogVisible.value = true;
};

const closeDelDialog = () => {
  delDialogVisible.value = false;
};

const delRow = (row: eddformInt) => {
  openDelDialog();
  deltitle.value = row.title;
  delId.value = row.id;
};

const delConfirm = () => {
  delChapter(delId.value)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "删除章节成功",
          type: "success",
        });
      }
      closeDelDialog();
      getChapterList();
    })
    .catch(() => {
      ElMessage({
        message: "删除章节失败",
        type: "error",
      });
    });
};

const handleSuccess = (res: any) => {
  addFormList.addForm.video=res.data.path
  // console.log(res.data.path);
  // console.log(res.data.actPath);
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (file) => {
  console.log(file);
};

const handleSucces = (res: any) => {
  addFormList.addForm.video=res.data.path
  // console.log(res.data.path);
  // console.log(res.data.actPath);
};

const handleRemov: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePrevie: UploadProps["onPreview"] = (file) => {
  console.log(file);
};

onMounted(() => {
  getChapterList();
});
</script>

<style lang="scss" scoped>
.custom-block.warning {
  padding: 8px 16px;
  background-color: rgba(var(--el-color-danger-rgb), 0.1);
  border-radius: 4px;
  border-left: 5px solid #f56c6c;
  margin: 20px 0;
}
.custom-block .custom-block-title {
  font-weight: 700;
  line-height: 2.5;
}
</style>
