<template>
    <div>
        <div id="main" style="width: 100%;height:400px;"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import echarts from "echarts";
    Vue.prototype.$echarts = echarts;
    import {getdata} from "../api/tu";

    export default {
        name: "Statistics",
        data(){
          return{
              obj:{},
              option:{
                  title: {
                      text: "0"
                  },
                  tooltip: {

                  },
                  legend: {
                      data: ["销量"]
                  },
                  xAxis: {
                      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                  },
                  yAxis: {},
                  series: [
                      {
                          name: "销量",
                          type: "bar",
                          label: {
                              color:'#f00'
                          },
                          data: ['1','4','8','3']
                      }
                  ]
              },
              myChart:''

          }
        },
        methods:{
            drawChart() {
                this.myChart = this.$echarts.init(document.getElementById("main"));

            },


            getlist(){
                getdata({
                    params: {
                        type:101002
                    }
                })
                    .then(res=>{
                        if(res.result.code==2000){

                            this.obj.name = res.result.data.map((item)=>{
                                return item.name;
                            })
                            this.obj.count = res.result.data.map((item)=>{
                                return item.classCount;
                            })
                            this.option.xAxis.data = this.obj.name;
                            this.option.series[0].data = this.obj.count;
                            // window.console.log(this.option.xAxis.data);
                            // window.console.log(this.option.series.data);
                            window.console.log(this.option);
                            this.myChart.setOption(this.option);

                        }
                    })

            }

        },
        beforeMount() {


        },
        mounted(){
            this.drawChart();
            this.getlist();
        },
        watch: {
            //观察option的变化
            option: {
                handler(newVal, oldVal) {
                    if (this.myChart) {
                        if (newVal) {
                            this.myChart.setOption(newVal);
                        } else {
                            this.myChart.setOption(oldVal);
                        }
                    } else {
                        this.init();
                    }
                },
                deep: true //对象内部属性的监听，关键。
            }
        },
    }
</script>

<style scoped>

</style>