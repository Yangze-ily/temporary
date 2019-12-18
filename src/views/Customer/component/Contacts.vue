<template>
    <div class="Contacts">
        <!-- 按钮 -->
        <el-button type="primary" @click="addContacts" style="margin-bottom: 10px">添加我的联系人+</el-button>

        <!--联系人列表卡片-->
        <el-card class="box-card" v-for="(item,index) in  custcontlist" :key="index">
            <div slot="header" class="clearfix">
                <div class="left">
                    <i style="color: rgb(64, 158, 255);margin-right: 6px" class="el-icon-user-solid"></i>
                    <strong>{{item.name}}</strong>
                </div>
                <div>
                    <el-button @click="edit(item,index)" style=" padding: 3px;" type="primary"
                               icon="el-icon-edit" circle></el-button>
                    <el-button @click="del(index)" style=" padding: 3px;margin-right: 10px" type="danger"
                               icon="el-icon-delete" circle></el-button>
                </div>
            </div>
            <div class="text item">
                <p><span>性别：{{item.sex | filsex }}</span> <span>职位：{{item.place}}</span><span>邮箱：{{item.email}}</span>
                </p>
                <p><span>手机：{{item.phone}}</span> <span>办公电话：{{item.officePhone}}</span>
                    <span>出生日期：{{item.birthday | setdate}}</span></p>
                <p>备注：{{item.remarks}}</p>
            </div>
        </el-card>

        <!-- 表单卡片 -->
        <div class="floating">
            <el-card class="box-card" v-show="flag">
                <div slot="header" class="clearfix">
                    <span style="color: rgb(102,177,255);font-weight: bold">添加新的联系人</span>
                    <div>
                        <el-button @click="nosave" type="text" style="float: right; padding: 3px 0;color:red;"
                                   icon="el-icon-circle-close"></el-button>
                        <el-button @click="save('form')" type="text"
                                   style="float: right; padding: 3px 0;margin-right: 8px;"
                                   icon="el-icon-circle-check"></el-button>
                    </div>
                </div>
                <div class="text item">
                    <el-form :rules="rules" ref="form" :model="CustomerContactsHelps" label-width="100px">
                        <el-form-item label="添加联系人" prop="name">
                            <el-input v-model="CustomerContactsHelps.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="CustomerContactsHelps.sex" placeholder="选择类型">
                                <el-option label="保密" value="0"></el-option>
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="出生日期">
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="办公电话">
                            <el-input v-model="CustomerContactsHelps.officePhone"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="CustomerContactsHelps.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="CustomerContactsHelps.email"></el-input>
                        </el-form-item>
                        <el-form-item label="职位">
                            <el-input v-model="CustomerContactsHelps.place"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" resize="none" v-model="CustomerContactsHelps.remarks"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>


        <!-- 对话框表单 当card为true时启用 -->
        <div>
            <el-dialog
                    title="添加新的联系人"
                    :visible.sync="dialogVisible"
                    top="1%"
            >
                <el-form :rules="rules" ref="form" :model="CustomerContactsHelps" label-width="100px">
                    <el-form-item label="添加联系人" prop="name">
                        <el-input v-model="CustomerContactsHelps.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户性别">
                        <el-radio-group v-model="CustomerContactsHelps.sex">
                            <el-radio label="保密" :value="0"></el-radio>
                            <el-radio label="男" :value="1"></el-radio>
                            <el-radio label="女" :value="2"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="办公电话">
                        <el-input v-model="CustomerContactsHelps.officePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model="CustomerContactsHelps.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="CustomerContactsHelps.email"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="CustomerContactsHelps.place"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" resize="none" v-model="CustomerContactsHelps.remarks"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save('form')">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {kehu} from "../../../api/kehu";
    /*
    * data数据
    *  dialogVisible：控制对话框的显示与隐藏
    *  custcontlist: 卡片列表
    *  CustomerContactsHelps: 表单内容存放
    *  value1: 日期处理
    *  custom:判断创建还是更新的状态
    *  flag：控制卡片的显示与隐藏
    * */
    export default {
        name: "Contacts",
        props: [
            'card', 'myid'
        ],
        data() {
            return {
                dialogVisible: false,
                custcontlist: [],
                CustomerContactsHelps: {},
                datas: [],
                value1: null,
                customstate: '',
                flag: false,
                rules: {
                    name: {
                        required: true,
                        message: '请输入联系人的名字',
                        trigger: 'blur'
                    },
                    phone: {
                        required: true,
                        message: '请输入联系人的手机',
                        trigger: 'blur'
                    },
                }


            }
        },
        methods: {

            /*
            * 卡片和对话框的显示与隐藏控制
            * 参数传入显示还是隐藏
            * 判断card是否开启
            * 开启：执行card对应的操作
            * 未开启：执行对话框的相应操作
            * */
            showOrHidden(type) {
                if (type == 'show') {
                    if (this.card == true) {
                        this.flag = true;
                    } else {
                        this.dialogVisible = true;
                    }
                } else {
                    if (this.card == true) {
                        this.flag = false;
                    } else {
                        this.dialogVisible = false;
                    }
                }
            },

            /*
            * 卡片请求
            * type参数传入save,update,del,不传默认为获取
            * 删除需要index参数传入id
            * 修改需要index参数传入整行
            * */
            cardsubmit(type, index) {
                if (this.card == true) {
                    this.CustomerContactsHelps.customerId = this.myid;
                    if (type == 'save') {
                        kehu.ACustomerCustomerContacts(this.CustomerContactsHelps).then(res=>{
                            if(res.result.code == 2000){
                                this.$message.success('添加联系人成功')
                                this.cardsubmit();
                            }else{
                                this.$message.error('添加联系人失败')
                                this.cardsubmit();
                            }
                        })
                    } else if (type == 'update') {
                        kehu.UCustomerCustomerContacts(index).then(res=>{
                            if(res.result.code == 2000){
                                this.$message.success('修改联系人成功')
                            }else{
                                this.$message.error('修改联系人失败')
                            }
                        })
                    } else if (type == 'del') {
                        let id = this.custcontlist[index].id;
                        kehu.DCustomerCustomerContacts({id: id}).then(res=>{
                            if(res.result.code == 2000){
                                this.$message.success('删除联系人成功')
                            }else{
                                this.$message.error('删除联系人失败')
                            }
                        })
                    } else {
                        kehu.GCustomerCustomerContacts({CustomerId: this.myid}).then(res => {
                            if (res.result.code == 2000) {
                                this.custcontlist = res.result.data;
                            }
                        })
                    }
                }
            },


            /*
            * 添加时前期配置
            * 1.清空列表
            * 2.显示卡片或对话框
            * 3.将状态设置为create
            * */
            addContacts() {
                this.CustomerContactsHelps = {};
                this.value1 = null;
                this.showOrHidden('show');
                this.custom = 'create'
            },


            // 添加控制
            add() {
                let list = Object.assign({}, this.CustomerContactsHelps);
                this.custcontlist.push(list);
                this.cardsubmit('save');
                this.showOrHidden('hidden');
            },


            // 保存时
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.value1 != null) {
                            this.CustomerContactsHelps.birthday = this.formatDate(this.value1)
                        }
                        if (this.custom == 'create') {
                            this.add()
                        } else {
                            let list = Object.assign({}, this.CustomerContactsHelps);
                            this.custcontlist.splice(this.arrindex, 1, list);
                            let item = this.custcontlist[this.arrindex];
                            this.cardsubmit('update', item);
                            this.showOrHidden('hidden')
                        }
                    } else {
                        return false;
                    }
                })
            },


            // 编辑时的前期配置
            edit(item, index) {
                this.arrindex = index;
                this.CustomerContactsHelps = item;
                this.value1 = this.CustomerContactsHelps.birthday;
                this.CustomerContactsHelps.sex = this.CustomerContactsHelps.sex.toString();
                window.console.log(this.CustomerContactsHelps);
                this.showOrHidden('show');
                this.custom = 'updata';
            },


            // 删除控制
            del(index) {
                this.cardsubmit('del', index);
                this.custcontlist.splice(index, 1);
            },

            // 卡片修改未保存
            nosave() {
                if (this.custom == 'updata') {
                    this.cardsubmit();
                }
                this.flag = false;

            },


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
        },


        mounted() {
            this.cardsubmit();
        },


        /*
        *  custcontlist：监听列表改变将数据抛出（非卡片模式下时需要抛出数据）
        * */
        watch: {
            custcontlist: function (val) {
                this.$emit('getContacts', val);
            },
            myid:function (val) {
                this.myid = val;
                this.getCustomerCommerce()
            }
        },

        /*
        * setdate：处理后台传来的时间格式
        * filsex：处理性别显示是后台数字的问题
        * */
        filters: {
            setdate: function (value) {
                var zoneDate = new Date(value).toJSON();
                var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                return date;
            },
            filsex: function (value) {
                let man = '男';
                let woman = '女';
                let secret = '保密';
                if (value == 1) {
                    return man;
                }
                if (value == 2) {
                    return woman;
                }
                if (value == 0) {
                    return secret;
                }
            }

        },
    };
</script>
<style>
    .Contacts .floating {
        position: fixed;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }

    .Contacts .el-card__header {
        padding: 10px 20px;
    }
</style>
<style scoped>
    .el-dialog__body {
        overflow: auto;
    }

    .el-form-item .el-form-item {
        margin-bottom: 30px;
    }

    .text p {
        margin: 0;
    }

    .text p > span {
        margin-right: 8px;
    }

    .el-card {
        margin-bottom: 10px;
    }

    .clearfix {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


</style>