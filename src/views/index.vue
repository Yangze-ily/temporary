<template>
    <div class="box">
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input  v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "index",
        data() {
            return {
                labelPosition: 'right',
                form:{
                    username:'',
                    password:''
                }
            };
        },
        methods:{
            submit(){
                axios.post('http://erp.service.sxledao.com/api/v1/Home/Login',this.form)
                    .then(res=>{
                        window.console.log(res)
                        if (res.data.result.code == '2000'){
                            this.$store.commit('setToken',res.data.result.access_token);
                            document.cookie = 'token = '+res.data.result.access_token;
                            window.console.log(this.$store.state.token)
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            this.$router.push('/list')
                        }
                    })

            }
        }
    }
</script>

<style scoped>
.box{
    width: 500px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

}
</style>