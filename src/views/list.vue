<template>
    <div>
        <el-tree :data="datas" :props="defaultProps"></el-tree>
    </div>
</template>

<script> 
    import axios from 'axios';

    export default {
        name: "list",
        data() {
            return {
                token: '',
                datas: [],
                defaultProps: {
                    children: 'childrens',
                    label:'name'
                }
            };
        },
        methods: {
            getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            },
            getToken() {
                this.token = this.getCookie('token');
            },
            getlist() {
                axios({
                    method: 'get',
                    url: 'http://erp.service.sxledao.com/api/v1/Department/GDepartmentList',
                    headers: {'Authorization': 'Bearer ' + this.token},

                })
                    .then(res => {
                        if (res.data.result.code == '2000') {
                            this.datas = res.data.result.data;
                            window.console.log( res.data.result.data[0].name);
                            window.console.log( res.data.result.data[0].childrens[0].name);
                        }
                    })
            }

        },
        beforeMount() {
            this.getToken();
            this.getlist();
        }
    }
</script>

<style scoped>

</style>