<style lang="less" scoped="">
    @import "~@/styles/constant";
    .page-watch-list{
        .ivu-input-search{
            background: @mainColor!important;
            border-color: @mainColor!important;
        }
    }
</style>
<template>
    <div class="page-watch-list">
        <div style="margin:0 0 20px 0">
            <Input search enter-button placeholder="请输入手表名称搜索" v-model="keyWords" style="width: 300px" @on-search="search"/>
        </div>
        <Table  ref="table" :columns="columns7" :data="data" :no-data-text="'没有查询到更多数据!'" :tooltip-theme="'light'" :loading="loading" :width="'calc(100% - 40px)'" :max-height="tableHeight"></Table>
        <div style="margin: 20px;overflow: hidden">
            <div style="text-align: center">
                <Page :total="total" :current="current" @on-change="changePage" :page-size="size" show-total></Page>
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
                                    src:params.row.slideUrls[0]
                                }})
                            ])
                        }
                    },
                    {
                        title: '手表名称',
                        key: 'watchName',
                        col:28,
                        ellipsis:true,
                        tooltip:true,
                        render: (h, params) => {
                            return  h('span', {
                                slot: 'content',
                                style: { whiteSpace: 'normal', wordBreak: 'break-all',lineHeight:"30px",fontWeight:"bold",cursor:"pointer"},
                                on: {click: () => {
                                    // this.$router.push({
                                    //     path:"/watch/detail",
                                    //     query:{
                                    //         id:params.row.watchId
                                    //     }
                                    // })
                                }}
                            },params.row.watchName)
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
                                    on: {click: () => {
                                        this.$router.push({
                                            path:"/watch/edit",
                                            query:{
                                                id:params.row.watchId
                                            }
                                        })
                                    }}
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: params.row.status === "Y"?"error":"success",
                                        size: 'small'
                                    },
                                    on:{
                                        click: () => {
                                            this.$Modal.confirm({
                                                render:(h)=>{
                                                    return h(
                                                        "p",{},[
                                                            h(
                                                                "span",
                                                                "你即将要"
                                                            ),
                                                            h(
                                                                "span",{style:{"color":"red",fontWeight:"bold"}},` ${params.row.status === "Y"?"下架":"上架"} `
                                                            ),
                                                            h(
                                                                "strong",{style:{fontWeight:"bold"}},params.row.watchName
                                                            ),
                                                            h(
                                                                "span"," ，确定吗?"
                                                            )
                                                        ]
                                                    )
                                                },
                                                onOk:async()=>{
                                                    await this.toggleStatus(params.row.watchId,params.row.status === "Y"?"N":"Y");
                                                }
                                            });
                                        }
                                    }
                                },params.row.status === "Y"?"下架":"上架")
                            ]);
                        }
                    }
                ],
                data:[],
                current:1,
                size:10,
                total:1
            }
        },
        methods: {
            async changePage (page) {
                this.current = page;
                await this.fetchData();
            },
            async search(value){
                this.fastSearch({watchName:value})
            },
            async toggleStatus(watchId,status){
                await watchServices.update({
                    watchId,status
                });
                await this.fetchData();
            },
            async fetchData(filter={},reset = false){
                if(reset){
                    this.current = 1;
                    this.total = 1;
                }
                let result =  await watchServices.getPage({
                    loading:true,
                    page:this.current,
                    size:this.size,
                    filter
                });
                this.total = result.total;
                this.data = result.data;
                this.current = result.current;
            },
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
        beforeRouteLeave(to,from,next){
            window.onresize = null;
            next();
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
