var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        satisfactionContainer: null,        // 应答率
        callInNumsContainer: null,          // 呼入量
        inOutTrendContainer: null,          // 呼入量趋势
        btn_AllChannels: '全部渠道',         //按钮名称
        btn_Channel: '单一渠道',             //按钮名称
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '单一技能组',
        btn_CallInNums: '呼入量',
        btn_CallOutNums: '呼出量',
        inOutTrend: '呼入量趋势',
        inTrend: '呼入量趋势',
        outTrend: '呼出量趋势',
        inOutRank: '呼入量排名',
        inRank: '呼入量排名',
        outRank: '呼出量排名',
        channelAct:'AllChannels',           //渠道控制点击按钮样式
        skillGroupsAct: 'AllSkillGroups',   //技能组控制点击按钮
        callTrendAct: 'I',                  //呼入按钮点击控制 I-呼入 O呼出
        listAct: 'ChannelList',             //列表按钮点击控制
        dateAct:'D',                        //时间按钮控制
        todayData: {},                      //今日数据
        fifteenData: {},                    //近15天数据
        echartData:{              //echart数据
            joinQueryNum_X:[],    //近15天呼入量X轴数组   
            joinQueryNum_Y: [],   //近15天呼入量Y轴数组 --柱形图
            satisRate_X:[],       //近15天满意度X轴数组   
            satisRate_Y:[],       //近15天满意度Y轴数组 --曲线图
            callTrend_X:[],       //呼入呼出量趋势X轴数组   --柱形图
            callTrend_Y:[],       //呼入呼出量趋势Y轴数组
        },
        beginTime:null,
        endTime:null,
        channelList: [              //渠道下拉列表
            // {name: '手机银行', id: '1', nums: 1000},
            // {name: '官方公众号', id: '2', nums: 1000},
            // {name: '信用卡公众号', id: '3', nums: 1000},
            // {name: '理财公众号', id: '4', nums: 1000},
            // {name: '网银', id: '5', nums: 1000},
            // {name: '直销银行', id: '6', nums: 1000},
            // {name: 'PC官网', id: '7', nums: 1000},
        ],
        skillGroupsList: [          //技能组下拉列表
            // {name: '个人业务咨询', id: '1', nums: 11234},
            // {name: '个人业务办理', id: '2', nums: 1040},
            // {name: '信用卡业务', id: '3', nums: 1240},
            // {name: '对公业务', id: '4' ,nums: 105},
            // {name: '理财业务', id: '5' ,nums: 150},
            // {name: '贷款业务', id: '6' ,nums: 1010},
            // {name: '反欺诈业务', id: '7' ,nums: 140},
        ],
        dateList: [
            {name: '今日', id: 'D'},
            {name: '本周', id: 'W'},
            {name: '本月', id: 'M'},
            {name: '全年', id: 'Y'},
        ],
        trendList: {
            mark:'ChannelList',         //列表标志,判断显示渠道还是技能组
            channelList:[],
            skillGroupsList:[]
        },
        // dateValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        dateValue: '',  //时间选择器时间
        isAct: true
    },
    created(){

        let that = this;
        //存点击事件
        // that.localStorageFn();
        //先获取数据
        //今日呼入量和满意度
        that._getVideoCallToday(); 
        // window.setInterval(()=>{
        //     setTimeout(that._getVideoCallHistory(),0)
        //     console.log('今日呼入量和满意度,5秒刷一次')
        // },5000)

        // 15天呼入量和满意度  --24小时刷一次
        that._getVideoCallHistory();
        // window.setInterval(()=>{
        //     setTimeout(that._getVideoCallHistory(),0)
        //     console.log('15天呼入量和满意度 ,24小时刷一次')
        // },3600000*24)

        // 15天呼叫趋势 --日期  --5分钟刷新一次
        that._getVideoCallByDateType();
        // window.setInterval(()=>{
        //     setTimeout(that._getVideoCallByDateType,0)
        //     console.log('15天呼叫趋势--日期 ,5分钟刷一次')
        // },60000*5)

        //获取渠道和技能组信息
        that._getSkillAndChannel();

    },
    mounted(){
        // // Echart 缩放
        let _this = this;
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.satisfactionContainer.resize();
                _this.callInNumsContainer.resize();
                _this.inOutTrendContainer.resize();
            }, 100)
        })
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        },
    },
    methods: {

        // localStorageFn(){
        //     //渠道      channnelIndex -> AllChannel, Channel
        //     sessionStorage.setItem('channelIndex',this.channelAct)
        //     //技能组    skillGroupsIndex -> AllSkillGroups, SkillGroups
        //     sessionStorage.setItem('skillGroupsIndex',this.skillGroupsAct)
        //     //呼叫趋势    callTrendIndex -> I, O
        //     sessionStorage.setItem('callTrendIndex',this.callTrendAct)
        //     //日周月年选择  dateIndex -> D, W, M, Y
        //     sessionStorage.setItem('dateIndex',this.dateAct)
        //     //渠道-技能组列表数据   listAct ->  ChannelList, SkillGroupsList
        //     sessionStorage.setItem('listAct', this.listAct)
        // },
        // 点击全部渠道
        click_AllChannels(index){
            this.channelAct = index
            this.btn_Channel = '单一渠道'
            // sessionStorage.setItem('channelIndex',this.channelAct)
            console.log(this.channelAct)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },
        //选择单一渠道
        select_Channel(code,value) {
            console.log(code)
            this.btn_Channel = value
            this.channelAct = 'Channel'
            // sessionStorage.setItem('channelIndex', this.channelAct)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },

        // 点击全部技能组
        click_AllSkillGroups(index){
            this.skillGroupsAct = index
            this.btn_SkillGroups = '单一技能组'
            // sessionStorage.setItem('skillGroupsIndex',this.skillGroupsAct)
            console.log(index)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },
        //选择单一业务组
        select_SkillGroups(code,name) {
            console.log(code)
            this.btn_SkillGroups = name
            this.skillGroupsAct = 'SkillGroups'
            // sessionStorage.setItem('skillGroupsIndex', this.skillGroupsAct)
            this._getVideoCallHistory();
            this._getVideoCallByDateType();
        },

        // 点击呼入量
        click_CallInNums(index){
            console.log(index)
            this.inOutTrend = this.inTrend
            this.inOutRank = this.inRank
            this.callTrendAct = index;
            // sessionStorage.setItem('callTrendIndex',index)
            this._getVideoCallByDateType()
        },
        // 点击呼出量
        click_CallOutNums(index){
            console.log(index)
            this.inOutTrend = this.outTrend
            this.inOutRank = this.outRank
            this.callTrendAct = index
            // sessionStorage.setItem('callTrendIndex',index)
            this._getVideoCallByDateType()
        },
        //点击日月年
        select_Date(index) {
            console.log('点击了:'+index)
            this.dateAct = index
            // sessionStorage.setItem('dateIndex',index)
            this._getVideoCallByDateType();
        },
        //选择日期
        select_DateTime() {
            console.log(111)
        },
        //点击列表
        click_List(index){
            this.listAct = index
            // sessionStorage.setItem('listAct',this.listAct)
            this.trendList.mark = this.listAct
            console.log(this.listAct)
        },
        //满意度 --曲线图
        satisfactionEcharts(){
            // console.log(this.$refs.satisfactionEcharts)
            var dom = this.$refs.satisfactionEcharts;
            this.satisfactionContainer = echarts.init(dom)
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
                    name: '满意数',
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
                this.satisfactionContainer.setOption(option, true)
            }
        },

        //呼入量 --柱形图
        callInNumsEcharts(){
            // console.log(this.$refs.callInNumsEcharts)
            var dom = this.$refs.callInNumsEcharts;
            this.callInNumsContainer = echarts.init(dom);
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
                        name: '呼入量',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.echartData.joinQueryNum_Y
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.callInNumsContainer.setOption(option, true);
            }
        },

        //呼入呼出趋势 --柱形图
        inOutTrendEcharts(){
            // console.log(this.$refs.inOutTrendEcharts)
            var dom = this.$refs.inOutTrendEcharts;
            this.inOutTrendContainer = echarts.init(dom);
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
                        name: '呼入量',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.echartData.callTrend_Y
                    }
                ]
            };

            if (option && typeof option === "object") {
                this.inOutTrendContainer.setOption(option, true);
            }
        },


        //获取今日呼入量和满意度
        _getVideoCallToday(){
            getVideoCallToday({
                // channelNo: sessionStorage.getItem('channelIndex'),
                // skillGroupCode: sessionStorage.getItem('skillGroupsIndex')
                channelNo: this.channelAct,
                skillGroupCode: this.skillGroupsAct
            })
            .then(res => {
                this.todayData = res.bean
                this.todayData.currentTalkAvgTime = this.s_to_ms(this.todayData.currentTalkAvgTime)
                this.todayData.talkAvgTime = this.s_to_ms(this.todayData.talkAvgTime)
            })
            .catch(err => [
                console.log(err,'getVideoCallToday数据获取异常')
            ])
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
                this.satisfactionEcharts();
                this.callInNumsEcharts();
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
                queryCallType: this.callTrendAct,
                beginTime: this.beginTime,
                endTime: this.endTime
            })
            .then(res => {
                console.log(res)
                var callTrend_X = [];
                var callTrend_Y = [];         
                if(this.callTrendAct == 'I') {
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
                // console.log(this.echartData.callTrend_X,111)
                // console.log(this.echartData.callTrend_Y,222)
                callTrend_X = [];
                callTrend_Y = [];
                this.inOutTrendEcharts();
                // this.trendList.channelList = res.map.channelCallIn
                // this.trendList.skillGroupsList = res.map.skillCallIn
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

        //秒转分秒
        s_to_ms(s){
            var m;
            m = Math.floor(s/60)
            s = s%60
            return `${m}分${s}秒`
        }
    }
})
