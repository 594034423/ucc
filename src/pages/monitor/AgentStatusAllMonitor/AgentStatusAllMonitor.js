var vm = new Vue({
    name: 'AgentStatusAllMonitor',
    el: '#app',
    data: {
        onSiteStatusAgentNumsContainer: null, // 现场各状态柜员人数
        onSiteStarAgentNumsContainer: null, // 现场各星级柜员人数
        skillGroupsAgentStatusContainer: null,// 技能组柜员状态统计
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '个人业务咨询',
        skillGroupsList: [
            {name: '个人业务咨询', id: '1', nums: 11234},
            {name: '个人业务办理', id: '2', nums: 1040},
            {name: '信用卡业务', id: '3', nums: 1240},
            {name: '对公业务', id: '4' ,nums: 105},
            {name: '理财业务', id: '5' ,nums: 150},
            {name: '贷款业务', id: '6' ,nums: 1010},
            {name: '反欺诈业务', id: '7' ,nums: 140},
        ],
    },
    mounted(){
        this.onSiteStatusAgentNumsEcharts();
        this.onSiteStarAgentNumsEcharts();
        this.skillGroupsAgentStatusEcharts();

        // Echart 缩放
        let _this = this;
        window.addEventListener('resize', function () { 
            if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
                _this.resizeTimer = setTimeout(function () {
                _this.onSiteStatusAgentNumsContainer.resize();
                _this.onSiteStarAgentNumsContainer.resize();
                _this.skillGroupsAgentStatusContainer.resize();
            }, 100)
        })

        setTimeout(() => {
            this.refreshOnSiteStatusAgentNumsEcharts()
        },2000)

        setTimeout(() => {
            this.refreshOnSiteStarAgentNumsEcharts()
        },3000)

        setTimeout(() => {
            this.refreshSkillGroupsAgentStatusEcharts()
        },4000)
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
        

        //现场各状态柜员人数--环形图
        onSiteStatusAgentNumsEcharts() {
            console.log(this.$refs.onSiteStatusAgentNumsEcharts)
            var dom = this.$refs.onSiteStatusAgentNumsEcharts;
            this.onSiteStatusAgentNumsContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 20,
                    top: 20,
                    itemWidth: 28,
                    textStyle: {
                        fontSize: 14,
                        lineHeight: 14,
                        // rich 富文本 name 对应formatter里面的 name
                        //      相当于插入一个空槽
                        rich: {
                            name:{
                                fontSize:16,
                                align:'left',
                                width: 65
                            },
                            value: {
                                fontSize:16,
                                align:'center',
                            }
                        }
                    },
                    data: ['就绪', '小休', '振铃', '通话', '事后处理'],
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
                        radius: ['50%', '80%'],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
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
                            }
                        },
                        data: [
                            {value: 1335, name: '就绪'},
                            {value: 310, name: '小休'},
                            {value: 234, name: '振铃'},
                            {value: 135, name: '通话'},
                            {value: 1548, name: '事后处理'}
                        ],
                    }
                ]
            }
            if(option && typeof option === 'object') {
                this.onSiteStatusAgentNumsContainer.setOption(option, true)
            }
        },

        //现场各星级柜员人数--环形图
        onSiteStarAgentNumsEcharts() {
            console.log(this.$refs.onSiteStarAgentNumsEcharts)
            var dom = this.$refs.onSiteStarAgentNumsEcharts;
            this.onSiteStarAgentNumsContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 30,
                    top: 20,
                    itemWidth: 28,
                    textStyle: {
                        fontSize: 14,
                        lineHeight: 14,
                        rich: {
                            name:{
                                fontSize:16,
                                align:'left',
                                width: 65
                            },
                            value: {
                                fontSize:16,
                                align:'center',
                            }
                        }
                    },
                    data: ['一星', '二星', '三星', '四星', '五星'],
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
                        radius: ['50%', '80%'],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
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
                            }
                        },
                        data: [
                            {value: 152, name: '一星'},
                            {value: 302, name: '二星'},
                            {value: 44, name: '三星'},
                            {value: 55, name: '四星'},
                            {value: 148, name: '五星'}
                        ],
                    }
                ]
            }
            if(option && typeof option === 'object') {
                this.onSiteStarAgentNumsContainer.setOption(option, true)
            }
        },

        //技能组柜员状态统计--对比柱形图
        skillGroupsAgentStatusEcharts() {
            console.log(this.$refs.skillGroupsAgentStatusEcharts,111)
            var dom = this.$refs.skillGroupsAgentStatusEcharts;
            this.skillGroupsAgentStatusContainer = echarts.init(dom)
            var option = {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '空闲', '小休', '通话', '事后处理'],
                        ['个人业务咨询', 40, 60, 90, 12],
                        ['信用卡业务', 83, 73, 55, 20],
                        ['对公业务', 86, 65, 82, 80],
                        ['理财业务', 72, 53, 39, 30],
                        ['贷款业务', 22, 33, 49, 90],
                        ['大额转账', 72, 53, 39, 22]
                    ]
                },
                grid: {
                    bottom: '10%',
                    // right: '2%',
                    // left: '10%'
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        barGap:'0%',/*多个并排柱子设置柱子之间的间距*/
                        barCategoryGap:'40%',/*多个并排柱子设置柱子之间的间距*/
                    },
                    {type: 'bar'},
                    {type: 'bar'},
                    {type: 'bar'}
                ]
            }
            if(option && typeof option === 'object') {
                this.skillGroupsAgentStatusContainer.setOption(option, true)
            }
        },
        
        // 模拟刷新现场各状态柜员人数
        refreshOnSiteStatusAgentNumsEcharts() {
            var data = [
                {value: 1152, name: '就绪'},
                {value: 3102, name: '小休'},
                {value: 434, name: '振铃'},
                {value: 535, name: '通话'},
                {value: 1548, name: '事后处理'}
            ];
            console.log("刷新")
            this.onSiteStatusAgentNumsContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新现场各星级柜员人数
        refreshOnSiteStarAgentNumsEcharts() {
            var data = [
                {value: 5152, name: '一星'},
                {value: 102, name: '二星'},
                {value: 434, name: '三星'},
                {value: 535, name: '四星'},
                {value: 1248, name: '五星'}
            ];
            console.log("刷新2")
            this.onSiteStarAgentNumsContainer.setOption({
                series: [{
                    data: data
                }]
            })
        },

        // 模拟刷新技能组柜员状态统计
        refreshSkillGroupsAgentStatusEcharts() {
            var data = [
                ['product', '空闲', '小休', '通话', '事后处理'],
                ['个人业务咨询', 12, 40, 90, 12],
                ['信用卡业务', 33, 34, 25, 50],
                ['对公业务', 46, 12, 42, 80],
                ['理财业务', 52, 23, 59, 20],
                ['贷款业务', 62, 32, 49, 20],
                ['大额转账', 72, 51, 69, 22]
            ]
            console.log('刷新3')
            this.skillGroupsAgentStatusContainer.setOption({
                dataset: {
                    source: data
                }
            })
        }
    }
})
