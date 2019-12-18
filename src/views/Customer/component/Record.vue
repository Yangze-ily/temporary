<template>
    <div>
        <div>
            <div style="margin-bottom:5px;text-align:right;">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="adddatelist"></el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="title"
                        label="标题"
                        width="360"
                >
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="内容"
                >
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
                        <span style="color: rgb(102,177,255);font-weight: bold">添加新的备忘录</span>
                        <el-button @click="fag=false" type="text" style="float: right; padding: 3px 0;color:red;" icon="el-icon-circle-close"></el-button>
                        <el-button @click="addupdata" type="text" style="float: right; padding: 3px 0;margin-right: 8px;" icon="el-icon-circle-check"></el-button>
                    </div>
                    <div class="text item">
                        <el-form ref="form" label-width="80px">
                            <el-form-item label="标题">
                                <el-input v-model="form.title" @blur="gettit"></el-input>
                            </el-form-item>
                            <el-form-item label="内容">
                                <el-input v-model="form.content"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {kehu} from "../../../api/kehu";

    export default {
        name: "Record",
        props:[
            'myid'
        ],
        data() {
            return {
                form: {
                    customerId: null,
                    title: null,
                    content: null,
                },
                tableData: [],
                fag: false

            }
        },
        methods: {
            gettit(){
                if(!this.form.title && this.form.title!=''){
                    this.form.title  = '无标题备忘'
                }
            },


            addupdata(){
                if(this.dstate == 'create'){
                    this.form.CustomerId = this.myid;
                    kehu.AustomerAdversaria(this.form).then(res => {
                        if (res.result.code == 2000) {
                            this.$message.success('添加备忘录成功');
                            this.fag = false;
                            this.getdatelist();
                        }
                    })
                }  else{
                    kehu.UustomerAdversaria(this.form).then(res => {
                        if (res.result.code == 2000) {
                            this.$message.success('修改备忘录成功');
                            this.fag = false;
                            this.clearform();

                        }
                    })
                }
            },


            // 获取访问记录
            getdatelist() {
                setTimeout(
                    kehu.GCustomerAdversariaList({CustomerId: this.myid,}).then(res => {
                            if (res.result.code == 2000) {
                                this.tableData = res.result.data
                            }
                        })
                    ,0)

            },
            // 修改客户回访记录
            updatelist(row) {
                this.form = row;
                window.console.log(row);
                this.fag = true;
                this.dstate = 'update';

            },

            //  添加客户回访记录
            adddatelist() {
                this.fag = true;
                this.dstate = 'create';
                this.clearform();

            },

            //  删除客户回访记录
            deldatelist(id) {
                kehu.DCustomerAdversaria({id:id}).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('删除备忘录成功');
                        this.getdatelist()
                    }
                })
            },
            clearform(){
                this.form={
                    CustomerId: null,
                    title: null,
                    content: null,
                }
            },
        },
        beforeMount() {
            this.getdatelist()
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