<style lang="less" scoped="">
    @import "~@/styles/constant";
    .page-watch-list{
        .ivu-input-search{
            background: @mainColor!important;
            border-color: @mainColor!important;
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
        -webkit-animation: ani-demo-spin 1s linear infinite;
    }
    @-webkit-keyframes ani-demo-spin {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }

        50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes ani-demo-spin {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }

        50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
<template>
    <div class="page-watch-list">
        <div style="margin:0 0 20px 0">
            <Input search enter-button placeholder="输入手表名称,型号,规格搜索" v-model="keyWords" style="width: 300px" @on-search="search"/>
        </div>
        <Table  ref="table" :columns="columns7" :data="data6" :no-data-text="'-- --'" :loading="loading" :width="'calc(100% - 40px)'" :max-height="tableHeight"></Table>
        <div style="margin: 20px;overflow: hidden">
            <div style="text-align: center">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import * as watchServices from "@/api/watch"
    import utils from "@/libs/util"
    import pageMixins from "@/mixins/page"
    export default {
        name:"watch-list",
        mixins:[pageMixins],
        data:function () {
            const mainColor = "#66ccff";
            return {
                keyWords:"",
                loading:false,
                tableHeight:450,
                columns7: [
                    {
                        col:14,
                        title: '手表图片',
                        key: 'img',
                        align:"center",
                        render: (h, params) => {
                            return  h("div",{style:{
                                padding:"30px"
                            }},[
                                h('img', {style: { width:"48px",height:"48px",verticalAlign: "middle"},attrs:{
                                    src:params.row.img
                                }})
                            ])
                        }
                    },
                    {
                        title: '手表名称',
                        key: 'name',
                        col:28,
                        ellipsis:true,
                        tooltip:true,
                        render: (h, params) => {
                            return  h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all',lineHeight:"30px",fontWeight:"bold"} },params.row.name)
                        }
                    },
                    {
                        title: '手表型号',
                        key: 'model',
                        col:11,
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.model||"-- --")
                            ]);
                        }
                    },
                    {
                        title: '手表规格',
                        key: 'spec',
                        col:11,
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.spec||"-- --")
                            ]);
                        }
                    },
                    {
                        title: '手表价格',
                        key: 'price',
                        col:14,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{"style":{color:"#ed4014"}}, params.row.price ? `￥ ${Number(params.row.price).toFixed(2)}`:0)
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:80,
                        col:10,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{style:{color:params.row.status==="Y"?mainColor:"#ed4014"}}, params.row.status==="Y"?"上架中":"已下架")
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        fixed: 'right',
                        col:14,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: params.row.status === "Y"?"error":"success",
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },params.row.status === "Y"?"下架":"上架")
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Sportive运动系列 海神波塞冬3438.131.96.16.30机械男表",
                        price: 5520,
                        model:"3438.131.96.16.30",
                        brand:"爱宝时",
                        spec:"钢 蓝色 不锈钢",
                        code:"63355",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/201704_13_3437_132_24_16_34_05435.jpg",
                        id:1,
                        status:"Y"
                    },
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Ladies女士系列 浪漫星月 4391.832.20.16.15 机械女表（绝版）",
                        price: 14640,
                        model:"4391.832.20.16.15",
                        brand:"爱宝时",
                        spec:"真皮 蓝色 牛皮",
                        code:"62885",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/b8018b2101b641f0816bd1bda15003ce.jpg",
                        id:2
                    },
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Sportive运动系列 海神波塞冬3438.131.96.16.30机械男表",
                        price: 5520,
                        model:"3438.131.96.16.30",
                        brand:"爱宝时",
                        spec:"钢 蓝色 不锈钢",
                        code:"63355",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/201704_13_3437_132_24_16_34_05435.jpg",
                        id:1
                    },
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Ladies女士系列 浪漫星月 4391.832.20.16.15 机械女表（绝版）",
                        price: 14640,
                        model:"4391.832.20.16.15",
                        brand:"爱宝时",
                        spec:"真皮 蓝色 牛皮",
                        code:"62885",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/b8018b2101b641f0816bd1bda15003ce.jpg",
                        id:2
                    },
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Sportive运动系列 海神波塞冬3438.131.96.16.30机械男表",
                        price: 5520,
                        model:"3438.131.96.16.30",
                        brand:"爱宝时",
                        spec:"钢 蓝色 不锈钢",
                        code:"63355",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/201704_13_3437_132_24_16_34_05435.jpg",
                        id:1
                    },
                    {
                        name: "瑞士艺术制表大师爱宝时（EPOS）-Ladies女士系列 浪漫星月 4391.832.20.16.15 机械女表（绝版）",
                        price: 14640,
                        model:"4391.832.20.16.15",
                        brand:"爱宝时",
                        spec:"真皮 蓝色 牛皮",
                        code:"62885",
                        img:"https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/b8018b2101b641f0816bd1bda15003ce.jpg",
                        id:2
                    },
                ]
            }
        },
        methods: {
            changePage () {

            },
            search(value){
                console.log(value);
            },
            fetchData(){},
            initTableColumns(){
                const reduceWidth = 170+40;
                const width = window.document.body.clientWidth - reduceWidth;
                this.columns7.forEach((item)=>{
                    let {col} = item;
                    item.width = width*(col/100);
                })
            },
            initTableHeight(){
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160;
            }
        },
        mounted(){
            const vm = this;
            this.initTableColumns();
            this.initTableHeight();
            window.onresize = function(){ // 定义窗口大小变更通知事件
                vm.initTableColumns();
                vm.initTableHeight();
            };
        }
    }
</script>
