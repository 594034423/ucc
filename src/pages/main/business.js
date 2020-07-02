var vm = new Vue({
    name: 'business',
    el: '#app',
    data: {
        tree:[{
            label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }

    },
    created(){
        this._getAllLabelTreeGrid()
    },
    methods: {
        handleNodeClick(data) {
            console.log(data.$treeNodeId);
        },

        _getAllLabelTreeGrid(){
            getAllLabelTreeGrid({labelType:'business'})
            .then(res => {
                console.log(res.data.rows[0].text)
                this.tree[0].label = res.data.rows[0].text
            })
            .catch(err => {
                console.log(222)
            })
        }

        // onload(){
        //     axios.get('http://192.168.0.80/uomp/businessLabel/getAllLabelTreeGrid?labelType=business')
        //     .then(res => {
        //         this.tree[0].label = res.data.rows[0].text
        //         console.log(res.data.rows[0])
        //     })
        //     .catch(err => {
        //         console.log(222);
        //     })
        // }
    },
})