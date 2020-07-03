var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        transactionRateContainer: null,     // 交易成功率
        transactionNumsContainer: null,     // 交易量
        transactionTrendContainer: null,    // 交易量趋势
        transactionPeakContainer:null,      //交易峰值
        transactionTypeContainer:null,      //交易类型占比
        btn_AllChannels: '全部渠道',         //按钮名称
        btn_Channel: '单一渠道',             //按钮名称
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '单一技能组',
        btn_TransactionNums: '交易量',
        btn_SuccessRate: '成功率',
        trend:'交易量趋势',
        transactionTrend: '交易量趋势',
        successRateTrend: '成功率趋势',
        rank:'交易量排名',
        transactionRank: '交易量排名',
        successRateRank: '成功率排名',
        channelAct:'AllChannels',           //渠道控制点击按钮样式
        skillGroupsAct: 'AllSkillGroups',   //技能组控制点击按钮
        trendAct: 'I',                      //交易量按钮点击控制
        listAct:'ChannelList',
        dateAct:'D', 
        todayData: {},                      //今日数据
        fifteenData:{},                     //近15天数据  
        echartData:{              //echart数据
            joinQueryNum_X:[],    //近15天呼入量X轴数组   
            joinQueryNum_Y: [],   //近15天呼入量Y轴数组 --柱形图
            satisRate_X:[],       //近15天满意度X轴数组   
            satisRate_Y:[],       //近15天满意度Y轴数组 --曲线图
            callTrend_X:[],       //呼入呼出量趋势X轴数组   --柱形图
            callTrend_Y:[],       //呼入呼出量趋势Y轴数组
        },  
        beginTime: null,
        endTime: null,               
        channelList: [
            // {name: '手机银行', id: '1', nums: 10130},
            // {name: '官方公众号', id: '2', nums: 10040},
            // {name: '信用卡公众号', id: '3', nums: 1100},
            // {name: '理财公众号', id: '4', nums: 120},
            // {name: '网银', id: '5', nums: 1045},
            // {name: '直销银行', id: '6', nums: 1000},
            // {name: 'PC官网', id: '7', nums: 1000},
        ],
        skillGroupsList: [
            // {name: '个人业务咨询', id: '1', nums: 11234},
            // {name: '个人业务办理', id: '2', nums: 1040},
            // {name: '信用卡业务', id: '3', nums: 1240},
            // {name: '对公业务', id: '4' ,nums: 105},
            // {name: '理财业务', id: '5' ,nums: 150},
            // {name: '贷款业务', id: '6' ,nums: 1010},
            // {name: '反欺诈业务', id: '7' ,nums: 140},
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
            {name: '今日', id: 'DD'},
            {name: '近15分钟', id: 'FF'},
        ],
        hotTransAct: 'DD', //
    },
    created(){
        let that = this

        // 15天呼入量和满意度  --24小时刷一次
        that._getVideoCallHistory();
        //获取渠道和技能组信息
        that._getSkillAndChannel();
        // 15天呼叫趋势 --日期  --5分钟刷新一次
        that._getVideoCallByDateType();

    },
    mounted(){
        // Echart 缩放
        let _this = this;
        _this.transactionTypeEcharts()
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
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        }
    },
    methods: {
        // 点击全部渠道
        click_AllChannels(index){
            this.channelAct = index
            this.btn_Channel = '单一渠道'
            console.log(this.channelAct)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },

        //选择单一渠道
        select_Channel(code,value) {
            this.btn_Channel = value
            this.channelAct = 'Channel'
            console.log(this.channelAct,code);
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },


        // 点击全部技能组
        click_AllSkillGroups(index){
            this.skillGroupsAct = index
            this.btn_SkillGroups = '单一技能组'
            console.log(this.skillGroupsAct)
            this._getVideoCallHistory();
            this._getVideoCallByDateType()
            
        },

        //选择单一业务组
        select_SkillGroups(code,name) {
            this.btn_SkillGroups = name
            this.skillGroupsAct = 'SkillGroups'
            console.log(this.skillGroupsAct,code)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },

        // 点击交易量
        click_TransactionNums(index){
            console.log(index)
            this.trend = this.transactionTrend
            this.rank = this.transactionRank
            this.trendAct = index
            this._getVideoCallByDateType()
            
        },
        // 点击成功率
        click_SuccessRate(index){
            console.log(index)
            this.trend = this.successRateTrend
            this.rank = this.successRateRank
            this.trendAct = index
            this._getVideoCallByDateType()
        },
        //点击点月日
        select_Date(index) {
            console.log('点击了:'+index)
            this.dateAct = index
            this._getVideoCallByDateType();
        },
        //选择日期
        select_DateTime() {
            console.log(111)
        },
        //点击列表
        click_List(index){
            this.listAct = index
            this.trendList.mark = this.listAct
            console.log(this.listAct)
        },
        //
        click_TransDate(index) {
            console.log(index)
            this.hotTransAct = index
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
                    data: this.echartData.satisRate_X,
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
                    data: this.echartData.satisRate_Y,
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
            // console.log(this.$refs.transactionPeakEcharts)
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
                    data: this.echartData.satisRate_X,
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
                    data: this.echartData.satisRate_Y,
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
            // console.log(this.$refs.transactionNumsEcharts)
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
                        data: this.echartData.joinQueryNum_X,
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
                        data: this.echartData.joinQueryNum_Y
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.transactionNumsContainer.setOption(option, true);
            }
        },

        //交易趋势 --柱形图
        transactionTrendEcharts(){
            // console.log(this.$refs.transactionTrendEcharts)
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
                        data: this.echartData.callTrend_X,
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
                        data: this.echartData.callTrend_Y
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.transactionTrendContainer.setOption(option, true);
            }
        },

        //交易量类型占比
        transactionTypeEcharts() {
            // console.log(this.$refs.transactionTypeEcharts)
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

        //今15天呼入量和满意度  
        _getVideoCallHistory(){
            // var channelIndex = sessionStorage.getItem('channelIndex');
            // var skillGroups = sessionStorage.getItem('skillGroupsIndex')
            // console.log(channelIndex)
            // console.log(skillGroups)
            getVideoCallHistory({
                // channelNo: sessionStorage.getItem('channelIndex'),
                // skillGroupCode: sessionStorage.getItem('skillGroupsIndex')
                // channelNo: this.channelAct,
                // skillGroupCode: this.skillGroupsAct
            })
            .then(res => {
                console.log(res,'今15天呼入量和满意度')
                this.fifteenData = res.map
                var satisRateTemp_X = [] 
                var satisRateTemp_Y = []
                var joinQueryTemp_X = []
                var joinQueryTemp_Y = []
                for(let i = 0; i < res.rows.length; i++){
                    satisRateTemp_Y.push(res.rows[i].satisNum)
                    joinQueryTemp_Y.push(res.rows[i].joinQueryNum)
                    satisRateTemp_X.push("第"+i+"组")
                    joinQueryTemp_X.push("第"+i+"组")
                }
                this.echartData.satisRate_X = satisRateTemp_X
                this.echartData.satisRate_Y = satisRateTemp_Y
                this.echartData.joinQueryNum_X = joinQueryTemp_X
                this.echartData.joinQueryNum_Y = joinQueryTemp_Y
                joinQueryTemp_X = []
                joinQueryTemp_Y = []
                satisRateTemp_X = []
                satisRateTemp_Y = []
                this.transactionRateEcharts();
                this.transactionPeakEcharts();
                this.transactionNumsEcharts();
            })
            .catch(err => {
                console.log(err,'getVideoCallHistory数据获取异常')
            })
        },

         //今日呼入量和满意度 -日期 
        _getVideoCallByDateType(){
            // var channelIndex =  sessionStorage.getItem('channelIndex');
            // var skillGroupIndex =  sessionStorage.getItem('skillGroupsIndex');
            // var callTrendIndex =  sessionStorage.getItem('callTrendIndex');
            // var dateIndex =  sessionStorage.getItem('dateIndex');
            switch(this.dateAct){
                case 'D':
                    this.beginTime = this.getDay('D');
                    this.endTime = this.getDay('D');
                    break;
                case 'W':
                    this.beginTime = this.getDay('W').weekFirstDay;
                    this.endTime = this.getDay('W').weekLastDay;
                    console.log(this.beginTime)
                    console.log(this.endTime);
                    break;
                case 'M':
                    this.beginTime = this.getDay('M');
                    this.endTime = this.getDay('D')
                    break;
                case 'Y':
                    this.beginTime = this.getDay('Y')
                    this.endTime = this.getDay('D')
            }
            getVideoCallByDateType({
                // channelNo: channelIndex,
                // skillGroupCode: skillGroupIndex,
                // queryTimeType: dateIndex,
                // queryCallType: callTrendIndex,
                // beginTime: this.beginTime,
                // endTime: this.endTime
                channelNo: this.channelAct,
                skillGroupCode: this.skillGroupsAct,
                queryTimeType: this.dateAct,
                queryCallType: this.trendAct,
                beginTime: this.beginTime,
                endTime: this.endTime
            })
            .then(res => {
                console.log(res)
                var callTrend_X = [];
                var callTrend_Y = [];         
                if(this.trendAct == 'I') {
                    for(var i = 0; i < res.rows.length; i++){
                        callTrend_X.push(res.rows[i].beginTime)
                        callTrend_Y.push(res.rows[i].joinQueryNum)
                    }
                }else {
                    for(var i = 0; i < res.rows.length; i++){
                        callTrend_X.push(res.rows[i].beginTime)
                        callTrend_Y.push(res.rows[i].callOutNum)
                    }
                }
                this.echartData.callTrend_X = callTrend_X
                this.echartData.callTrend_Y = callTrend_Y
                console.log(this.echartData.callTrend_X,111)
                console.log(this.echartData.callTrend_Y,222)
                callTrend_X = [];
                callTrend_Y = [];
                this.transactionTrendEcharts();
            })
            .catch(err => {
                console.log(err,'getVideoCallByDateType数据获取异常')
            })
        },

        //获取渠道和技能组信息
        _getSkillAndChannel(){
            getSkillAndChannel()
            .then(res => {
                this.trendList.channelList = res.map.channels
                this.trendList.skillGroupsList = res.map.skillGroups
                this.channelList = res.map.channels
                this.skillGroupsList = res.map.skillGroups
                console.log(res)
            })
            .catch(err => {
                console.log(err,'_getSkillAndChannel获取数据异常')
            })
        },

        //获取时间数据   'D'-今日, 'W'-本周第一日, 'M'-本月第一日, 'Y'-今年第一日
        getDay(param) {
            var date = new Date();
            var year = date.getFullYear();  //年
            var month = date.getMonth()+1;  //月
            var day = date.getDate();       //日

            var weekFirstDay = new Date(date-(date.getDay()-1)*86400000).getDate(); //本周第一天
            M = Number(new Date(date-(date.getDay()-1)*86400000).getMonth())+1  //本周第一天所在的月份的月份

            var weekLastDay = new Date((new Date(date-(date.getDay()-1)*86400000)/1000+6*86400)*1000).getDate();  //本周最后一天
            L = Number(new Date((new Date(date-(date.getDay()-1)*86400000)/1000+6*86400)*1000).getMonth())+1    //本周最后一天所在的月份的月份

            var monthFirstDay = new Date(date.getFullYear(),date.getMonth(),1).getDate(); //本月第一天

            var yearFirstDaty = `${year}-01-01`   
            if(month < 10) {
                month = "0" + month;
            }
            if(day < 10) {
                day = "0" + day;
            }
            if(weekFirstDay < 10){
                weekFirstDay = "0" + weekFirstDay
            }
            if(weekLastDay < 10){
                weekLastDay = "0" + weekLastDay
            }
            if(monthFirstDay < 10) {
                monthFirstDay = "0" + monthFirstDay
            }
            if(M < 10) {
                M = "0" + M
            }
            if(L < 10) {
                L = "0" + L
            }
            
            switch(param) {
                case 'D':
                    return `${year}-${month}-${day}`
                case 'W':
                    return {weekFirstDay:`${year}-${M}-${weekFirstDay}`,weekLastDay:`${year}-${L}-${weekLastDay}`}
                case 'M':
                    return `${year}-${month}-${monthFirstDay}`
                case 'Y':
                    return yearFirstDaty
                default:
                    return `${year}-${month}-${day}`
            }
        },

    }
})
