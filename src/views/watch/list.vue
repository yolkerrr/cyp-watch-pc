<style lang="less">
    .page-watch-list{

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
        <Table  :columns="columns7" :data="data6" :no-data-text="'-- --'" :loading="loading"></Table>
        <div style="margin: 20px;overflow: hidden">
            <div style="text-align: center">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import * as watchServices from "../../api/watch"
    import utils from "../../libs/util"
    export default {
        name:"watch-list",
        data:function () {
            return {
                keyWords:"",
                loading:false,
                columns7: [
                    {
                        width:400,
                        title: '手表名称',
                        key: 'name',
                        ellipsis:true,
                        tooltip:true,
                        render: (h, params) => {
                            return h('Tooltip', {
                                transfer:true,
                                style:{width:"100%",overflow:"hidden",fontWeight:"bold"},
                                props: { placement: 'bottom' }
                            }, [
                                params.row.name,
                                h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },params.row.name)
                            ])
                        }
                    },
                    {
                        title: '手表型号',
                        key: 'model',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.model||"-- --")
                            ]);
                        }
                    },
                    {
                        title: '手表规格',
                        key: 'spec',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.spec||"-- --")
                            ]);
                        }
                    },
                    {
                        title: '手表价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.price||"-- --")
                            ]);
                        }
                    },
                    {
                        title: '手表状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div', [
                                h('span',{style:{color:params.row.status==="Y"?"#19be6b":"#ed4014"}}, params.row.status==="Y"?"上架中":"已下架")
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
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
                        name: 'John Brown New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            changePage () {

            },
            search(value){
                console.log(value);
            }
        },
        async created(){
            // this.$Spin.show({
            //     render: (h) => {
            //         return h('div', [
            //             h('Icon', {
            //                 'class': 'demo-spin-icon-load',
            //                 props: {
            //                     type: 'ios-loading',
            //                     size: 18
            //                 }
            //             }),
            //             h('div', '正在加载中...')
            //         ])
            //     }
            // });
            // setTimeout(() => {
            //     this.$Spin.hide();
            // }, 3000);
        }
    }
</script>
