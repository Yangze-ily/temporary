<template>
    <div>
        <el-form ref="form" :model="vipmsg" label-width="80px">

            <el-form-item label="性别">
                <el-select v-model="vipmsg.sex" placeholder="请选择性别">
                    <el-option label="保密" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="vipmsg.birthday"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="QQ号">
                <el-input v-model="vipmsg.qq"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="vipmsg.address"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍">
                <el-input type="textarea" resize="none" v-model="vipmsg.introduce"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit" style="margin-left: 80px;">保存</el-button>
    </div>
</template>

<script>
    import {kehu} from "../../../api/kehu";

    export default {
        name: "vipmsg",
        props:[
            'myid','typeValue'
        ],
        data(){
            return{
                vipmsg: {
                    id:this.myid,
                    sex: null,
                    birthday:null,
                    qq: null,
                    address: null,
                    introduce: null,
                },
            }
        },
        methods:{
            // 时间处理函数
            formatDate(value) {
                const date = new Date(value);
                let Y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                const t = Y + '-' + m + '-' + d;
                return t;

            },

            getmsg(){
                kehu.querymsg({typeValue:this.typeValue,id:this.myid})
                    .then(res=>{
                        if(res.result.code == 2000){
                            this.vipmsg = res.result.data;
                            window.console.log(this.vipmsg)
                        }
                    })
                window.console.log(this.myid)

            },
            onSubmit(){
                this.vipmsg.birthday = this.formatDate(this.vipmsg.birthday);
                    kehu.updatamsg(this.vipmsg)
                    .then(res=>{
                        if(res.result.code ==2000){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    })

            }
        },
        beforeMount(){
            this.getmsg();
        },
        watch:{
            'myid':function (val) {
                this.myid = val;
                this.getmsg();
            }
        }

    }
</script>

<style scoped>

</style>