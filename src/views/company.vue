<template>
    <div>

        <el-button type="primary" @click="addfalg">添加公司</el-button>

        <!--添加公司或者修改公司的弹出层-->
        <el-dialog
                title="添加公司"
                :visible.sync="comflag"
                width="50%"
                top="2%"
        >
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="编号" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>

                <el-form-item label="序号" prop="queue">
                    <el-input v-model="form.queue"></el-input>
                </el-form-item>

                <el-form-item label="描述" prop="intro">
                    <el-input v-model="form.intro"></el-input>

                </el-form-item>

                <el-form-item label="是否启用" prop="enabled">
                    <el-input v-model="form.enabled"></el-input>

                </el-form-item>

                <el-form-item label="父级" prop="parentid">
                    <el-input v-model="form.parentid"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="comflag = false">取 消</el-button>
                <el-button type="primary" @click="addupcomany">保 存</el-button>
            </span>
        </el-dialog>


        <el-table
                :data="tableData"
                row-key="id"
                border
                :tree-props="{children: 'childrens', hasChildren: 'hasChildren'}"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="公司名称"
            >
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="编号"
            >
            </el-table-column>

            <el-table-column
                    prop="intro"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="enabled"
                    label="是否启用">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="updfalg(scope.row)" plain>编辑</el-button>
                    <el-button type="danger" @click="del(scope.row)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="delcomflag"
                width="30%"
        >
            <span>确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delcomflag = false">取 消</el-button>
                <el-button type="primary" @click="delcomany">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        Acompany,
        Dcompany,
        Ucompany,
        GcompanyBuFId,
        GcompanyList,
    } from "../api/company";

    export default {
        name: "company",
        data() {
            return {
                comflag: false,
                delcomflag: false,
                delid: '',
                tableData: [],
                form: {
                    name: '',
                    code: '',
                    intro: '',
                    queue: '',
                    enabled: '',
                    parentid: ''
                },
                settype: null,
                rules: {
                    name: {
                        required: true,
                        message: '请输入公司的名称',
                        trigger: 'blur'
                    },
                    code: {
                        required: true,
                        message: '请输入公司的编号',
                        trigger: 'blur'
                    },
                    intro: {
                        required: true,
                        message: '请输入公司的序号',
                        trigger: 'blur'
                    },
                    queue: {
                        required: true,
                        message: '请输入公司的描述',
                        trigger: 'blur'
                    },
                    enabled: {
                        required: true,
                        message: '是否启用',
                        trigger: 'blur'
                    },

                }
            };
        },
        methods: {
            addfalg() {
                this.resetform();
                this.comflag = true;
                this.settype = 'create'
            },
            updfalg(row) {
                this.comflag = true;
                this.settype = 'update';
                delete row.childrens;
                delete row.parentId;
                row.enabled = row.enabled.toString();
                // window.console.log(row);
                this.form = Object.assign({}, row);
            },

            // 清空表单
            resetform() {
                this.form = {
                    name: null,
                    code: null,
                    intro: null,
                    queue: null,
                    enabled: null,
                    parentid: ''
                }
            },
            del(row) {
                this.delcomflag = true;
                this.delid = row.id;
            },


            // 获取公司列表 GcompanyList
            getcompany() {
                GcompanyList()
                    .then(res => {
                        if (res.result.code == '2000') {
                            this.$message.success('获取列表成功')
                            this.tableData = res.result.data;
                            // window.console.log(res.result);
                        }
                    })
            },

            //    添加或修改公司 Acompany
            addupcomany() {
                if(this.settype == 'create'){
                    Acompany(this.form)
                        .then(res => {
                            if (res.result.code == '2000') {
                                this.comflag = false;
                                this.resetform();
                                this.$message.success('添加成功');
                                this.getcompany();
                            }
                        })
                }else{
                    Ucompany(this.form)
                        .then(res => {
                            if (res.result.code == '2000') {
                                this.comflag = false;
                                this.resetform();
                                this.$message.success('修改成功');
                                this.getcompany();
                            }
                        })
                }
            },


            //    删除公司 Dcompany
            delcomany() {
                Dcompany({id: this.delid})
                    .then(res => {
                        if (res.result.code == '2000') {
                            this.delcomflag = false;
                            this.$message.success('删除成功');
                            this.getcompany();
                            window.console.log(res.result);
                        }
                    })
            },


            //    获取子公司信息 GcompanyBuFId
            getcomson() {
                GcompanyBuFId()
                    .then(res => {
                        if (res.result.code == '2000') {
                            window.console.log(res.result);
                        }
                    })
            }


        },
        beforeMount() {
            this.getcompany();
        }
    }
</script>

<style scoped>

</style>