<template>
    <div class="myCustomer">
        <div class="shai">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入搜索名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="会员等级">
                    <el-select v-model="form.gradeId" placeholder="会员等级" @focus="getgradelist">
                        <el-option label="无" :value="null"></el-option>
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in select"
                                   :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="clearform">重置</el-button>
                </el-form-item>
            </el-form>

        </div>


        <div class="table">
            <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                        width="45"
                >
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="客户">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="标签">
                    <template>
                        <el-popover
                                placement="bottom"
                                title="标题"
                                width="200"
                                trigger="hover"
                        >
                            <el-button slot="reference" size="small" icon="el-icon-plus"></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="客户名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                        <el-tag size="mini" type="success" v-if="scope.row.type==1">个人</el-tag>
                        <el-tag size="mini" v-if="scope.row.type==2">企业</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        label="注册时间"
                        width="100"
                >
                    <template slot-scope="scope">
                        {{scope.row.creationTime | setdate }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="来源"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="200"
                        label="操作">

                    <template slot-scope="scope">
                        <el-button type="text" @click="Customerpool">抛入客户池</el-button>
                        <el-button type="text" icon="el-icon-refresh"></el-button>
                        <el-button type="text" icon="el-icon-share"></el-button>
                        <el-button type="text" icon="el-icon-more" @click="openmore(scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>


        </div>
        <div class="mores">
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="80%"
                    top="1%"
            >
                <el-tabs type="border-card">
                    <el-tab-pane label="客户信息">
                        <vipmsg :myid="myid" :typeValue="typeValue"></vipmsg>
                    </el-tab-pane>

                    <el-tab-pane label="回访记录" lazy>
                        <CustomerVisit :myid="myid"></CustomerVisit>
                    </el-tab-pane>

                    <el-tab-pane label="备忘录" lazy>
                        <Record :myid="myid"></Record>
                    </el-tab-pane>

                    <el-tab-pane label="商务信息" lazy>
                        <Business :myid="myid"></Business>
                    </el-tab-pane>

                    <el-tab-pane label="记录" lazy>

                    </el-tab-pane>

                    <el-tab-pane label="客户收货地址" lazy>
                        <uaddress :myid="myid"></uaddress>
                    </el-tab-pane>

                    <el-tab-pane label="企业资质" lazy>
                        <CustomerCustomerAptitude :myid="myid"></CustomerCustomerAptitude>
                    </el-tab-pane>

                    <el-tab-pane label="企业联系人" lazy>
                        <Contacts :myid="myid" :card="true"></Contacts>
                    </el-tab-pane>

                    <el-tab-pane label="合同" lazy>

                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div>

        <div class="page">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="pages"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {kehu} from "../../api/kehu";

    // const vipmsg = resolve => require(['./component/vipmsg'],resolve)
    // const vipmsg = () => import("./component/vipmsg")
    // const Business = () => import("./component/Business")
    // const uaddress = () => import("./component/uaddress")
    // const CustomerVisit = () => import("./component/CustomerVisit")
    // const Record = () => import("./component/Record")

    // import vipmsg from "./component/vipmsg"
    // import Business from "./component/Business"
    // import uaddress from "./component/uaddress"
    // import CustomerVisit from "./component/CustomerVisit"
    // import Record from "./component/Record"

    export default {
        name: "myCustomer",
        components: {
            vipmsg: () => import("./component/vipmsg"),
            Business: () => import("./component/Business"),
            uaddress: () => import("./component/uaddress"),
            CustomerVisit: () => import("./component/CustomerVisit"),
            Record: () => import("./component/Record"),
            CustomerCustomerAptitude: () => import("./component/CustomerCustomerAptitude"),
            Contacts: () => import("./component/Contacts")
        },
        data() {
            return {
                select: [],
                dialogVisible: false,
                value1: '',
                value2: '',
                datalist: [],
                total: 100,
                myid: null,
                typeValue: null,
                form: {
                    gradeId: null,
                    typeValue: null,
                    name: null,
                    startTime: null,
                    endTime: null,
                },
                page: 1,
                pageSize: 10,
                tableData: []
            }
        },
        methods: {
            Customerpool(){

            },

            openmore(row) {
                this.dialogVisible = true;
                this.myid = row.id;
                this.typeValue = row.type;
                window.console.log(this.typeValue)
                window.console.log(this.myid)
            },

            // 获取客户列表
            kehu() {
                kehu.getkehu({
                    gradeId: this.form.gradeId,
                    typeValue: this.form.typeValue,
                    name: this.form.name,
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    page: this.page,
                    pageSize: this.pageSize,
                }).then(res => {
                    if (res.result.code == 2000) {
                        this.tableData = res.result.data.item;
                        this.datalist = res.result.data.item;
                        this.total = res.result.data.total;
                    }
                })
            },

            // 获取等级列表
            getgradelist() {
                if (this.select.length <= 0) {
                    kehu.getvipGrade().then(res => {
                        if (res.result.code == 2000) {
                            this.select = res.result.data
                        }
                    })
                }
            },

            // 提交筛选条件
            onSubmit() {
                if (this.value1) {
                    this.form.startTime = this.formatDate(this.value1[0]);
                    this.form.endTime = this.formatDate(this.value1[1]);
                }
                this.kehu();
            },

            // 重置筛选条件
            clearform() {
                this.form = {
                    gradeId: null,
                    typeValue: null,
                    name: null,
                    startTime: null,
                    endTime: null,
                }
                this.value1 = null;
            },
            // 分页
            pages(page) {
                this.page = page;
                this.kehu();
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
        filters: {
            setdate: function (value) {
                var zoneDate = new Date(value).toJSON();
                var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                return date;
            }
        },
        mounted() {
            this.kehu();
        },

    }
</script>
<style>
    .el-tabs--border-card>.el-tabs__content{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .el-dialog__body {
        padding-top: 10px;
        height: 90%;

    }

    .el-tabs {
        height: 100%;

    }

    .el-dialog {
        height: 90%;
        margin-bottom: 0;
    }

    .el-tabs--border-card > .el-tabs__content {
        height: 90%;
        overflow: auto;

    }
</style>
<style scoped>
    .page {
        text-align: center;
    }


    .table {
        margin-bottom: 30px;
    }
</style>