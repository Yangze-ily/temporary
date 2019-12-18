<template>
    <div>
        <el-select @focus="getCustomerindustrylist" v-model="customerindustry" placeholder="请选择客户行业">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in Customerindustrylist" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {configure} from "../../../../api/getConfigure";

    export default {
        name: "Customerindustry",
        data(){
            return{
                customerindustry:'',
                Customerindustrylist:[]
            }
        },
        methods:{
            getCustomerindustrylist(){
                if(this.Customerindustrylist.length<=0){
                    configure.getCustomerindustry().then(res=>{
                        if(res.result.code == 2000){
                            this.Customerindustrylist = res.result.data;
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>