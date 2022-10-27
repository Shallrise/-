<template>
  <div style="margin-top: 20px">
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>添加章节</el-button
    >
  </div>
  <el-table :data="chapterDataList.records" style="width: 100%">
  <el-table-column prop="id" label="章节序列" width="140" />
    <el-table-column prop="video" label="视频" width="140">
      <template #default="scope">
        <el-input
          :src="scope.row.video"
          style="width: 100px; height: 100px"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="课程名称" width="140" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button links size="large" @click.prevent="editRow(scope.row)">
          <el-icon><i-ep-EditPen /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加章节对话框 -->
  <el-dialog v-model="addDialogVisible" title="添加章节" width="30%" center>
    <el-form :model="addFormList.addForm">
      <el-form-item label="章节id">
        <el-input v-model="addFormList.addForm.courseId" />
      </el-form-item>
      <el-form-item label="课程视频">
        <el-input v-model="addFormList.addForm.video" />
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="addFormList.addForm.title" />
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
      <el-form-item label="课程视频">
        <el-input v-model="eddFormList.editForm.video" />
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="eddFormList.editForm.title" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="eddConfirm"> 确定 </el-button>
        <el-button @click="eddDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { getChapter, addChapter, eddChapter } from "../api/chapter";
import { ChapterData, addformData, eddformData,eddformInt } from "../type/chapterType";

const router = useRoute();
// const courseId:number = ref(router.query.courseId) as Ref<>;
const chapterDataList = reactive(new ChapterData());
const addFormList = reactive(new addformData());
const eddFormList = reactive(new eddformData());

const state = reactive<{
  addDialogVisible: boolean;
  eddDialogVisible: boolean;
  courseId:number
}>({
  addDialogVisible: false,
  eddDialogVisible: false,
  courseId:router.query.courseId
});

const { addDialogVisible, eddDialogVisible } = toRefs(state);

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
  openEddDialog();
  eddFormList.editForm = row;
  // console.log(row);
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

onMounted(() => {
  getChapterList();
});
</script>

<style lang="scss" scoped></style>
