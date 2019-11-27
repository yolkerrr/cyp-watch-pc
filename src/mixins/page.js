export default {
    methods:{
        openLoading(tips = "加载数据中..."){
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', tips)
                    ])
                }
            });
        },
        closeLoading(){
            this.$Spin.hide();
        }
    },
    async created(){
        this.openLoading();
        this.fetchData && await this.fetchData();
        this.closeLoading();
    }
}