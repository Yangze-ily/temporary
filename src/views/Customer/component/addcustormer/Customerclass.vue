<template>
    <div>
        <el-select @focus="getCustomerclasslist" v-model="classification" placeholder="请选择客户分类">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in customerclasslist" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {configure} from "../../../../api/getConfigure";

    export default {
        name: "Customerclass",
        data(){
            return{
                classification:'',
                customerclasslist:[]
            }
        },
        methods:{
            getCustomerclasslist(){
                if(this.customerclasslist.length<=0){
                    configure.getCustomerclass().then(res=>{
                        if(res.result.code == 2000){
                            this.customerclasslist = res.result.data;
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>