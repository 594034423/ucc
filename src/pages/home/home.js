var vm = new Vue({
    name: 'home',
    el: '#app',
    data: {
        isCollapse: false,
        badgeNum: 51,
        activeName: 'first',
        // isFrameShow: false,
        navList: [
            { index: 'business', icon: 'el-icon-location', title: '业务处理'},
            { index: 'menu', icon: 'el-icon-menu', title: '个人中心'}
        ],
        iframeList: [
            {iframeSrc:'../main/business.html',id: 'business',iframeName:'business', isFrameShow:true},
            {iframeSrc:'../main/index2.html',id:2,iframeName:'iframe2', isFrameShow:false},
            // {iframeSrc:'../main/index3.html',id:3,iframeName:'iframe3', isFrameShow:false},
            // {iframeSrc:'../main/index4.html',id:4,iframeName:'iframe4', isFrameShow:false},
        ],
        agentName: '冒险岛',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    },
    created(){
        // this.onload()
    },
    methods: {
        isShowTabs() {
        this.showTabs = !this.showTabs;
        console.log(this.showTabs)
        },
    handleClick(tab, event) {
    console.log(tab, event);
    },


    //控制iframe显示与隐藏，保证页面不刷新
    jumpFrame(index) {
    console.log(index)
    for(let i=0; i<this.iframeList.length; i++){
        if(index==this.iframeList[i].id){
        this.iframeList[i].isFrameShow = true
        }else{
        this.iframeList[i].isFrameShow = false
        }
    }
    }

    }
})