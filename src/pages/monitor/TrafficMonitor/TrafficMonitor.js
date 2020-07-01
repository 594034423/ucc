var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        satisfactionContainer: null, // 应答率
        callInNumsContainer: null, // 呼入量
        inOutTrendContainer: null,// 呼入量趋势
        btn_AllChannels: '全部渠道', //按钮名称
        btn_Channel: '手机银行', //按钮名称
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '个人业务咨询',
        btn_CallInNums: '呼入量',
        btn_CallOutNums: '呼出量',
        btn_DayData: '今日',
        btn_WeekData: '本周',
        btn_MonthData: '本月',
        btn_YearData: '本年',
        inOutTrend: '呼入量趋势',
        inTrend: '呼入量趋势',
        outTrend: '呼出量趋势',
        inOutRank: '呼入量排名',
        inRank: '呼入量排名',
        outRank: '呼出量排名',
        channelAct:'AllChannels',           //渠道控制点击按钮样式
        skillGroupsAct: 'AllSkillGroups',   //技能组控制点击按钮
        callTrendAct: 'CallInNums',             //呼入按钮点击控制
        listAct: 'ChannelList',             //列表按钮点击控制
        dateAct:'D',                        //时间按钮控制
        todayData: {},                      //今日数据
        fifteenData: {},                    //近15天数据
        echartData:{
            joinQueryNum_X:[],    //近15天呼入量X轴数组   
            joinQueryNum_Y: [],   //近15天呼入量Y轴数组 --柱形图
            satisRate_X:[],       //近15天满意度X轴数组   
            satisRate_Y:[],       //近15天满意度Y轴数组 --曲线图
            callTrend_X:[],       //呼入呼出量趋势X轴数组   --柱形图
            callTrend_Y:[],       //呼入呼出量趋势Y轴数组
        },
        channelList: [
            {name: '手机银行', id: '1', nums: 1000},
            {name: '官方公众号', id: '2', nums: 1000},
            {name: '信用卡公众号', id: '3', nums: 1000},
            {name: '理财公众号', id: '4', nums: 1000},
            {name: '网银', id: '5', nums: 1000},
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
            {name: '今日', id: 'D'},
            {name: '本周', id: 'W'},
            {name: '本月', id: 'M'},
            {name: '全年', id: 'Y'},
        ],
        // DateValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        dateValue: '',  //时间选择器时间
        isAct: true
    },
    created(){

        var that = this;
        // //先获取数据
        that._getVideoCallToday() //今日呼入量和满意度
        // window.setInterval(()=>{
        //     setTimeout(that._getVideoCallHistory(),0)
        //     console.log('今日呼入量和满意度,5秒刷一次')
        // },5000)

        // 15天呼入量和满意度  --24小时刷一次
        that._getVideoCallHistory()
        // window.setInterval(()=>{
        //     setTimeout(that._getVideoCallHistory(),0)
        // },3600*24)

        //存点击事件
        that.localStorageFn()

    },
    mounted(){
        let _this = this;
        // // Echart 缩放
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.satisfactionContainer.resize();
                _this.callInNumsContainer.resize();
                _this.inOutTrendContainer.resize();
            }, 100)
        })
    },
    updated(){
        this.satisfactionEcharts()
        this.callInNumsEcharts();
        this.inOutTrendEcharts();
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        }
    },
    methods: {

        localStorageFn(){
            //渠道
            sessionStorage.setItem('channelIndex',this.channelAct)
            //技能组
            sessionStorage.setItem('skillGroupsIndex',this.skillGroupsAct)
            //呼入呼出量趋势
            sessionStorage.setItem('callTrendIndex',this.callTrendAct)
            //日周月年选择
            sessionStorage.setItem('dateIndex',this.dateAct)
            //渠道-技能组列表数据
            sessionStorage.setItem('listAct', this.listAct)
        },
        // 点击全部渠道
        click_AllChannels(index){
            this.channelAct = index
            sessionStorage.setItem('channelIndex',this.channelAct)
            console.log(this.channelAct)
        },
        //选择单一渠道
        select_Channel(index) {
            console.log(index)
            this.btn_Channel = index
            this.channelAct = 'Channel'
            sessionStorage.setItem('channelIndex', this.channelAct)
        },

        // 点击全部技能组
        click_AllSkillGroups(index){
            this.skillGroupsAct = index
            sessionStorage.setItem('skillGroupsIndex',this.skillGroupsAct)
            console.log(index)
        },
        //选择单一业务组
        select_SkillGroups(index) {
            console.log(index)
            this.btn_SkillGroups = index
            this.skillGroupsAct = 'SkillGroups'
            sessionStorage.setItem('skillGroupsIndex', this.skillGroupsAct)
        },

        // 点击呼入量
        click_CallInNums(index){
            console.log(index)
            sessionStorage.setItem('callNumsIndex',index)
            this.inOutTrend = this.inTrend
            this.callTrendAct = index;
        },
        // 点击呼出量
        click_CallOutNums(index){
            console.log(index)
            this.inOutTrend = this.outTrend
            this.callTrendAct = index
            sessionStorage.setItem('callNumsIndex',index)
        },
        select_Date(index) {
            sessionStorage.setItem('dateIndex',index)
            this.dateAct = index
            console.log(index)
        },
        select_DateTime() {
            console.log(111)
        },
        
        click_List(index){
            this.listAct = index
            sessionStorage.setItem('listAct',this.listAct)
            console.log(this.listAct)
        },
        //满意度 --曲线图
        satisfactionEcharts(){
            // console.log(this.$refs.satisfactionEcharts)
            console.log(this.echartData.satisRateList,'满意度曲线图')
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
                    name: '满意度',
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
            console.log(this.echartData.satisRateList,'呼入呼出量柱形')
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

        tabBtn(index) {
            console.log(11)
        },

        //获取今日呼入量和满意度 --5s刷新一次
        _getVideoCallToday(channelNo,skillGroupCode){
            getVideoCallToday({
                channelNo: channelNo,
                skillGroupCode: skillGroupCode
            })
            .then(res => {
                this.todayData = res.bean
            })
            .catch(err => [
                console.log(err,'数据获取异常')
            ])
        },

        //今15天呼入量和满意度  --24小时刷一次
        _getVideoCallHistory(channelNo,skillGroupCode){
            var channelIndex = sessionStorage.getItem('channelIndex');
            var skillGroups = sessionStorage.getItem('skillGroupsIndex')
            console.log(channelIndex)
            console.log(skillGroups)
            getVideoCallHistory({
                channelNo: channelNo,
                skillGroupCode: skillGroupCode
            })
            .then(res => {
                this.fifteenData = res.map
                var satisRateTemp = []
                var joinQueryTemp = []
                var rowTemp = []
                for(let i = 0; i < res.rows.length; i++){
                    satisRateTemp.push(res.rows[i].satisNum)
                    joinQueryTemp.push(res.rows[i].joinQueryNum)
                    rowTemp.push(i)
                }
                this.echartData.satisRateList = satisRateTemp
                this.echartData.joinQueryList = joinQueryTemp
                this.echartData.rowsList = rowTemp
                satisRateTemp = []
                joinQueryTemp = []
                rowTemp = []
            })
            .catch(err => {
                console.log(err,'数据获取异常')
            })
        },
        
        //今日呼入量和满意度 -日期 --15s刷新一次
        _getVideoCallByDateType(channelNo,skillGroupCode,queryTimeType,queryCallType,beginTime,endTime){
            getVideoCallByDateType({
                channelNo: channelNo,
                skillGroupCode: skillGroupCode,
                queryTimeType: queryTimeType,
                queryCallType: queryCallType,
                beginTime: beginTime,
                endTime: endTime
                
            })
            .then(res => {
                
            })
            .catch(err => {
                console.log(err,'数据获取异常')
            })
        },

        refreshEcharts(){

        }
    }
})
