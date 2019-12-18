<template>
    <div>
        <el-select @focus="getCustomervaluelist" v-model="Customervalue" placeholder="请选择客户价值">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in Customervaluelist" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {configure} from "../../../../api/getConfigure";
    export default {
        name: "Customervalue",
        props:[
          'evaluationId'
        ],
        data(){
            return{
                Customervalue:'',
                Customervaluelist:[]
            }
        },
        methods:{
            getCustomervaluelist(){
                if(this.Customervaluelist.length<=0){
                    configure.getCustomervalue().then(res=>{
                        if(res.result.code == 2000){
                            this.Customervaluelist = res.result.data;
                        }
                    })
                }
            }
        },
        watch:{
            evaluationId:function (val) {
                this.Customervalue = val;
                this.getCustomervaluelist();

            }
        }
    }
</script>

<style scoped>

</style>