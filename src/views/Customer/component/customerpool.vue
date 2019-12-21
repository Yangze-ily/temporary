<template>
  <div>
    <el-button type="text" @click="Customerpool(rowId)">抛入客户池</el-button>

    <div class="reason">
      <el-dialog title="抛入客户池" :visible.sync="flag" width="30%">
        <div>
          <el-form>
            <el-input
              type="textarea"
              style="height: 100px;"
              resize="none"
              v-model="customerPoolData.explain"
              placeholder="请输入抛入原因..."
            ></el-input>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { kehu } from '../../../api/kehu';

export default {
  name: 'customerpool',
  props: ['rowId'],
  data() {
    return {
      customerPoolData: {},
      flag: false
    };
  },
  methods: {
    // 抛入客户池的前期工作
    Customerpool(id) {
      this.flag = true;
      this.customerPoolData.typeValue = 1;
      this.customerPoolData.id = id;
    },

    //抛入客户池时提交
    submit() {
      if (this.customerPoolData.explain) {
        kehu.customerToPond(this.customerPoolData).then(res => {
          if (res.result.code == 2000) {
            this.$message.success('抛入成功！');
            this.flag = false;
            this.customerPoolData = {};
            this.$emit('refresh');
          } else {
            this.$message.error('抛入失败！');
            this.flag = false;
          }
        });
      } else {
        this.$message.error('请输入抛入客户池的原因！');
      }
    }
  }
};
</script>

<style scoped>
</style>