// var todayInCallContainer = null; //呼入量
var responseRateContainer = null; //应答率
var talkTimeContainer = null; //通话率


var vm = new Vue({
    name: 'monitor',
    el: '#app',
    data: {
        btnTitle1: '全部渠道', //按钮名称
        btnTitle2: '手机银行', //按钮名称
        btnTitle3: '全部技能组', 
        btnTitle4: '个人业务咨询'
    },
    mounted(){
        // this.todayInCallEcharts();
        this.responseRateEcharts();
        
        setTimeout(() =>{
            this.refreshResponseRateEchartsEcharts()
        },2000)

    },
    methods: {
        dropdown(){
            console.log(111)
        },
        dropdown2(){
            console.log(111)
        },

        //呼入量
        // todayInCallEcharts(){
        //     console.log(this.$refs.todayInCallEcharts)
        //     var dom = this.$refs.todayInCallEcharts;
        //     todayInCallContainer = echarts.init(dom)
        //     var option = {
        //         xAxis: {
        //             type: 'category',
        //             axisTick: {
        //                 show: false //不显示坐标轴刻度线
        //             },
        //             axisLine: {
        //                 show: false //不显示坐标轴线
        //             },
        //             axisLabel: {
        //                 show: false //不显示坐标轴上的文字
        //             },
        //             boundaryGap: false,
        //         },
        //         yAxis: {
        //             show: false
        //         },
        //         grid: {
        //             x: 0,
        //             y: 0,
        //             x2: 0,
        //             y2: 0,
        //             buttom: 10,
        //             top: 1
        //         },
        //         series: [{
        //             name: '呼入量',
        //             type: 'line',
        //             data: [111,433,820,124,444, 932,111,901,243, 934,66, 1290, 1330, 1320],
        //             smooth: true,
        //             symbol: 'none',  //取消这点圆圈
        //             areaStyle: {},
        //             color: '#975FE4', //改变区域颜色
        //             lineStyle: {
        //                 width: 0
        //             },
        //         }]
        //     }
        //     if(option && typeof option === 'object') {
        //         todayInCallContainer.setOption(option, true)
        //     }
        // },

        //应答率
        responseRateEcharts(){
            // console.log(this.$refs.responseRateEcharts)
            var dom = this.$refs.responseRateEcharts;
            responseRateContainer = echarts.init(dom)
            var option = {
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false //不显示坐标轴刻度线
                    },
                    axisLine: {
                        show: false //不显示坐标轴线
                    },
                    axisLabel: {
                        show: false //不显示坐标轴上的文字
                    },
                    boundaryGap: false,
                },
                yAxis: {
                    show: false
                },
                grid: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    buttom: 10,
                    top: 1
                },
                series: [{
                    name: '呼入量',
                    type: 'line',
                    data: [211,133,420,624,144, 932,811,301,243, 14,616, 1290, 110, 4320],
                    smooth: true,
                    symbol: 'none',  //取消这点圆圈
                    areaStyle: {},
                    color: '#975FE4', //改变区域颜色
                    lineStyle: {
                        width: 0
                    },  
                }]
            }
            if(option && typeof option === 'object') {
                responseRateContainer.setOption(option, true)
            }
        },

        //通话时长
        talkTimeEcharts(){
            var dom = document.getElementById("talkTimeEcharts");
            talkTimeContainer = echarts.init(dom);
            var option = {
                color: ['#2FA840'],
                xAxis: {
                    type: 'category',
                    axisTick:{
                        show:false//不显示坐标轴刻度线
                    },
                    axisLine: {
                        show: false,//不显示坐标轴线
                    },
                    axisLabel: {
                        show: false,//不显示坐标轴上的文字
                    }
                },
                yAxis: {
                    show:false
                },
                grid: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    bottom: 10
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110,80],
                    type: 'bar',
                    barWidth: 30,
                }]
            };
            if (option && typeof option === "object") {
                talkTimeContainer.setOption(option, true);
            }
        },

        refreshTalkTimeEcharts(){
            var data = [320, 600, 250, 180, 40, 210,180];
            talkTimeContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新应答率
        refreshResponseRateEchartsEcharts(){
            var data = [211,133,420,624,144, 932,811, 601, 2143, 142, 1616, 290, 1310, 1220];
            responseRateContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },
    }
})
