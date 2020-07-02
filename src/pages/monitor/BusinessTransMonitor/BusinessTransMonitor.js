var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        transactionRateContainer: null, // 交易成功率
        transactionNumsContainer: null, // 交易量
        transactionTrendContainer: null,// 交易量趋势
        transactionPeakContainer:null, //交易峰值
        transactionTypeContainer:null, //交易类型占比
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
        transactionRank: '交易量排名',
        channelAct:'AllChannels',           //渠道控制点击按钮样式
        skillGroupAct: 'AllSkillGroups',    //技能组控制点击按钮
        trendAct: 'TransactionNums',        //交易量按钮点击控制
        listAct:'ChannelList',
        dateAct:'D', 
        transAct: 'D',
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
        hotTransactionList: [
            {name: '账户密码重置', id: '1', nums: 11234, up: '13%' },
            {name: '客户资料修改', id: '2', nums: 1040, up: '50%' },
            {name: '手机号更变', id: '3', nums: 1240, up: '12%' },
            {name: '贷款面签', id: '4' ,nums: 105, up: '51%' },
            {name: '理财风险评估', id: '5' ,nums: 150, up: '12%' },
            {name: '手机号修改', id: '6' ,nums: 1010, up: '23%' },
            {name: '反欺诈业务', id: '7' ,nums: 140, up: '12%' },
        ],
        
        dateList: [
            {name: '今日', id: 'D'},
            {name: '本周', id: 'W'},
            {name: '本月', id: 'M'},
            {name: '全年', id: 'Y'},
        ],
        // DateValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        dateValue: '',  //时间选择器时间
        isAct: true,
        trendList: {
            mark:'ChannelList',         //列表标志,判断显示渠道还是技能组
            channelList:[],
            skillGroupsList:[]
        },
        transDateList: [
            {name: '今日', id: 'D'},
            {name: '近15分钟', id: 'F'},
        ],
    },
    careted(){
        let that = this;
        that.localStorageFn();
    },
    mounted(){
        // Echart 缩放
        let _this = this;
        _this.$nextTick(()=>{
            _this.transactionRateEcharts();
            _this.transactionNumsEcharts();
            _this.transactionTrendEcharts();
            _this.transactionPeakEcharts();
            _this.transactionTypeEcharts();
        })
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.transactionRateContainer.resize();
                _this.transactionNumsContainer.resize();
                _this.transactionTrendContainer.resize();
                _this.transactionPeakContainer.resize();
                _this.transactionTypeContainer.resize();
            }, 100)
        })

    },
    updated(){
        let _this = this;
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        }
    },
    methods: {
        localStorageFn(){
            //渠道      channnelIndex -> AllChannel, Channel
            sessionStorage.setItem('channelIndex',this.channelAct)
            //技能组    skillGroupsIndex -> AllSkillGroups, SkillGroups
            sessionStorage.setItem('skillGroupsIndex',this.skillGroupsAct)
            //呼叫趋势    callTrendIndex -> I, O
            sessionStorage.setItem('callTrendIndex',this.callTrendAct)
            //日周月年选择  dateIndex -> D, W, M, Y
            sessionStorage.setItem('dateIndex',this.dateAct)
            //渠道-技能组列表数据   listAct ->  ChannelList, SkillGroupsList
            sessionStorage.setItem('listAct', this.listAct)
        },
        // 点击全部渠道
        click_AllChannels(index){
            this.channelAct = index
            sessionStorage.setItem('channelIndex', this.channelAct)
            console.log(this.channelAct)
        },

        //选择单一渠道
        select_Channel(name) {
            this.btn_Channel = name
            this.channelAct = 'Channel'
            sessionStorage.setItem('channelIndex', this.channelAct)
            console.log(this.channelAct)
        },


        // 点击全部技能组
        click_AllSkillGroups(index){
            this.skillGroupAct = index
            console.log(this.skillGroupAct)
            sessionStorage.setItem('skillGroupIndex', this.skillGroupAct)
        },

        //选择单一业务组
        select_SkillGroups(index) {
            this.btn_SkillGroups = index
            this.skillGroupAct = 'SkillGroups'
            sessionStorage.setItem('skillGroupIndex', this.skillGroupAct)
            console.log(this.skillGroupAct)
        },

        // 点击交易量
        click_TransactionNums(index){
            console.log(index)
            this.trend = this.transactionTrend
            this.trendAct = index
            console.log(index)
            sessionStorage.setItem('trendIndex', this.trendAct)
        },
        // 点击成功率
        click_SuccessRate(index){
            console.log(index)
            this.trend = this.successRateTrend
            this.trendAct = index
            console.log(index)
            sessionStorage.setItem('trendIndex', this.trendAct)
        },
        
        select_Date(index) {
            console.log('点击了:'+index)
            this.dateAct = index
            sessionStorage.setItem('dateIndex',index)
        },
        select_DateTime() {
            console.log(111)
        },
        click_List(index){
            this.listAct = index
            sessionStorage.setItem('listAct',this.listAct)
            this.trendList.mark = this.listAct
            console.log(this.listAct)
        },
        click_TransDate(index) {
            console.log(index)
            this.transAct = index
        },
        

        //交易成功率--曲线图
        transactionRateEcharts(){
            // console.log(this.$refs.transactionRateEcharts)
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
                    name: '交易成功率',
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
                    name: '交易峰值',
                    type: 'line',
                    data: [2211,1333,420,124,344, 232, 1114, 301, 1243, 142, 2616, 1290, 3110, 320, 222],
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

        //交易量--柱形图
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
                        name: '交易量',
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

        //交易趋势 --柱形图
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
                        name: '交易量',
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

        //交易量类型占比
        transactionTypeEcharts() {
            console.log(this.$refs.transactionTypeEcharts)
            var dom = this.$refs.transactionTypeEcharts;
            this.transactionTypeContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '50%',
                    top:'25%',
                    icon: 'circle',
                    itemGap:14,
                    itemHeight:8,
                    itemWidth:8,
                    textStyle: {
                        fontSize: 14,
                        lineHeight: 14,
                        // rich 富文本 name 对应formatter里面的 name
                        //      相当于插入一个空槽
                        rich: {
                            name:{
                                fontSize:16,
                                align:'left',
                                width: 110
                            },
                            value: {
                                fontSize:16,
                                align:'center',
                            }
                        }
                    },
                    data: ['账号密码重置', '手机号变更', '振铃', '通话', '事后处理'],
                    formatter: (params) => {
                        for( var i = 0; i < option.series[0].data.length; i++ ){
                            if(option.series[0].data[i].name == params) {
                                return `{name|${params}} {value|${option.series[0].data[i].value}}`
                            }
                        }
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '60%'],
                        center: ['25%', '50%'],
                        // avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        //设置颜色
                        itemStyle: {
                            normal:{  
                                color: function (params){
                                    var colorList = [
                                        '#FF6565','#7B6CFF','#FF6CB8','#D56CFF','#6CD7FF','#FF6565','#7B6CFF','#FF6CB8','#D56CFF','#6CD7FF'
                                        ];
                                    return colorList[params.dataIndex];
                                },
                                borderWidth: 2,
                                borderColor: '#fff',
                            }
                        },
                        data: [
                            {value: 1335, name: '账号密码重置'},
                            {value: 310, name: '手机号变更'},
                            {value: 234, name: '振铃'},
                            {value: 135, name: '通话'},
                            {value: 1548, name: '事后处理'}
                        ],
                    }
                ]
            }
            if(option && typeof option === 'object') {
                this.transactionTypeContainer.setOption(option, true)
            }
        },


        // 模拟刷新交易量
        refreshTransactionNumsEcharts(){
            var data = [3202, 200, 2350, 1801, 140, 4210, 5180, 22, 66, 99, 12, 34, 47, 46, 111];
            this.transactionNumsContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新满意度
        refreshtransactionRateEcharts(){
            var data = [211,1233,420,6424,1454, 9132,8111, 6201, 2143, 142, 1616, 290, 1310, 1220, 12];
            this.transactionRateContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        //刷新峰值
        refreshTransactionPeakEcharts(){
            var data = [211,133,420,624,144, 932,811, 601, 2143, 142, 1616, 290, 1310, 1220, 12];
            this.transactionPeakContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新交易趋势
        refreshTransactionTrendEcharts(){
            var data = [111,333,1420,224,145, 612,111, 621, 2153, 142, 1616, 1290, 1110, 1520, 121];
            this.transactionTrendContainer.setOption({
                series: [{
                    data: data
                }]
            })
            console.log(11)
        },

        // 模拟刷新交易量类型占比
        refreshTransactionTypeEcharts(){
            var data = [
                {value: 1152, name: '账号密码重置'},
                {value: 3102, name: '手机号变更'},
                {value: 434, name: '振铃'},
                {value: 535, name: '通话'},
                {value: 1548, name: '事后处理'}
            ];
            this.transactionTypeContainer.setOption({
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
