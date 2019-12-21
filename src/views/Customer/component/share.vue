<template>
  <div class="share">
    <!--外部的分享按钮-->

    <!-- 弹出框 -->
    <el-dialog title="分享" :visible.sync="dialogVisible">
      <!-- 客户列表 -->
      <div class="cardItem">
        <span>客户列表：</span>
        <el-card class="box-card">
          <div class="text item">
            <el-tag
              :key="index"
              v-for="(tag,index) in checkedList"
              closable
              :disable-transitions="false"
              @close="handleClose(index)"
            >{{tag.name}}</el-tag>

            <el-popover placement="bottom" trigger="focus">
              <div
                class="list"
                v-show="retrieveList.length?true:false"
                v-for="(item,index) in retrieveList"
                :key="index"
                @click="listToText(item)"
              >{{item.name}}</div>
              <span v-show="retrieveList.length===0">暂无此客户</span>
              <el-input
                slot="reference"
                class="input-new-tag"
                v-show="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="closeinput"
              ></el-input>
            </el-popover>
            <el-button
              v-show="!inputVisible"
              class="button-new-tag"
              size="small"
              @click="showInput"
            >添加客户到分享列表+</el-button>
          </div>
        </el-card>
      </div>

      <!-- 同事列表 -->
      <div class="cardItem">
        <span>同事列表：</span>
        <el-card class="box-card">
          <div class="text item">
            <el-tag
              :key="index"
              v-for="(tag,index) in colleaguesList"
              closable
              type="danger"
              :disable-transitions="false"
              @close="handleClose(index,'col')"
            >{{tag.custos}}</el-tag>

            <el-popover placement="bottom" trigger="focus">
              <div
                class="list2"
                v-show="colList.length?true:false"
                v-for="(item,index) in colList"
                :key="index"
                @click="listToText2(item)"
              >{{item.custos}}</div>
              <span v-show="colList.length?false:true">暂无此同事</span>

              <el-input
                slot="reference"
                class="input-new-tag"
                v-show="inputVisibleCol"
                v-model="inputValueCol"
                ref="saveTagInputCol"
                size="small"
                @keyup.enter.native="handleInputConfirm('col')"
                @blur="closeinput('col')"
              ></el-input>
            </el-popover>
            <el-button
              v-show="!inputVisible"
              class="button-new-tag"
              size="small"
              @click="showInput('col')"
            >添加同事到分享列表+</el-button>
          </div>
        </el-card>
      </div>

      <!-- 分享天数的步进器 -->
      <div class="bottom">
        <div class="day">
          <span>分享天数：</span>
          <el-input-number size="mini" v-model="form.day" :min="1"></el-input-number>
          <span>天</span>
        </div>

        <!-- 确认分享的按钮  -->
        <div class="button">
          <el-button type="primary" @click="submitShare">确认分享</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { kehu } from '../../../api/kehu';

export default {
  name: 'share',
  // model: {
  //   prop: 'checkedList'
  // },
  props: {
    row: {
      default: null
    },
    value: {
      type: Array,
      default: Array
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        day: 1
      },
      dialogVisible: false,
      inputVisibleCol: false,
      inputVisible: false,
      inputValue: '',
      inputValueCol: '',
      retrieveList: [],
      colleaguesList: [],
      colList: [],
      checkedList: this.value
    };
  },
  methods: {
    // 失去焦点时如果input中的值为空则关闭input框
    closeinput(type) {
      if (type == 'col') {
        if (!this.inputValueCol) {
          this.inputVisibleCol = false;
        }
      } else {
        if (!this.inputValue) {
          this.inputVisible = false;
        }
      }
    },

    // 点击分享按钮的提交
    submitShare() {
      if (this.checkedList.length == 0) {
        this.$message.error('您还没有将要分享客户添加到列表！');
        return;
      }
      if (this.colleaguesList.length == 0) {
        this.$message.error('您还没有将要分享的同事添加到列表！');
        return;
      }
      if (this.checkedList.length > 0 && this.colleaguesList.length > 0) {
        this.form.listcid = this.checkedList;
        this.form.StaffIdListHelp = this.colleaguesList;
        window.console.log(this.checkedList);
        window.console.log(this.colleaguesList);
        window.console.log(this.form);

        kehu.ACustomerListShareToPeople(this.form).then(res => {
          if (res.result.code == 2000) {
            this.$message.success('恭喜您，分享成功！');
            this.dialogVisible = false;
            // this.colleaguesList = [];
            // this.checkedList = [];
            // this.form.listcid = null;
            // this.form.StaffIdListHelp = null;
            // this.form.day = 1;
          } else {
            this.$message.error('分享失败！');
          }
        });
      }
    },

    listToText2(row) {
      //  需要判断该列表中是否已经存在了id一致的客户
      let arr = this.colleaguesList.filter(function(item) {
        if (item.id == row.id) {
          return item;
        }
      });
      if (arr.length) {
        this.$message.error('客户列表中已经有该客户了！');
      } else {
        this.colleaguesList.push(row);
        if (this.inputValueCol) {
          this.inputVisibleCol = false;
          this.inputValueCol = '';
          this.colList = [];
        }
      }
    },

    // 点击列表，上字
    listToText(row) {
      //  需要判断该列表中是否已经存在了id一致的客户
      let arr = this.checkedList.filter(function(item) {
        if (item.id == row.id) {
          return item;
        }
      });
      if (arr.length) {
        this.$message.error('客户列表中已经有该客户了！');
      } else {
        this.checkedList.push(row);
        if (this.inputValue) {
          this.inputVisible = false;
          this.inputValue = '';
          this.retrieveList = [];
        }
      }
    },

    // 点击关闭时
    handleClose(index, type) {
      if (type == 'col') {
        this.colleaguesList.splice(index, 1);
      } else {
        this.checkedList.splice(index, 1);
      }
    },

    // input框显示
    showInput(type) {
      if (type == 'col') {
        this.inputVisibleCol = true;
        this.$nextTick(() => {
          this.$refs.saveTagInputCol.$refs.input.focus();
        });
      } else {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    },

    //检索列表
    retrieveListFn(type) {
      if (type == 'col') {
        kehu.retrieveCol({ seachname: this.inputValueCol }).then(res => {
          if (res.result.code == 2000) {
            this.colList = res.result.data;
          }
        });
      } else {
        kehu.retrieve({ name: this.inputValue }).then(res => {
          if (res.result.code == 2000) {
            this.retrieveList = res.result.data;
          }
        });
      }
    },

    // 回车时启动列表检索
    handleInputConfirm(type) {
      if (type == 'col') {
        if (this.inputValueCol && this.inputValueCol != '') {
          this.retrieveListFn('col');
        }
      } else {
        if (this.inputValue && this.inputValue != '') {
          this.retrieveListFn();
        }
      }
    },

    // 点击外部按钮的分享时显示分享的对话框
    share() {
      this.dialogVisible = true;
      if (this.row) {
        this.form = {
          day: 1
        };
        this.colleaguesList = [];
      }
    }
  },
  watch: {
    // dialogVisible: function(val) {
    //   if (val == true && this.row) {
    //     // this.checkedList = [];
    //     // this.$emit('input', this.checkedList);
    //   }
    // },
    row: function(val) {
      this.checkedList = [];
      this.listToText(val);
    },
    value: function(val) {
      this.checkedList = [];
      this.checkedList = val;
      window.console.log(this.checkedList);
    }
  }
};
</script>
<style>
</style>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
}

.cardItem {
  margin-bottom: 30px;
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

.el-input-number {
  margin: 0 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: baseline !important;
}

.list:hover {
  background-color: rgb(236, 245, 255);
  cursor: pointer;
  color: rgb(64, 158, 255);
}

.list2:hover {
  background-color: rgb(254, 240, 240);
  cursor: pointer;
  color: rgb(245, 108, 108);
}
</style>