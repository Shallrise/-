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
    <el-table-column prop="image" label="封面" width="180">
      <template #default="scope">
        <el-image
          :src="scope.row.image"
          style="width: 100px; height: 100px"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="课程名称" width="180" />
    <el-table-column prop="teacher" label="授课老师" />
    <el-table-column prop="hour" label="课时" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button links size="large">
          <el-icon><i-ep-Operation /></el-icon>
        </el-button>
        <el-button links size="large">
          <el-icon><i-ep-FolderOpened /></el-icon>
        </el-button>
        <el-button links size="large" @click.prevent="editRow(scope)">
          <el-icon><i-ep-EditPen /></el-icon>
        </el-button>
        <el-button
          links
          size="large"
          type="danger"
        >
          <el-icon><i-ep-Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加课程对话框 -->
  <el-dialog v-model="addDialogVisible">
    <el-form :model="addForm">
      <el-form-item label="课程名称">
        <el-input v-model="addForm.title" />
      </el-form-item>
      <el-form-item label="授课老师">
        <el-input v-model="addForm.teacher" />
      </el-form-item>
      <el-form-item label="课时">
        <el-input v-model="addForm.hour" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="addForm.image" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="addForm.introduce" />
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
    <el-form :model="editForm">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="editForm.title" />
      </el-form-item>
      <el-form-item label="授课老师">
        <el-input v-model="editForm.teacher" />
      </el-form-item>
      <el-form-item label="课时">
        <el-input v-model="editForm.hour" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="editForm.image" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="editForm.introduce" />
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
import { getList, addClass,editClass } from "../api/class";
import { ClassData, addformInt } from "../type/classType";
import { ElMessage } from "element-plus";
// import {addClass} from "../api/class"
// import addDialog from '../components/addDialog.vue'

const classDataList = reactive(new ClassData());

const state = reactive<{
  addForm: addformInt;
  addDialogVisible: boolean;
  editForm:addformInt;
  editDialogVisible:boolean
}>({
  addForm: [],
  addDialogVisible: false,
  editForm:[],
  editDialogVisible:false
});

const { addForm, addDialogVisible,editForm,editDialogVisible } = toRefs(state);

// const visible = ref(false)

const getClassList = () => {
  getList().then((res) => {
    console.log(res.data);
    classDataList.records = res.data.data.records;
  });
};

const openAddDialog = () => {
  addDialogVisible.value = true;
};

const closeAddDialog = () => {
  addDialogVisible.value = false;
};

const handleConfirm = () => {
  addClass(addForm.value)
    .then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
      }
      closeAddDialog();
       getClassList()
    })
    .catch(() => {
      ElMessage({
        message: "添加失败",
        type: "error",
      });
      closeAddDialog();
    });
};

const closeEditDialog = () =>{
    editDialogVisible.value=false
}

const openEditDialog = () =>{
    editDialogVisible.value=true
}

const editRow = (editData:addformInt) =>{
    openEditDialog()
    editForm.value=editData.row
    
}

const editClassConfirm = () =>{
    editClass(editForm.value).then((res)=>{
        if(res.data.code === 200){
            ElMessage({
          message: "编辑成功",
          type: "success",
        });
        }
        getClassList()
        closeEditDialog()
    }).catch(() => {
      ElMessage({
        message: "编辑失败",
        type: "error",
      });
      closeAddDialog();
    });
}



onMounted(() => {
  getClassList();
});
</script>

<style lang="scss" scoped></style>
