<template>
    <div>
        <el-cascader
                placeholder="请选择客户区域"
                :options="options"
                :props="props"
                filterable
                @focus="getRegion"
        ></el-cascader>
    </div>
</template>

<script>
    import {region} from "../api/region";

    export default {
        name: "region",
        data(){
            return {
                options:[],
                props:{
                    label:'name',
                    value:'id',
                    lazy:true,
                    lazyLoad:this.lazyLoadfn
                },
                region:null,
            }
        },
        methods:{
            getRegion(){
                if(this.options.length<=0){
                    region.GRegionalInfo()
                        .then(res=>{
                            if(res.result.code==2000){
                                this.options= res.result.data;
                            }
                        })
                }
                window.console.log('121')

            },
            lazyLoadfn(node){
            region.GRegionalInfoByParentId({parentId:node.value})
                // window.console.log(node.value);
            }
        },

    }
</script>

<style scoped>

</style>