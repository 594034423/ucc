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
            { label: '状态', key: 'status', width: ''},
            { label: '状态时长(s)', key: 'statusTime', width: '120'},
            { label: '呼入应答总数', key: 'callInNums', width: '140'},
            { label: '平均呼入通话时长', key: 'avgCallInTime', width: '160'},
            { label: '满意度', key: 'satisfaction', width: '100'},
            { label: '呼出应答总数', key: 'callOutAnsNums', width: '140'},

        ],
        //表格数据
        tableDate:[{
                "id":1,
                "agent": "20086",
                "name": "厄斐琉斯",
                "status":"通话",
                "statusTime": "50",
                "callInNums": "26",
                "avgCallInTime": "2分02秒",
                "satisfaction": "95%",
                "callOutAnsNums": "12"
            }, {
                "id":2,
                "agent": "20014",
                "name": "德莱文",
                "status":"事后处理",
                "statusTime": "60",
                "callInNums": "20",
                "avgCallInTime": "2分24秒",
                "satisfaction": "98%",
                "callOutAnsNums": "12"
            }, {
                "id":3,
                "agent": "20013",
                "name": "寒冰",
                "status":"事后处理",
                "statusTime": "550",
                "callInNums": "20",
                "avgCallInTime": "2分24秒",
                "satisfaction": "98%",
                "callOutAnsNums": "32"
            }, {
                "id":4,
                "agent": "20080",
                "name": "伊泽瑞尔",
                "status":"通话",
                "statusTime": "520",
                "callInNums": "21",
                "avgCallInTime": "1分24秒",
                "satisfaction": "98%",
                "callOutAnsNums": "52"
            },
            {
                "id":5,
                "agent": "20013",
                "name": "凯丽斯塔",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":6,
                "agent": "20013",
                "name": "幻影",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":7,
                "agent": "20013",
                "name": "英雄",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":8,
                "agent": "20013",
                "name": "黑骑士",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":9,
                "agent": "20013",
                "name": "圣骑士",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":10,
                "agent": "20013",
                "name": "凯丽斯塔",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
            },
            {
                "id":11,
                "agent": "20013",
                "name": "",
                "status":"事后处理",
                "statusTime": "150",
                "callInNums": "22",
                "avgCallInTime": "3分14秒",
                "satisfaction": "94%",
                "callOutAnsNums": "62"
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
    mounted(){
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

        // 分页操作函数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
})
