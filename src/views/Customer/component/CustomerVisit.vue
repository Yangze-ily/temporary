<template>
    <div>
        <!--Timeline-->
        <el-timeline>
            <div style="position: absolute;left: 44px;top: 10px;z-index: 1">
                <el-button  size="small" type="primary" icon="el-icon-plus" @click="adddatelist" circle></el-button>
            </div>
            <el-timeline-item color="rgb(170, 206, 242)" :timestamp="item.creationTime | setdate" placement="top" v-for="(item,index) in tableData" :key="index">
                <el-card>
                    <div style="float: right">
                        <el-button @click="updatelist(item)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button @click="deldatelist(item.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                    <h4>{{item.name}}</h4>
                    <div>{{item.detail}}</div>
                </el-card>
            </el-timeline-item>
        </el-timeline>


        <div class="floating" v-show="fag">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="color: rgb(102,177,255);font-weight: bold">添加新的收货地址</span>
                    <el-button @click="nosave" type="text" style="float: right; padding: 3px 0;color:red;"
                               icon="el-icon-circle-close"></el-button>
                    <el-button @click="addupdata" type="text" style="float: right; padding: 3px 0;margin-right: 8px;"
                               icon="el-icon-circle-check"></el-button>
                </div>
                <div class="text item">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="回访类型">
                            <el-select  v-model="form.typeId" placeholder="请选择客户分类">
                                <el-option :label="item.name" :value="item.id" v-for="(item,index) in Accesstypelist"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="form.detail"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
    import {kehu} from "../../../api/kehu";
    import {configure} from "../../../api/getConfigure";

    export default {
        name: "CustomerVisit",

        props: [
            'myid'
        ],
        data() {
            return {
                form: {
                    customerId: null,
                    typeId: null,
                    detail: null,
                },
                tableData: [],
                fag: false,
                Accesstypelist: [],

            }
        },
        methods: {
            // 添加或修改
            addupdata() {
                if (this.dstate == 'create') {
                    this.form.customerId = this.myid;
                   this.add();
                } else {
                   this.update();
                }
            },
            // 添加时的请求
            add(){
                kehu.ACustomerVisit(this.form).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('添加回访记录成功');
                        this.fag = false;
                        this.getdatelist();
                    }
                })
            },

            //更新时的请求
            update(){
                kehu.UCustomerVisit(this.form).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('修改回访记录成功');
                        this.fag = false;
                        this.clearform();
                        this.getdatelist();

                    }
                })
            },


            // 获取访问记录
            getdatelist() {
                kehu.GCustomerVisitList({CustomerId: this.myid,}).then(res => {
                    if (res.result.code == 2000) {
                        this.tableData = res.result.data
                    }
                })
            },
            // 修改客户回访记录前期准备
            updatelist(row) {
                this.form = row;
                this.fag = true;
                this.dstate = 'update';
                this.getAccesstypelist()
            },

            //  添加客户回访记录前期准备
            adddatelist() {
                this.fag = true;
                this.dstate = 'create';
                this.clearform();
                this.getAccesstypelist()
            },

            //  删除客户回访记录
            deldatelist(id) {
                kehu.DCustomerVisit({id: id}).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('删除回访记录成功');
                        this.getdatelist()
                    }
                })
            },
            // 清空表单
            clearform() {
                this.form = {
                    customerId: null,
                    typeId: null,
                    detail: null,
                }
            },

            // 获取回访类型列表
            getAccesstypelist() {
                if (this.Accesstypelist.length <= 0) {
                    configure.getAccesstype().then(res => {
                        if (res.result.code == 2000) {
                            this.Accesstypelist = res.result.data;
                        }
                    })
                }
            },

        //    关闭
            nosave(){
                if(this.form){
                    this.getdatelist()
                }
                this.fag=false;

            }
        },
        mounted() {
            this.getdatelist()
        },
        filters: {
            setdate: function (value) {
                var zoneDate = new Date(value).toJSON();
                var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                return date;
            }
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
    .floating {
        position: fixed;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }

    .el-card {
        background-color: rgb(245, 247, 250);

    }
</style>