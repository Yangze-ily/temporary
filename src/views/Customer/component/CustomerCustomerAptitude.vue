<template>
    <div class="CustomerCustomerAptitude">
        <div class="button">
            <el-button size="small"  type="primary" icon="el-icon-plus" @click="addqualification" ></el-button>
        </div>

        <div class="floating" v-show="flag">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="color: rgb(102,177,255);font-weight: bold">添加新的企业资质</span>
                    <el-button @click="flag=false" type="text" style="float: right; padding: 3px 0;color:red;"
                               icon="el-icon-circle-close"></el-button>
                    <el-button @click="addup" type="text" style="float: right; padding: 3px 0;margin-right: 8px;"
                               icon="el-icon-circle-check"></el-button>
                </div>
                <div class="text item">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="类型">
                            <el-select v-model="form.typeId" placeholder="选择类型" @focus="getleixing">
                                <el-option :label="item.name" :value="item.id" v-for="(item,index) in  leixinglist "
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="失效日期">
                            <el-date-picker
                                    v-model="form.expiryDate"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="证件代码">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-input v-model="form.image"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" resize="none" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>

        <!-- 卡片 -->
        <div class="card">
            <el-card class="box-card" v-for="(item,index) in  Aptitudelist" :key="index">
                <div class="cardcontent">
                    <div class="img">
                        <img src="https://hbimg.huabanimg.com/039aa99ed25232246f9002b67c4d5c557468b968c2d9-Flnot3_fw658"
                             alt="">
                        <!--<img :src="item.image" alt="">-->
                    </div>
                    <div class="con">
                        <div class="top">
                            <span>证件号码：{{item.code}}</span>
                            <span class="type">{{item.name}}</span>
                        </div>

                        <div class="datebox">
                            <div class="datecon">
                                <span>失效日期：</span>
                                <span>{{item.expiryDate | setdate}}</span>
                            </div>
                            <div class="remarks">
                                <span>备注：</span>
                                <span>{{item.remark}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="operation">
                        <el-button @click="upqualification(item)" style=" padding: 3px;" type="primary"
                                   icon="el-icon-edit" circle></el-button>
                        <el-button @click="del(item.id)" style=" padding: 3px;margin-right: 10px" type="danger"
                                   icon="el-icon-delete" circle></el-button>
                    </div>

                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import {configure} from "../../../api/getConfigure";

    export default {
        name: "CustomerCustomerAptitude",
        props:[
            'myid'
        ],
        data() {
            return {
                form: {
                    customerId: null,
                    typeId: null,
                    code: null,
                    image: null,
                    remark: null,
                    expiryDate: null,
                },

                Aptitudelist: [],
                leixinglist: [],
                flag: false,
                typestate: ''
            }
        },
        methods: {
            // 点击添加按钮
            addqualification() {
                this.flag = true;
                this.typestate = 'create';
                this.clearlist();
            },
            // 点击编辑按钮
            upqualification(item){
              this.flag = true;
              this.typestate = 'update';
              this.form = item;
                this.getleixing();
            },
            // 获取企业资质列表
            getqualifications() {
                configure.GCustomerCustomerAptitude({CustomerId:this.myid}).then(res=>{
                    if(res.result.code == 2000){
                        this.Aptitudelist = res.result.data;
                    }
                })
            },
            // 添加的方法
            add() {
                configure.ACustomerCustomerAptitude(this.form).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('添加成功');
                        this.flag = false;
                        this.getqualifications();
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            },
            // 更新数据
            update() {
                configure.UCustomerCustomerAptitude(this.form).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('修改成功');
                        this.flag = false;
                        this.getqualifications();
                    }else{
                        this.$message.error('修改失败')
                    }
                })
            },
            // 添加或修改
            addup() {
                this.form.customerId = this.myid;
                this.form.expiryDate = this.formatDate(this.form.expiryDate);
                if (this.typestate == 'create') {
                    this.add();
                }else{

                    this.update();
                }

            },
            // 删除
            del(id){
                configure.DCustomerCustomerAptitude({id:id}).then(res => {
                    if (res.result.code == 2000) {
                        this.$message.success('删除成功');
                        this.getqualifications();
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            // 获取类型
            getleixing() {
                configure.getQualificationtype().then(res => {
                    if (res.result.code == 2000) {
                        this.leixinglist = res.result.data;
                    }
                })
            },
            // 清空列表
            clearlist() {
                this.form = {
                    customerId: null,
                    typeId: null,
                    code: null,
                    image: null,
                    remark: null,
                    expiryDate: null,
                }
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
        mounted(){
            this.getqualifications();
        },
        filters: {
            setdate: function (value) {
                var zoneDate = new Date(value).toJSON();
                var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                return date;
            }

        },
        watch:{
            'myid':function (val) {
                this.myid = val;
                this.getqualifications()
            }
        }
    }
</script>
<style>
    .CustomerCustomerAptitude .el-card{
        margin-bottom: 2%;
    }
   .CustomerCustomerAptitude .el-card__body {
        padding: 0;
    }
</style>
<style scoped>
    .cardcontent {
        display: flex;
        justify-content: space-between;
    }

    .img {
        width: 13%;

    }

    .img > img {
        width: 100%;
        height: 100%;
    }

    .con {
        width: 70%;
        padding: 20px;
    }

    .type {
        margin-left: 2em;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid rgb(64, 158, 255);
        color: rgb(64, 158, 255);
        font-weight: 700;
    }

    .top {
        margin-bottom: 2%;
        color: #333;
    }

    .datecon {
        margin: 2% 0;
    }

    .top > span:first-child {
        font-size: 18px;
        font-weight: 600;

    }

    .datecon span {
        color: #666;
    }

    .remarks {
        color: #333;
    }

    .operation {
        padding-top: 5%;
        padding-right: 3%;
        box-sizing: border-box;
    }

    .card {

    }
    .floating{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .el-card{
        background-color: rgb(245,247,250);

    }
    .button{
        text-align: right;
        margin-bottom: 10px;
    }

</style>