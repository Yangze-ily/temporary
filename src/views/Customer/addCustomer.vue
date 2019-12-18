<template>
    <div>
        <div class="form">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="客户名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="客户类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="个人" value="1"></el-radio>
                        <el-radio label="企业" value="2"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="客户性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="保密" value="0"></el-radio>
                        <el-radio label="男" value="1"></el-radio>
                        <el-radio label="女" value="2"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="客户分类">
                    <Customerclass></Customerclass>
                </el-form-item>
                <el-form-item label="客户区域">
                    <region></region>
                </el-form-item>
                <el-form-item label="客户等级">
                    <el-select v-model="form.Grade" @focus="getgradelist" placeholder="请选择客户等级"  >
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in Grade" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户行业">
                    <Customerindustry></Customerindustry>
                </el-form-item>
                <el-form-item label="客户来源">
                    <Customersource></Customersource>
                </el-form-item>

                <el-form-item label="客户价值">
                    <el-select v-model="form.EvaluationId" placeholder="请选择客户价值">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号码">
                    <el-input v-model="form.Phone"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="QQ">
                    <el-input v-model="form.qq"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="职业">
                    <el-input v-model="form.occupation"></el-input>
                </el-form-item>

                <el-form-item label="企业规模">
                    <el-input v-model="form.scale"></el-input>
                </el-form-item>
                <el-form-item label="法定代表人">
                    <el-input v-model="form.corporation"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号">
                    <el-input v-model="form.dutyid"></el-input>
                </el-form-item>

                <el-form-item label="简介">
                    <el-input type="textarea" v-model="form.introduce" resize="none"></el-input>
                </el-form-item>

                <el-form-item label="联系人">
                    <Contacts @getContacts="getcontacts">123</Contacts>
                </el-form-item>
                <div class="button">
                    <el-button type="success" @click="addCustomer">保存并领用</el-button>
                    <el-button type="primary">保存到客户池</el-button>
                    <el-button @click="resetform">重置</el-button>
                </div>


            </el-form>

        </div>
    </div>
</template>

<script>
    import {kehu} from "../../api/kehu";
    import region from "../../components/region"
    import Contacts from "./component/Contacts"
    import Customerclass from "./component/addcustormer/Customerclass"
    import Customerindustry from "./component/addcustormer/Customerindustry"
    import Customersource from "./component/addcustormer/Customersource"
    export default {
        name: "addCustomer",
        components:{
            region,Contacts,Customerclass,Customerindustry,Customersource
    },
        data() {
            return {
                form: {

                },
                Grade:[],
                value1:'',
                rules: {
                    name: {
                        required: true,
                        message: '请输入客户的名称',
                        trigger: 'blur'
                    },
                    DepartmentId: {
                        required: true,
                        message: '请输入联系人的手机',
                        trigger: 'blur'
                    },
                    ClassifyId: {
                        required: true,
                        message: '选择分类',
                        trigger: 'blur'
                    },
                    GradeId: {
                        required: true,
                        message: '请选择等级',
                        trigger: 'blur'
                    },
                    Type: {
                        required: true,
                        message: '请选择类型',
                        trigger: 'blur'
                    },
                    TradeId: {
                        required: true,
                        message: '请选择行业',
                        trigger: 'blur'
                    },
                    OriginId: {
                        required: true,
                        message: '请选择来源',
                        trigger: 'blur'
                    },
                    EvaluationId: {
                        required: true,
                        message: '请选择价值',
                        trigger: 'blur'
                    }, Email: {
                        required: true,
                        message: '请输入电子邮箱',
                        trigger: 'blur'
                    }, Address: {
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }, Introduce: {
                        required: true,
                        message: '请输入个人简介',
                        trigger: 'blur'
                    }, Capital: {
                        required: true,
                        message: '请输入注册资本',
                        trigger: 'blur'
                    }, Corporation: {
                        required: true,
                        message: '请输入法人代表',
                        trigger: 'blur'
                    }, DutyID: {
                        required: true,
                        message: '请输入纳税人识别号',
                        trigger: 'blur'
                    },
                }
            }
        },
        methods: {
            // 重置表单
            resetform() {
                this.form = {}
            },
            // 获取等级列表
            getgradelist() {
                if(this.Grade.length<=0){
                    kehu.getvipGrade().then(res => {
                        if (res.result.code == 2000) {
                            this.Grade = res.result.data
                        }
                    })
                }

            },
            addCustomer(){
                kehu.ACustomer()
            },
            getcontacts(data){
                window.console.log(data)

            }
        }
    }
</script>

<style scoped>
    .form {
        width: 60%;
        margin: 0 auto;
    }

    .button {
       padding-left: 8%;
    }
</style>