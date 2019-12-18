<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="来源">
                <Customersource prestrain v-model="form.originId" ></Customersource>
            </el-form-item>
            <el-form-item label="跟进程度">
                <el-input type="textarea" resize="none" v-model="form.followUpDegree"></el-input>
            </el-form-item>
            <el-form-item label="价值评估">
                <!--<Customervalue ref="evaluationId" :evaluationId="form.evaluationId"></Customervalue>-->
            </el-form-item>
            <el-form-item label="信用等级">
                <el-select v-model="form.gradeId" placeholder="会员等级" >
                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in select"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="客户网址" >
                <el-input v-model="form.webSite"></el-input>
            </el-form-item>
            <el-form-item label="合作现状">
                <el-input type="textarea" resize="none" v-model="form.cooperationActuality"></el-input>
            </el-form-item>
            <el-form-item label="合作前景">
                <el-input type="textarea" resize="none" v-model="form.cooperationProspect"></el-input>
            </el-form-item>
            <el-form-item label="跟进策略">
                <el-input type="textarea" resize="none" v-model="form.followUpStrategy"></el-input>
            </el-form-item>
        </el-form>
        <div class="button">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>

    </div>
</template>

<script>
    import {kehu} from "../../../api/kehu";
    import Customersource from "./addcustormer/Customersource"
    // import Customervalue from "./addcustormer/Customervalue"

    export default {
        name: "Business",
        components:{
            Customersource,
        },
        props: [
            'myid'
        ],
        data(){
            return{
                form: {
                    customerId:null,
                    originId:null,
                    evaluationId:null,
                    gradeId:null,
                    followUpDegree:null,
                    webSite:null,
                    cooperationActuality:null,
                    cooperationProspect:null,
                    followUpStrategy:null,
                },
                select: [],
            }
        },
        methods:{
            onSubmit(){
                this.form.customerId = this.myid;
                // this.form.originId = this.$refs['originId'].customersource;
                // this.form.evaluationId = this.$refs['evaluationId'].Customervalue;
                kehu.AOrUpdateCustomerCommerce(this.form)
                    .then(res=>{
                        if(res.result.code ==2000){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    })

            },
            // 获取等级列表
            getgradelist() {
                if(this.select.length<=0){
                    kehu.getvipGrade().then(res => {
                        if (res.result.code == 2000) {
                            this.select = res.result.data
                        }
                    })
                }
            },

        //    获取商户信息
            getCustomerCommerce(){
                kehu.GCustomerCommerce({id:this.myid}).then(res => {
                    if (res.result.code == 2000) {
                        this.form = res.result.data;
                        // this.$refs['originId'].customersource = this.form.originId;
                        // this.$refs['evaluationId'].Customervalue = this.form.evaluationId;
                        // this.getgradelist();
                    }
                })
            }
        },
        created() {
            this.getCustomerCommerce()

        },
        watch:{
            myid:function (val) {
                this.myid = val;
                // this.getCustomerCommerce()
            }
        }
    }
</script>

<style scoped>
.button{
    margin-left: 80px;

}
</style>