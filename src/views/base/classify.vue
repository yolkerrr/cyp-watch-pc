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
        <div style="margin:0 0 20px 0;position: relative">
            <Input search enter-button placeholder="输入分类关键字搜索" v-model="keyWords" style="width: 300px" @on-search="search"/>
            <Button type="primary" style="position: absolute;right:20px;top:0" @click="value3=true;actionType='new'">新建分类</Button>
        </div>
        <Table  ref="table" :columns="columns7" :data="data" :no-data-text="'没有查询到更多数据!'" :tooltip-theme="'light'" :loading="loading" :width="'calc(100% - 40px)'" :max-height="tableHeight"></Table>
        <div style="margin: 20px;overflow: hidden">
            <div style="text-align: center">
                <Page :total="total" :current="current" @on-change="changePage" :page-size="size" show-total></Page>
            </div>
        </div>
        <Drawer
                :title="actionType==='new'?'新建分类':'编辑分类'"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData" :rules="ruleCustom" ref="formCustom" :label-width="80">
                <Row>
                    <Col span="24">
                    <FormItem label="分类名字" :prop="'classify'" required>
                        <Input v-model="formData.classify" placeholder="请输入分类名字" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="是否启用" :prop="'status'">
                        <RadioGroup v-model="formData.status">
                            <Radio label="启用" ></Radio>
                            <Radio label="停用" ></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <!--<div v-if="actionType=== 'new'" style="margin-bottom: 20px ;">-->
                <!--<Divider dashed />-->
                <!--<p class="tips" style="margin-bottom: 20px ; line-height: 26px; color: #999;">-->
                <!--在下面的文本框输入多个字段并用 <b style="color: red">/</b> 分割可以实现一次性创建多个分类，比如"百达翡丽/卡西欧/浪琴",注意不能添加系统已有的分类，若当前文本框有值，则优先创建文本框的字段-->
                <!--</p>-->
                <!--<Input v-model="multipleText" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="请输入正确的字段，例如 百达翡丽/卡西欧/浪琴" />-->
                <!--</div>-->
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取 消</Button>
                <Button type="primary" @click="submitForm" :loading="submitting">{{actionType === 'new'?'新 建':'保 存'}}</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    import * as baseServices from "@/api/base"
    import utils from "@/libs/util"
    import pageMixins from "@/mixins/page"
    export default {
        name:"base-classify",
        mixins:[pageMixins],
        data:function () {
            const mainColor = "#6CF";
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名称必填!'));
                    return false;
                }
                callback();
            };
            return {
                multipleText:"",
                actionType:"new",
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                keyWords:"",
                loading:false,
                tableHeight:450,
                columns7: [
                    {
                        title: '分类名称',
                        key: 'classify',
                        col:64,
                        ellipsis:true,
                        tooltip:true,
                        render: (h, params) => {
                            return  h('span', {
                                slot: 'content',
                                style: { whiteSpace: 'normal', wordBreak: 'break-all',lineHeight:"30px",fontWeight:"bold",cursor:"pointer"},
                            },params.row.classify)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createAt',
                        col:14,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{style:{color:"#0a0a0a"}}, new Date(params.row.createAt).format("YYYY-MM-DD hh:mm:ss"))
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        col:10,
                        render: (h, params) => {
                            return h('div', [
                                h('span',{style:{color:params.row.status==="Y"?mainColor:"#ed4014"}}, params.row.status==="Y"?"启用中":"已停用")
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
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
                                        //todo edit
                                        this.actionType = "edit";
                                        this.value3 = true;
                                        this.currentclassify = params.row;
                                        this.formData["classify"] = params.row["classify"];
                                        this.formData["status"] = params.row["status"] === "Y" ? "启用" : "停用";
                                    }}
                                }, '编 辑'),
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
                                                                "span",{style:{"color":"red",fontWeight:"bold"}},` ${params.row.status === "Y"?"停用":"启用"} `
                                                            ),
                                                            h(
                                                                "strong",{style:{fontWeight:"bold"}},params.row.classify
                                                            ),
                                                            h(
                                                                "span"," ，确定吗?"
                                                            )
                                                        ]
                                                    )
                                                },
                                                onOk:async()=>{
                                                    await this.toggleStatus(params.row.classifyId,params.row.status === "Y"?"N":"Y");
                                                }
                                            });
                                        }
                                    }
                                },params.row.status === "Y"?"停 用":"启 用")
                            ]);
                        }
                    }
                ],
                data:[],
                current:1,
                size:10,
                total:1,
                value3:false,
                submitting:false,
                currentclassify:null,
                formData:{
                    classify:"",
                    status:"启用"
                },
                ruleCustom: {
                    classify:{
                        validator:validateName,trigger: 'blur'
                    }
                }
            }
        },
        methods: {
            async toggleStatus(classifyId,status){
                await baseServices.update("classify",{
                    classifyId,status
                })
            },
            submitForm(){
                this.$refs["formCustom"].validate(async(success)=>{
                    if(!success){
                        return false;
                    }
                    if(success){
                        this.submitting = true;
                        let obj = {...this.formData,status:this.formData["status"] === "启用" ? "Y" : "N"};
                        if(this.actionType !== "new"){
                            obj["classifyId"] = this.currentclassify["classifyId"];
                        }
                        try{
                            await baseServices[this.actionType==="new"?"create":"update"]("classify",obj);
                            this.submitting = false;
                            this.value3 = false;
                            this.currentclassify = null;
                            this.formData = {
                                status:"启用"
                            };
                            this.$Notice.success({
                                title:`${this.actionType==="new"?"新建":"编辑"}分类成功!`
                            });
                            this.fetchData();
                        }catch (e){
                            this.submitting = false;
                        }
                    }
                })
            },
            async changePage (page) {
                this.current = page;
                await this.fetchData();
            },
            search(value){
                this.fastSearch({classify:value});
            },
            async toggleStatus(classifyId,status){
                await baseServices.update("classify",{
                    classifyId,status
                });
                await this.fetchData();
            },
            async fetchData(filter={},reset=false){
                if(reset){
                    this.current = 1;
                    this.total = 1;
                }
                let result =  await baseServices.getPage("classify",{
                    page:this.current,
                    size:this.size,filter
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
