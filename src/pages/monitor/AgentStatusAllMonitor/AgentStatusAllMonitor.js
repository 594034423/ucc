var vm = new Vue({
    name: 'AgentStatusAllMonitor',
    el: '#app',
    data: {
        onSiteStatusAgentNumsContainer: null, // 现场各状态柜员人数
        onSiteStarAgentNumsContainer: null, // 现场各星级柜员人数
        skillGroupsAgentStatusContainer: null,// 技能组柜员状态统计
        btn_AllSkillGroups: '全部技能组', 
        btn_SkillGroups: '单一技能组',
        skillGroupsAct: 'AllSkillGroups',   //技能组控制点击按钮
        skillGroupsList: [
            // {name: '个人业务咨询', id: '1', nums: 11234},
            // {name: '个人业务办理', id: '2', nums: 1040},
            // {name: '信用卡业务', id: '3', nums: 1240},
            // {name: '对公业务', id: '4' ,nums: 105},
            // {name: '理财业务', id: '5' ,nums: 150},
            // {name: '贷款业务', id: '6' ,nums: 1010},
            // {name: '反欺诈业务', id: '7' ,nums: 140},
        ],
        starValue: null,
        starColors:['#99A9BF', '#F7BA2A', '#FF9900'],
        todayStatus:{}, //今日各个状态 -- 现场状态和环形图
        echartData:{
            agentStatus:[],
            agentStar:[]
        },
        skillAgents:[]  //技能组各状态柜员数 -- 柱形图

    },
    created(){
        let that = this;
        // that.localStorageFn();

        //各个状态柜员数 --5秒刷新一次
        that._getMonitorVideoAgents();
        // window.setInterval(()=>{
        //     setTimeout(that._getMonitorVideoAgents(),0)
        //     console.log('各个状态柜员数')
        // },5000)
        that._getMonitorSkillAgentNum();

        //技能组各状态柜员数 --星级
        // window.setInterval(()=>{
        //     setTimeout(that._getMonitorSkillAgentNum(),0)
        //     console.log('技能组各状态柜员数')
        // },5000)
        that._getSkillAndChannel()
    },
    mounted(){
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
    },
    watch: {
        // 监控时间选择器的日期选择
        dateValue(date) {
            console.log(date)
        },
    },
    methods: {
        // 点击全部技能组
        click_AllSkillGroups(){
            this.skillGroupsAct = null
            this.btn_SkillGroups = '单一技能组'
            console.log(this.btn_AllSkillGroups)
            this._getMonitorVideoAgents()
        },
        //选择单一业务组
        select_SkillGroups(code,name) {
            console.log(code)
            this.btn_SkillGroups = name
            this.skillGroupsAct = code
            this._getMonitorVideoAgents()
        },
        

        //现场各状态柜员人数--环形图
        onSiteStatusAgentNumsEcharts() {
            // console.log(this.$refs.onSiteStatusAgentNumsEcharts)
            var dom = this.$refs.onSiteStatusAgentNumsEcharts;
            this.onSiteStatusAgentNumsContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '50%',
                    top:'15%',
                    itemGap:8,
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
                                fontSize:14,
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
                        radius: ['50%', '70%'],
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
                            }
                        },
                        data: [
                            {value: this.todayStatus.idleAgentNum, name: '就绪'},
                            {value: this.todayStatus.busyAgentNum, name: '小休'},
                            {value: this.todayStatus.ringingAgentNum, name: '振铃'},
                            {value: this.todayStatus.takingAgentNum, name: '通话'},
                            {value: this.todayStatus.acwAgentNum, name: '事后处理'}
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
            // console.log(this.$refs.onSiteStarAgentNumsEcharts)
            var dom = this.$refs.onSiteStarAgentNumsEcharts;
            this.onSiteStarAgentNumsContainer = echarts.init(dom)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '50%',
                    top:'15%',
                    itemGap:8,
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
                        radius: ['50%', '70%'],
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
                            {value: this.todayStatus.oneStarAgentNum, name: '一星'},
                            {value: this.todayStatus.towStarAgentNum, name: '二星'},
                            {value: this.todayStatus.threeStarAgentNum, name: '三星'},
                            {value: this.todayStatus.fourStarAgentNum, name: '四星'},
                            {value: this.todayStatus.fiveStarAgentNum, name: '五星'}
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
            // console.log(this.$refs.skillGroupsAgentStatusEcharts,111)
            var dom = this.$refs.skillGroupsAgentStatusEcharts;
            this.skillGroupsAgentStatusContainer = echarts.init(dom)
            var option = {
                legend: {},
                tooltip: {},
                dataset: {
                    // source: [
                    //     ['product', '空闲', '小休','振铃','通话', '事后处理'],
                    //     ['信用卡业务', 40, 60, 90,20, 12],
                    //     ['信用卡业务', 83, 73, 55,20, 20],
                    //     ['对公业务', 86, 65, 82,30 ,80],
                    //     ['理财业务', 72, 53, 39, 40,30],
                    //     ['贷款业务', 22, 33, 49,64 ,90],
                    //     ['大额转账', 72, 53, 39, 41,22]
                    // ]
                    source: this.echartData.agentStar
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
        
        //星级选择
        starRate(index){
            console.log(index)
            this.starValue = index
            this._getMonitorSkillAgentNum()

        },
        //清空星级
        clearStar(){
            this.starValue = null
            this._getMonitorSkillAgentNum()
        },
        //各个状态柜员数
        _getMonitorVideoAgents(){
            getMonitorVideoAgents({
                skillGroupCode:this.skillGroupsAct
            })
            .then(res => {
                this.todayStatus = res.map
                this.onSiteStarAgentNumsEcharts()
                this.onSiteStatusAgentNumsEcharts()
                console.log(res)
            })
            .catch(err => {
                console.log(err, 'getMonitorVideoAgents,各状态柜员数数据异常')
            })
        },

        //技能组各状态柜员数
        _getMonitorSkillAgentNum(){
            getMonitorSkillAgentNum({serviceStart:this.starValue})
            .then(res => {
                this.skillAgents = res.map.skillAgents
                var temp = [];
                temp.push(['product', '就绪', '小休', '振铃', '通话', '事后处理'])
                for(let i = 0; i < Object.values(this.skillAgents).length; i++){
                    temp.push([
                        Object.keys(this.skillAgents)[i],
                        Object.values(this.skillAgents)[i].idleAgentNum != 0 ? Object.values(this.skillAgents)[i].idleAgentNum : 20,
                        Object.values(this.skillAgents)[i].busyAgentNum != 0 ? Object.values(this.skillAgents)[i].busyAgentNum : 30,
                        Object.values(this.skillAgents)[i].ringingAgentNum != 0 ? Object.values(this.skillAgents)[i].ringingAgentNum : 40,
                        Object.values(this.skillAgents)[i].takingAgentNum != 0 ? Object.values(this.skillAgents)[i].takingAgentNum : 50,
                        Object.values(this.skillAgents)[i].acwAgentNum != 0 ? Object.values(this.skillAgents)[i].acwAgentNum: 60
                    ])
                }
                this.echartData.agentStar = temp;
                temp = [];
                this.skillGroupsAgentStatusEcharts()
            })
            .catch(err => {
                console.log(err,'getMonitorSkillAgentNum,技能组各状态柜员数数据异常')
            })
        },

        //获取渠道和技能组信息
        _getSkillAndChannel(){
            getSkillAndChannel()
            .then(res => {
                this.skillGroupsList = res.map.skillGroups
            })
        },
        objLength(obj){
            let count = 0;
            for(let i in obj){
                count++;
            }
            return count;
        }

    }
})
