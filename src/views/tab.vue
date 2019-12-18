<template>
    <div>
        <deptmem dtype ref="son" label="获121取1" @getdata="getid"></deptmem>
    </div>
</template>

<script>
    import deptmem from '../components/deptmem'
    export default {
        name: "tab",
        components: {
            deptmem
        },
        data() {
            return {
                flag: '',
                datas:null,
            };
        },
        methods: {
            getid(data){
                window.console.log(data);
            }

        },

    }
</script>

<style scoped>

</style>