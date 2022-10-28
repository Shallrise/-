<template>
  <div style="margin-top: 20px" class="top">
    <el-input
      class="w-50 m-2"
      size="small"
      v-model="keyword"
      placeholder="查询讲师"
      @keyup.enter="searchTeacherList"
      :suffix-icon="Search"
    />
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>添加讲师</el-button
    >
  </div>
  <el-table :data="teacherDataList.records" style="width: 100%">
    <el-table-column prop="id" label="讲师号" width="140" align="center" />
    <el-table-column prop="name" label="讲师姓名" width="140" align="center" />
    <el-table-column prop="sex" label="性别" width="140" align="center" />
    <el-table-column prop="introduce" label="介绍" width="300" align="center" />
    <el-table-column label="操作" align="center" width="200">
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
  <!-- 添加讲师对话框 -->
  <el-dialog v-model="addDialogVisible" title="添加讲师" width="30%" center>
    <el-form :model="addDataList.addForm">
      <el-form-item label="姓名">
        <el-input v-model="addDataList.addForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="addDataList.addForm.sex" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="addDataList.addForm.introduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addConfirm"> 确定 </el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改讲师对话框 -->
  <el-dialog v-model="eddDialogVisible" title="修改讲师" width="30%" center>
    <el-form :model="eddFormList.addForm">
      <el-form-item label="姓名">
        <el-input v-model="eddFormList.addForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="eddFormList.addForm.sex" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="eddFormList.addForm.introduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="eddConfirm"> 确定 </el-button>
        <el-button @click="closeEddDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除讲师对话框 -->
  <el-dialog v-model="delDialogVisible" title="删除讲师" width="30%" center>
    <div class="warning custom-block">
      <p class="custom-block-title">warning</p>
      <p>确定删除{{ delName }}讲师？</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="delConfirm"> 确定 </el-button>
        <el-button @click="delDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { Search } from '@element-plus/icons-vue'
import { teacherData, addformData, recodsInt } from "../type/teacherType";
import { getTeacher, addTeacher, eddTeacher, delTeacher,searchTeacher} from "../api/teacher";

const teacherDataList = reactive(new teacherData());
const addDataList = reactive(new addformData());
const eddFormList = reactive(new addformData());

const state = reactive<{
  addDialogVisible: boolean;
  eddDialogVisible: boolean;
  delDialogVisible: boolean;
  delName: string;
  delId: number;
  keyword:string
}>({
  addDialogVisible: false,
  eddDialogVisible: false,
  delDialogVisible: false,
  delName: "",
  delId: 0,
  keyword:''
});

const { addDialogVisible, eddDialogVisible, delDialogVisible, delName, delId,keyword } =
  toRefs(state);

const getTeacherList = () => {
  getTeacher()
    .then((res: any) => {
      teacherDataList.records = res.data.data.records;
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
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
  addTeacher(addDataList.addForm)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "添加讲师成功",
          type: "success",
        });
      }
      closeAddDialog();
      getTeacherList();
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
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

const editRow = (row: recodsInt) => {
  eddFormList.addForm = row;
  openEddDialog();
};

const eddConfirm = () => {
  eddTeacher(eddFormList.addForm)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "编辑讲师成功",
          type: "success",
        });
      }
      closeEddDialog();
      getTeacherList();
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
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

const delRow = (row: recodsInt) => {
  delName.value = row.name;
  delId.value = row.id;
  openDelDialog();
};

const delConfirm = () => {
  delTeacher(delId.value)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "删除讲师成功",
          type: "success",
        });
      }
      closeDelDialog();
      getTeacherList();
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
        type: "error",
      });
    });
};

const searchTeacherList = () =>{
    searchTeacher(keyword.value).then((res:any)=>{
        teacherDataList.records = res.data.data.records;
    }).catch((err) => {
      ElMessage({
        message: err.msg,
        type: "error",
      });
    });
}

onMounted(() => {
  getTeacherList();
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
.w-50 {
  width: 400px;
  height: 32px;
  border-radius: 2px;
  border: solid 1px #c3cedf;
}
.top {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
