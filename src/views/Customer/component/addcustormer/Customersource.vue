<template>
    <div>
        <el-select @visible-change="visibleChange" @change="change" v-model="value" placeholder="请选择客户来源">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {configure} from "../../../../api/getConfigure";

    export default {
        model:{
            prop:'selected',
            event:'change'
        },
        props:{
            selected:{
                type:String,
                default:null
            },
            prestrain:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                value:null,
                list:[]
            }
        },
        created(){
            this.value = this.selected;
            if(this.prestrain){
                this.getList();
            }
        },
        methods:{
            getList(){
                if(this.list.length<=0){
                    configure.getCustomersource().then(res=>{
                        if(res.result.code == 2000){
                            this.list = res.result.data;
                        }
                    })
                }
            },
            visibleChange(b){
                if(b&&!this.prestrain){
                    this.$nextTick(()=>{
                        this.getList();
                    })
                }
            },
            change(val){
                this.$emit('change',val);
            }
        },
        watch:{
            selected:function (val) {
                this.value=val;
            }
        }

    }
</script>

<style scoped>

</style>