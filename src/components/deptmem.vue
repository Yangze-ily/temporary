<template>
    <div>
        <div @click="showdiv">
            <slot>
                <el-button>{{label}}</el-button>
            </slot>
        </div>

        <div >
            <el-dialog
                    :visible.sync="myflag"
            >
                <div class="box">
                    <div class="left">
                        <el-tree :data="datas" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>

                    <div class="right" v-show="dtype">
                        <el-tree :data="members" :props="defaultProps" @node-click="handleNodeClick2"></el-tree>
                    </div>

                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="myflag=false">取 消</el-button>
                    <el-button type="primary" @click="mysubmit">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {dept} from "../api/dept";

    export default {
        name: "deptmem",
        props: {
            dtype: {
                type: Boolean,
            },
            label:{
                default:'点击获取列表'
            }
        },
        data() {
            return {
                myflag: false,
                datas: [],
                members: [],
                defaultProps: {
                    children: 'childrens',
                    label: 'name'
                },
                submitdata: {},

            }
        },
        methods: {
            showdiv() {
                this.myflag = true;
            },

            getdeptlist() {
                dept.deptlist().then(res => {
                    if (res.result.code == 2000) {
                        this.datas = res.result.data;
                    }
                })
            },
            getmemberlist(id) {
                dept.staff({id: id}).then(res => {
                    if (res.result.code == 2000) {
                        this.members = res.result.data;
                    }
                })
            },
            handleNodeClick(data) {
                this.submitdata.deptid = data.id;
                if (this.submitdata.userid) {
                    delete this.submitdata.userid
                }
                if (this.dtype) {
                    this.getmemberlist(data.id)
                } else {
                    window.console.log(data.id)
                }
            },
            handleNodeClick2(data) {
                this.submitdata.userid = data.userId;
                window.console.log(data.userId)
            },
            mysubmit() {
                this.$emit('getdata',this.submitdata)
            }
        },
        beforeMount() {
            this.getdeptlist()
        },

    }
</script>

<style scoped>
    .box {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .box .left {
        width: 100%;
    }

    .box .right {
        width: 100%;
    }
</style>