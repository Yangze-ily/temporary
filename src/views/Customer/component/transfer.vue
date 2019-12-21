<template>
  <div class="transfer">
    <el-dialog title="客户转让" :visible.sync="dialogVisible">
      <el-col :gutter="20">
        <el-col :span="16">
          <!-- 客户列表 -->
          <el-card class="box-card">
            <span>客户列表：</span>
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
                <span v-show="retrieveList.length?false:true">暂无此客户</span>

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
              >添加客户到列表+</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card clist">
            <div class="search">
              <el-input
                v-model="requestData.seachname"
                placeholder="请输入同事的工号或姓名"
                @keyup.enter.native="getColleaguesList"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button type="primary" plain size="mini" @click="getColleaguesList">搜索</el-button>
            </div>

            <div
              class="list2"
              v-show="colleaguesList.length?true:false"
              v-for="(item,index) in  colleaguesList"
              :key="index"
              @click="checked(item,index)"
              :class="{active:item.active}"
            >
              <div class="headPortrait">
                <img
                  src="https://hbimg.huabanimg.com/9dd56b60d9e997e502ee0b1868b96224ea09e7bb9025-Pas2a5_fw658"
                  alt
                  v-if="item.photo==''"
                />
                <img v-else :src="item.photo" alt />
              </div>
              <div class="message">
                <div>职工：{{item.custos}}</div>
                <div>工号：{{item.code}}</div>
              </div>
            </div>
          </el-card>
          <span class="select-tip" v-if="colleague">已选择：{{colleague.custos}}</span>
        </el-col>
      </el-col>

      <div class="button">
        <el-button type="primary" @click="submitShare">确认转让</el-button>
        <!-- <a @click="test">测试</a> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { kehu } from '../../../api/kehu';

export default {
  name: 'transfer',
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
    }
  },
  data() {
    return {
      checkedList: this.value,
      form: {
        Listid: null,
        toStaffId: null,
        typeValue: 4
      },
      dialogVisible: false,
      inputVisible: false,
      inputValue: '',
      retrieveList: [],
      colvalue: '',
      colleaguesList: [],
      requestData: {
        page: 1,
        pageSize: 10,
        seachname: null
      },
      colleague: null
    };
  },
  methods: {
    // 选择同事
    checked(item) {
      item.active = true;
      this.colleague = item;
      this.form.toStaffId = item.id;
      window.console.log(item);
    },

    // 获取同事列表
    getColleaguesList() {
      kehu.GStaffListByDepartId(this.requestData).then(res => {
        if (res.result.code == 2000) {
          this.colleaguesList = res.result.data.item.map(item => {
            if (this.colleague && item.id == this.colleague.id && !this.row) {
              item.active = true;
            } else {
              item.active = false;
              this.colleague = null;
            }
            return item;
          });
        } else {
          this.$message.error('列表获取失败！');
        }
      });
    },

    // 重置表单
    clearform() {
      this.form = {
        Listid: null,
        toStaffId: null,
        typeValue: 4
      };
    },

    // 重置提交数据
    clearData() {
      this.requestData = {
        page: 1,
        pageSize: 10,
        seachname: null,
        code: null
      };
    },
    // 失去焦点时如果input中的值为空则关闭input框
    closeinput() {
      if (!this.inputValue) {
        this.inputVisible = false;
      }
    },

    // 点击转让按钮的提交
    submitShare() {
      if (this.checkedList.length == 0) {
        this.$message.error('您还没有选择要转让的客户！');
        return;
      }
      if (!this.form.toStaffId) {
        this.$message.error('您还没有选择要转让的同事！');
        return;
      }
      if (this.checkedList.length > 0 && this.form.toStaffId) {
        this.form.Listid = this.checkedList;
        window.console.log(this.form);
        kehu.customerToPond(this.form).then(res => {
          if (res.result.code == 2000) {
            this.$message.success('恭喜您，转让成功！');
            this.dialogVisible = false;
            this.clearform();
          } else {
            this.$message.error('分享失败！');
          }
        });
        window.console.log(this.form);
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
    handleClose(index) {
      this.checkedList.splice(index, 1);
    },

    // input框显示
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //检索列表
    retrieveListFn() {
      kehu.retrieve({ name: this.inputValue }).then(res => {
        if (res.result.code == 2000) {
          this.retrieveList = res.result.data;
        }
      });
    },

    // 点击外部按钮的转让
    transfer() {
      this.dialogVisible = true;
      this.getColleaguesList();
    },
    // 回车时启动列表检索
    handleInputConfirm() {
      if (this.inputValue && this.inputValue != '') {
        this.retrieveListFn();
      }
    }
  },
  watch: {
    dialogVisible: function(val) {
      if (val == true && this.row) {
        this.clearform();
      }
    },
    row: function(val) {
      if (val) {
        this.checkedList = [];
        this.listToText(val);
        window.console.log(val);
      }
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
.clist > .el-card__body {
  padding-top: 16%;
  /* transform: translateZ(0); */
}
</style>
<style scoped>
.el-card {
  height: 100%;
  overflow: auto;
  position: relative;
}

.el-col {
  height: 88%;
}
.button {
  text-align: right;
}
.bottom {
  display: flex;
  justify-content: space-between;
}

.cardItem {
  margin-bottom: 30px;
  width: 30%;
  height: 50%;
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
  vertical-align: baseline !important;
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

.list:hover {
  background-color: rgb(236, 245, 255);
  cursor: pointer;
  color: rgb(64, 158, 255);
}
.list2 {
  width: 100%;
  height: 40%;
  cursor: pointer;
  margin: 0 auto;
  padding: 8px;
  /* box-sizing: border-box; */
  background-color: #fff;
  border-bottom: 1px dashed rgb(226, 226, 226);
  display: flex;
}
.list2 > .headPortrait {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.list2 > .headPortrait > img {
  width: 100%;
  height: 100%;
}
.message div:first-child {
  font-weight: 600;
  color: #333;
}
.message div:last-child {
  font-size: 12px;
  color: #999;
}

.search {
  position: fixed;
  display: flex;
  margin-top: -46px;
  margin-left: -3px;
}
.list2:hover {
  background-color: rgb(232, 240, 252);
  color: #fff;
}
.active {
  background-color: rgb(185, 205, 235);
}
.select-tip {
  color: rgb(64, 158, 255);
}
</style>