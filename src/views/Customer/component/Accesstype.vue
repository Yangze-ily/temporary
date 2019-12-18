<template>
    <div>
        <el-select @focus="getAccesstypelist" v-model="Accesstype" placeholder="请选择客户分类">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in Accesstypelist" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {configure} from "../../../api/getConfigure";

    export default {
        name: "Accesstype",
        data(){
            return{
                Accesstype:'',
                Accesstypelist:[]
            }
        },
        methods:{
            getAccesstypelist(){
                if(this.Accesstypelist.length<=0){
                    configure.getAccesstype().then(res=>{
                        if(res.result.code == 2000){
                            this.Accesstypelist = res.result.data;
                        }
                    })
                }
            },
        }

    }
</script>

<style scoped>

</style>