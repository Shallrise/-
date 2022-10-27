<template>
  <div style="margin-top: 20px">
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>新增</el-button
    >
    <el-button
      ><el-icon><i-ep-Delete /></el-icon>批量删除</el-button
    >
  </div>
  <el-table :data="classDataList.records" style="width: 100%">
    <el-table-column prop="image" label="封面" width="140">
      <template #default="scope">
        <el-image
          :src="scope.row.image"
          style="width: 100px; height: 100px"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="课程名称" width="140" />
    <el-table-column prop="introduce" label="课程介绍" width="230"></el-table-column>
    <el-table-column prop="teacher" label="授课老师" width="140"/>
    <el-table-column prop="hour" label="课时" width="140"/>
    <el-table-column prop="createTime" label="创建时间" width="170"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button links size="large">
          <el-icon><i-ep-Operation /></el-icon>
        </el-button>
        <el-button links size="large" @click.prevent="searchClass(scope.row.id)">
          <el-icon><i-ep-FolderOpened /></el-icon>
        </el-button>
        <el-button links size="large" @click.prevent="editRow(scope.row)">
          <el-icon><i-ep-EditPen /></el-icon>
        </el-button>
        <el-button
          links
          size="large"
          type="danger"
          @click.prevent="confirmDelClass(scope.row.id)"
        >
          <el-icon><i-ep-Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加课程对话框 -->
  <el-dialog v-model="addDialogVisible">
    <el-form :model="addFormList.addForm">
      <el-form-item label="课程名称">
        <el-input v-model="addFormList.addForm.title" />
      </el-form-item>
      <el-form-item label="授课老师">
        <el-input v-model="addFormList.addForm.teacher" />
      </el-form-item>
      <el-form-item label="课时">
        <el-input v-model="addFormList.addForm.hour" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="addFormList.addForm.image" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="addFormList.addForm.introduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button @click="closeAddDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑课程对话框 -->
  <el-dialog v-model="editDialogVisible">
    <el-form :model="editFormList.editForm">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="editFormList.editForm.title" />
      </el-form-item>
      <el-form-item label="授课老师">
        <el-input v-model="editFormList.editForm.teacher" />
      </el-form-item>
      <el-form-item label="课时">
        <el-input v-model="editFormList.editForm.hour" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="editFormList.editForm.image" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="editFormList.editForm.introduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="editClassConfirm">确认</el-button>
        <el-button @click="closeEditDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs, ref } from "vue";
import { getList, addClass, editClass, deleteClass } from "../api/class";
import { ClassData, addformData, eddformData,eddformInt } from "../type/classType";
import { ElMessage } from "element-plus";
import {useRouter} from 'vue-router'

const classDataList = reactive(new ClassData());
const addFormList = reactive(new addformData());
const editFormList = reactive(new eddformData());
const router = useRouter()

const state = reactive<{
  addDialogVisible: boolean;
  editDialogVisible: boolean;
  courseId:number;
}>({
  addDialogVisible: false,
  editDialogVisible: false,
  courseId:0
});

const { addDialogVisible, editDialogVisible } =
  toRefs(state);


const getClassList = () => {
  getList().then((res: any) => {
    classDataList.records = res.data.data.records;
  });
};

const searchClass = (courseId:any) =>{
// console.log(id);
router.push({
  path:'/chapter',
  query:{
    courseId:courseId
  }
})
}

const openAddDialog = () => {
  addDialogVisible.value = true;
};

const closeAddDialog = () => {
  addDialogVisible.value = false;
};

const handleConfirm = () => {
  addClass(addFormList.addForm)
    .then((res:any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
      }
      closeAddDialog();
      getClassList();
    })
    .catch(() => {
      ElMessage({
        message: "添加失败",
        type: "error",
      });
      closeAddDialog();
    });
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
};

const openEditDialog = () => {
  editDialogVisible.value = true;
};

const editRow = (editData: eddformInt) => {
  openEditDialog();
  editFormList.editForm = editData;
};

const editClassConfirm = () => {
  editClass(editFormList.editForm)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "编辑成功",
          type: "success",
        });
      }
      getClassList();
      closeEditDialog();
    })
    .catch(() => {
      ElMessage({
        message: "编辑失败",
        type: "error",
      });
      closeAddDialog();
    });
};

const confirmDelClass = (id: number) => {
  deleteClass(id)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      }
      getClassList();
    })
    .catch(() => {
      ElMessage({
        message: "删除失败",
        type: "error",
      });
    });
};

onMounted(() => {
  getClassList();
});
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
