<template>
    <div>
        <div style="margin-bottom:5px;text-align:right;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="adddatelist"></el-button>

        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="address"
                    label="地址"
                    >
            </el-table-column>
            <el-table-column
                    prop="contacts"
                    label="联系人"
                    >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    width="160"
                    label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="updatelist(scope.row)"></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="deldatelist(scope.row.id)"></el-button>

                </template>
            </el-table-column>

        </el-table>

        <div class="floating" v-show="fag">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="color: rgb(102,177,255);font-weight: bold">添加新的收货地址</span>
                    <el-button @click="fag=false" type="text" style="float: right; padding: 3px 0;color:red;" icon="el-icon-circle-close"></el-button>
                    <el-button @click="addupdata" type="text" style="float: right; padding: 3px 0;margin-right: 8px;" icon="el-icon-circle-check"></el-button>
                </div>
                <div class="text item">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="联系人">
                            <el-input v-model="form.contacts"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {kehu} from "../../../api/kehu";

    export default {
        name: "uaddress",
        props:[
            'myid'
        ],
        data() {
            return {
                form: {
                    id: null,
                    address: null,
                    contacts: null,
                    phone: null,
                },
                tableData: [],
                fag: false

            }
        },
        methods: {
            addupdata(){
              if(this.dstate == 'create'){
                  kehu.aaddress(this.form).then(res => {
                      if (res.result.code == 2000) {
                          this.$message.success('添加收货地址成功');
                          this.fag = false;
                          this.getdatelist();
                      }
                  })
              }  else{
                  kehu.uaddress(this.form).then(res => {
                      if (res.result.code == 2000) {
                          this.$message.success('修改收货地址成功');
                          this.fag = false;
                          this.clearform();

                      }
                  })
              }
            },



            // 获取用户收货的地址
            getdatelist() {
                setTimeout(
                    kehu.gaddress({id: this.myid}).then(res => {
                        if (res.result.code == 2000) {
                            this.tableData = res.result.data
                        }
                    })
                ,1000)

            },
            // 修改用户收货的地址
            updatelist(row) {
                this.form = row;
                window.console.log(row);
                this.fag = true;
                this.dstate = 'update';

            },

            //  添加用户的收货地址
            adddatelist() {
                this.fag = true;
                this.dstate = 'create';
                this.clearform();

            },

            //  删除用户的收货地址
            deldatelist(id) {
                kehu.daddress({id:id}).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('删除收货地址成功');
                        this.getdatelist()
                    }
                })
            },
            clearform(){
                this.form={
                        id: this.myid,
                        Address: null,
                        Contacts: null,
                        Phone: null,
                }
            },
        },
        beforeMount() {
            // this.getdatelist()
        },
        watch:{
            'myid':function (val) {
                this.myid = val;
                this.getdatelist()
            }
        }
    }
</script>

<style scoped>
.floating{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
    .el-card{
        background-color: rgb(245,247,250);

    }
</style>