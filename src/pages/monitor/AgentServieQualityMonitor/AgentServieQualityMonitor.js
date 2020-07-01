var vm = new Vue({
    name: 'TrafficMonitor',
    el: '#app',
    data: {
        btn_AllSkillGroups: '全部技能组',   //全部技能组按钮
        btn_SkillGroups: '个人业务咨询', //个人业务按钮
        btn_Scene: '现场', //现场按钮
        btn_Outlets: '网点', // 网点按钮
        btn_PanyuSubBranch: '番禺支行', //番禺支行按钮
        isDsiabeld: true,   //控制番禺支行按钮是否显示
        skillGroupAct: 'AllSkillGroups',   //技能组控制点击按钮
        fieldAct: 'Scene',
        branchAct: false,
        //技能组列表
        skillGroupsList: [
            {name: '手机银行', id: '1', nums: 1000},
            {name: '官方公众号', id: '2', nums: 1000},
            {name: '信用卡公众号', id: '3', nums: 1000},
            {name: '理财公众号', id: '4', nums: 1000},
            {name: '网银', id: '5', nums: 1000},
            {name: '直销银行', id: '6', nums: 1000},
            {name: 'PC官网', id: '7', nums: 1000},
        ],
        // 表头数据
        tableHeader: [
            { label: '排名', key: 'id', width: '80'},
            { label: '工号', key: 'agent', width: ''},
            { label: '姓名', key: 'name', width: ''},
            { label: '有效工作时长', key: 'effectiveWorkTime', width: '140'},
            { label: '忙线率', key: 'busyLineRate', width: '120'},
            { label: '平均呼入通话时长', key: 'avgCallInTime', width: '160'},
            { label: '参评率', key: 'participationRate', width: ''},
            { label: '满意度', key: 'satisfaction', width: ''},
            { label: '差评率', key: 'badpostRate', width: ''},

        ],
        //表格数据
        tableDate:[{
                "id":1,
                "agent": "20086",
                "name": "厄斐琉斯",
                "effectiveWorkTime":"1分02秒",
                "busyLineRate": "50%",
                "avgCallInTime": "1分14秒",
                "participationRate": "14%",
                "satisfaction": "95%",
                "badpostRate": "0%"
            }, {
                "id":2,
                "agent": "20014",
                "name": "德莱文",
                "effectiveWorkTime":"2分22秒",
                "busyLineRate": "60%",
                "avgCallInTime": "5分14秒",
                "participationRate": "38%",
                "satisfaction": "98%",
                "badpostRate": "0%"
            }, {
                "id":3,
                "agent": "20013",
                "name": "寒冰",
                "effectiveWorkTime":"1分34秒",
                "busyLineRate": "55%",
                "avgCallInTime": "3分64秒",
                "participationRate": "34%",
                "satisfaction": "98%",
                "badpostRate": "2.2%"
            }, {
                "id":4,
                "agent": "20080",
                "name": "伊泽瑞尔",
                "effectiveWorkTime":"5分21秒",
                "busyLineRate": "52%",
                "avgCallInTime": "1分16秒",
                "participationRate": "64%",
                "satisfaction": "98%",
                "badpostRate": "0%"
            },
            {
                "id":5,
                "agent": "20013",
                "name": "凯丽斯塔",
                "effectiveWorkTime":"2分32秒",
                "busyLineRate": "15%",
                "avgCallInTime": "2分12秒",
                "participationRate": "14%",
                "satisfaction": "94%",
                "badpostRate": "0%"
            },
            {
                "id":6,
                "agent": "20013",
                "name": "幻影",
                "effectiveWorkTime":"5分32秒",
                "busyLineRate": "15%",
                "avgCallInTime": "3分44秒",
                "participationRate": "54%",
                "satisfaction": "94%",
                "badpostRate": "5.1%"
            },
            {
                "id":7,
                "agent": "20013",
                "name": "英雄",
                "effectiveWorkTime":"1分24秒",
                "busyLineRate": "12%",
                "avgCallInTime": "3分14秒",
                "participationRate": "54%",
                "satisfaction": "94%",
                "badpostRate": "4%"
            },
            {
                "id":8,
                "agent": "20013",
                "name": "黑骑士",
                "effectiveWorkTime":"1分23秒",
                "busyLineRate": "150",
                "avgCallInTime": "13分14秒",
                "participationRate": "44%",
                "satisfaction": "94%",
                "badpostRate": "0%"
            },
            {
                "id":9,
                "agent": "20013",
                "name": "圣骑士",
                "effectiveWorkTime":"2分12秒",
                "busyLineRate": "150",
                "avgCallInTime": "31分14秒",
                "participationRate": "31%",
                "satisfaction": "94%",
                "badpostRate": "0%"
            },
            {
                "id":10,
                "agent": "20013",
                "name": "凯丽斯塔",
                "effectiveWorkTime":"3分02秒",
                "busyLineRate": "150",
                "avgCallInTime": "32分14秒",
                "participationRate": "32%",
                "satisfaction": "94%",
                "badpostRate": "0%"
            },
            {
                "id":11,
                "agent": "20013",
                "name": "剑神",
                "effectiveWorkTime":"3分12秒",
                "busyLineRate": "150",
                "avgCallInTime": "13分14秒",
                "participationRate": "34%",
                "satisfaction": "94%",
                "badpostRate": "0%"
            },
        ],
        //分页参数
        tablePagination:[{
            currentPage: 1,  //默认当前分页数
            total: 300,    //总页数
            pageSize: 10,   //每页多少条
            pageSizes: [10,20,30,40], //设置每页多少条数据
        }]
    },
    watch: {
    },
    methods: {
        // 点击全部技能组
        click_AllSkillGroups(index){
            this.skillGroupAct = index
            console.log(this.btn_AllSkillGroups)
        },

        //选择单一业务组
        select_SkillGroupsList(name) {
            console.log(name)
            this.btn_SkillGroups = name
            this.skillGroupAct = 'SkillGroups'
        },
        // 点击现场
        click_Scene(index){
            console.log(this.btn_Scene)
            this.isDsiabeld = true
            this.fieldAct = index
        },
        // 点击网点
        click_Outlets(index){
            console.log(this.btn_Outlets)
            this.isDsiabeld = false
            this.fieldAct = index
        },
        click_PanyuSubBranch() {
            console.log(this.btn_PanyuSubBranch)
            this.branchAct = !this.branchAct
        },

        //差评率颜色显示
        tableRowStyle({ row, column, rowIndex, columnIndex }) {
            if(row.badpostRate != '0%' && columnIndex == 8)
            return 'color:red'
        },

        // 分页操作函数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
})
