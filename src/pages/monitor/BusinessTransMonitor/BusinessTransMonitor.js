var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        transactionRateContainer: null, // 交易成功率
        transactionNumsContainer: null, // 交易量
        transactionTrendContainer: null,// 交易量趋势
        transactionPeakContainer:null, //交易峰值
        btn_AllChannels: '全部渠道', //按钮名称
        btn_Channel: '手机银行', //按钮名称
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '个人业务咨询',
        btn_TransactionNums: '交易量',
        btn_SuccessRate: '成功率',
        btn_DayData: '今日',
        btn_WeekData: '本周',
        btn_MonthData: '本月',
        btn_YearData: '本年',
        trend:'交易量趋势',
        transactionTrend: '交易量趋势',
        successRateTrend: '成功率趋势',
        transactionRank: '呼入量排名',
        inRank: '呼入量排名',
        outRank: '呼出量排名',
        channelList: [
            {name: '手机银行', id: '1', nums: 10130},
            {name: '官方公众号', id: '2', nums: 10040},
            {name: '信用卡公众号', id: '3', nums: 1100},
            {name: '理财公众号', id: '4', nums: 120},
            {name: '网银', id: '5', nums: 1045},
            {name: '直销银行', id: '6', nums: 1000},
            {name: 'PC官网', id: '7', nums: 1000},
        ],
        skillGroupsList: [
            {name: '个人业务咨询', id: '1', nums: 11234},
            {name: '个人业务办理', id: '2', nums: 1040},
            {name: '信用卡业务', id: '3', nums: 1240},
            {name: '对公业务', id: '4' ,nums: 105},
            {name: '理财业务', id: '5' ,nums: 150},
            {name: '贷款业务', id: '6' ,nums: 1010},
            {name: '反欺诈业务', id: '7' ,nums: 140},
        ],
        dateList: [
            {name: '今日', id: '1'},
            {name: '本周', id: '2'},
            {name: '本月', id: '3'},
            {name: '全年', id: '4'},
        ],
        // DateValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        dateValue: '',  //时间选择器时间
        isAct: true
    },
    mounted(){
        this.transactionRateEcharts();
        this.transactionNumsEcharts();
        this.transactionTrendEcharts();
        this.transactionPeakEcharts()
        // Echart 缩放
        let _this = this;
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.transactionRateContainer.resize();
                _this.transactionNumsContainer.resize();
                _this.transactionTrendContainer.resize();
                _this.transactionPeakContainer.resize();
            }, 100)
        })

        setTimeout(() =>{
            this.refreshtransactionRateEcharts()
        },2000)
        setTimeout(() =>{
            this.refreshTransactionNumsEcharts()
        },2000)
        setTimeout(() =>{
            this.refreshInOutTrendEcharts()
        },2000)
        setTimeout(() =>{
            this.transactionPeakEcharts()
        },2000)
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        }
    },
    methods: {
        // 点击全部渠道
        click_AllChannels(){
            console.log(this.btn_AllChannels)
        },
        // 点击全部技能组
        click_AllSkillGroups(){
            console.log(this.btn_AllSkillGroups)
        },
        // 点击交易量
        click_TransactionNums(){
            console.log(this.btn_TransactionNums)
            this.trend = this.transactionTrend
        },
        // 点击成功率
        click_SuccessRate(){
            console.log(this.btn_SuccessRate)
            this.trend = this.successRateTrend
        },
        //选择单一渠道
        select_Channel(name) {
            console.log(name)
            this.btn_Channel = name
        },
        //选择单一业务组
        select_SkillGroups(name) {
            console.log(name)
            this.btn_SkillGroups = name
        },
        select_Date(name) {
            console.log(name)
        },
        select_DateTime() {
            console.log(111)
        },
        

        //满意度 --曲线图
        transactionRateEcharts(){
            console.log(this.$refs.transactionRateEcharts)
            var dom = this.$refs.transactionRateEcharts;
            this.transactionRateContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
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
                    name: '满意度',
                    type: 'line',
                    data: [211,133,420,624,144, 932,811,301,243, 14,616, 1290, 110, 4320, 22],
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
                this.transactionRateContainer.setOption(option, true)
            }
        },

        //交易峰值--曲线图
        transactionPeakEcharts(){
            console.log(this.$refs.transactionPeakEcharts)
            var dom = this.$refs.transactionPeakEcharts;
            this.transactionPeakContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
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
                    name: '满意度',
                    type: 'line',
                    data: [211,133,420,624,144, 932,811,301,243, 14,616, 1290, 110, 4320, 22],
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
                this.transactionPeakContainer.setOption(option, true)
            }
        },

        //呼入量 --曲线图
        transactionNumsEcharts(){
            console.log(this.$refs.transactionNumsEcharts)
            var dom = this.$refs.transactionNumsEcharts;
            this.transactionNumsContainer = echarts.init(dom);
            var option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    buttom: 10,
                    top: 1
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: {
                    show: false
                },
                series: [
                    {
                        name: '呼入量',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220, 10, 222, 145, 111, 10, 75, 24, 666]
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.transactionNumsContainer.setOption(option, true);
            }
        },

        //呼入呼出趋势 --柱形图
        transactionTrendEcharts(){
            console.log(this.$refs.transactionTrendEcharts)
            var dom = this.$refs.transactionTrendEcharts;
            this.transactionTrendContainer = echarts.init(dom);
            var option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [{
                    type: 'value'
                }],
                series: [
                    {
                        name: '呼入量',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220, 10, 222, 145, 111, 10, 75, 24, 666]
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.transactionTrendContainer.setOption(option, true);
            }
        },

        // 模拟刷新呼入量
        refreshTransactionNumsEcharts(){
            var data = [320, 600, 250, 180, 40, 210, 180, 22, 66, 99, 12, 34, 47, 46, 111];
            this.transactionNumsContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新满意度
        refreshtransactionRateEcharts(){
            var data = [211,133,420,624,144, 932,811, 601, 2143, 142, 1616, 290, 1310, 1220, 12];
            this.transactionRateContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        //刷新峰值
        refreshtransactionPeakEcharts(){
            var data = [211,133,420,624,144, 932,811, 601, 2143, 142, 1616, 290, 1310, 1220, 12];
            this.transactionPeakContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新呼入呼出趋势
        refreshInOutTrendEcharts(){
            var data = [211,133,420,624,144, 932,811, 601, 2143, 142, 1616, 290, 1310, 1220, 12];
            this.transactionTrendContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },
        tabBtn(index) {
            console.log(11)
        }
    }
})
