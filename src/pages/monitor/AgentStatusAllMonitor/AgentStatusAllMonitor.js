var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        onSiteStatusAgentNumsContainer: null, // 现场各状态柜员人数
        onSiteStarAgentNumsContainer: null, // 现场各星级柜员人数
        skillGroupsAgentStatusContainer: null,// 技能组柜员状态统计
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
            {name: '今日', id: '1'},
            {name: '本周', id: '2'},
            {name: '本月', id: '3'},
            {name: '全年', id: '4'},
        ],
        // DateValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        dateValue: '',  //时间选择器时间
    },
    mounted(){
        this.onSiteStatusAgentNumsEcharts();
        // this.callInNumsEcharts();
        // this.inOutTrendEcharts();

        // Echart 缩放
        let _this = this;
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.onSiteStatusAgentNumsContainer.resize();
                // _this.callInNumsContainer.resize();
                // _this.inOutTrendContainer.resize();
            }, 100)
        })

        setTimeout(() =>{
            this.refreshOnSiteStatusAgentNumsEcharts()
        },2000)
        // setTimeout(() =>{
        //     this.refreshCallInNumsEcharts()
        // },2000)
        // setTimeout(() =>{
        //     this.refreshInOutTrendEcharts()
        // },2000)
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        }
    },
    methods: {
        // 点击全部技能组
        click_AllSkillGroups(){
            console.log(this.btn_AllSkillGroups)
        },
        //选择单一业务组
        select_SkillGroups(name) {
            console.log(name)
            this.btn_SkillGroups = name
        },
        

        //满意度 --柱形图
        onSiteStatusAgentNumsEcharts(){
            console.log(this.$refs.onSiteStatusAgentNumsEcharts)
            var dom = this.$refs.onSiteStatusAgentNumsEcharts;
            this.onSiteStatusAgentNumsContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    // type: 'plain',
                    orient: 'vertical',
                    right: 20,
                    top: 20,
                    data: ['就绪', '小休', '振铃', '通话', '事后处理']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '24',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 335, name: '就绪'},
                            {value: 310, name: '小休'},
                            {value: 234, name: '振铃'},
                            {value: 135, name: '通话'},
                            {value: 1548, name: '事后处理'}
                        ]
                    }
                ]
            }
            if(option && typeof option === 'object') {
                this.onSiteStatusAgentNumsContainer.setOption(option, true)
            }
        },

        // 模拟刷新现场各状态柜员人数
        refreshOnSiteStatusAgentNumsEcharts(){
            var data = [
                {value: 1235, name: '就绪'},
                {value: 310, name: '小休'},
                {value: 434, name: '振铃'},
                {value: 535, name: '通话'},
                {value: 1548, name: '事后处理'}
            ];
            this.onSiteStatusAgentNumsContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },
    }
})
