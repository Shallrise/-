<template>
  <div style="margin-top: 20px" class="top">
    <el-input
      class="w-50 m-2"
      size="small"
      v-model="keywordGrap"
      placeholder="查询班级"
      @keyup.enter="searchGradeList"
      :suffix-icon="Search"
    />
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>添加班级</el-button
    >
  </div>
  <el-table :data="gradeDataList.records" style="width: 100%">
    <el-table-column prop="className" label="班级名称" align="center" />
    <el-table-column prop="code" label="班级编码" align="center" />
    <el-table-column prop="number" label="班级人数" align="center" />
    <el-table-column prop="publicity" label="是否为公开课" align="center" />
    <el-table-column prop="description" label="班级介绍" align="center" />
    <el-table-column prop="createTime" label="创建时间" align="center" />
    <el-table-column label="操作" align="center">
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
  <!-- 添加班级对话框 -->
  <el-dialog v-model="addDialogVisible" title="添加班级" width="30%" center>
    <el-form :model="addDataList.addForm">
      <el-form-item label="班级姓名">
        <el-input v-model="addDataList.addForm.className" />
      </el-form-item>
      <el-form-item label="是否为公开课">
        <el-input v-model="addDataList.addForm.publicity" />
      </el-form-item>
      <el-form-item label="班级介绍">
        <el-input v-model="addDataList.addForm.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addConfirm"> 确定 </el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改班级对话框 -->
  <el-dialog v-model="eddDialogVisible" title="修改班级" width="30%" center>
    <el-form :model="eddFormList.addForm">
      <el-form-item label="班级姓名">
        <el-input v-model="eddFormList.addForm.className" />
      </el-form-item>
      <el-form-item label="是否为公开课">
        <el-input v-model="eddFormList.addForm.publicity" />
      </el-form-item>
      <el-form-item label="班级介绍">
        <el-input v-model="eddFormList.addForm.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="eddConfirm"> 确定 </el-button>
        <el-button @click="closeEddDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除班级对话框 -->
   <el-dialog v-model="delDialogVisible" title="删除班级" width="30%" center>
    <div class="warning custom-block">
      <p class="custom-block-title">warning</p>
      <p>确定删除班级 {{ delName }}？</p>
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
import { Search } from "@element-plus/icons-vue";
import { getClass, searchgrade, addGrade, eddGrade ,delGrade} from "../api/grade";
import { gradeData, addformData, recodsInt } from "../type/gradeType";

const gradeDataList = reactive(new gradeData());
const addDataList = reactive(new addformData());
const eddFormList = reactive(new addformData());

const state = reactive<{
  addDialogVisible: boolean;
  keywordGrap: string;
  eddDialogVisible: boolean;
  eddId:number;
  delName :string;
  delDialogVisible:boolean,
  delId:number
}>({
  addDialogVisible: false,
  keywordGrap: "",
  eddDialogVisible: false,
  eddId:0,
  delName:'',
  delDialogVisible:false,
  delId:0
});

const { addDialogVisible, keywordGrap, eddDialogVisible,eddId,delName,delDialogVisible,delId } = toRefs(state);

const getList = () => {
  getClass()
    .then((res: any) => {
      gradeDataList.records = res.data.data.records;
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
        type: "error",
      });
    });
};

const searchGradeList = () => {
  searchgrade(keywordGrap.value)
    .then((res: any) => {
      gradeDataList.records = res.data.data.records;
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
  addGrade(addDataList.addForm)
    .then((res: any) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "添加班级成功",
          type: "success",
        });
      }
      closeAddDialog();
      getList();
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
  openEddDialog();
  eddFormList.addForm.className = row.className;
  eddFormList.addForm.publicity = row.publicity;
  eddFormList.addForm.description = row.description;
  eddId.value=row.id
  // console.log(row);
};

const eddConfirm = () => {
  eddGrade(eddFormList.addForm,eddId.value)
    .then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          message: "编辑班级成功",
          type: "success",
        });
      }
      closeEddDialog();
      getList();
    })
    .catch((err) => {
      ElMessage({
        message: err.msg,
        type: "error",
      });
    });
};

const openDelDialog = () =>{
    delDialogVisible.value=true
}

const closeDelDialog = () =>{
    delDialogVisible.value=false
}

const delRow = (row:recodsInt) =>{
    delName.value=row.className
    delId.value=row.id
openDelDialog()
// console.log(row);

}

const delConfirm = () =>{
    delGrade(delId.value).then((res)=>{
        if (res.data.code == 200) {
        ElMessage({
          message: "删除班级成功",
          type: "success",
        });
      }
      closeDelDialog()
      getList()
    }).catch((err) => {
      ElMessage({
        message: err.msg,
        type: "error",
      });
    });
}

onMounted(() => {
  getList();
});
</script>

<style scoped>
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
