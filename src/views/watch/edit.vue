<style lang="less" scoped>
    @import "~@/styles/function";
    @import "~@/styles/constant";
    .page-watch-create{
        width:100%;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
        .create-form-panel{
            padding: 0 20px;
            .panel-title{
                color: @mainColor;
                font-size: 15px;
                padding: 0  0 15px 0;
            }
        }
    }
    ::-webkit-scrollbar {//滚动条的宽度
        width:0;
    }
</style>
<template>
    <div class="page-watch-create _p">
        <div class="create-form-panel">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <div class="panel-title">手表基本信息</div>
                <div class="panel-content">
                    <Row v-for="row,rowIndex in baseFormContext" :key="rowIndex">
                        <Col span="12" v-for="item,itemIndex in row" :key="itemIndex">
                        <FormItem :label="item.label" :prop="item.prop" :required="!!item.require">
                            <Input v-model="formCustom[item.prop]" v-if="item.type === 'input'" :placeholder="item.placeholder||'请填写'+item.label"/>
                            <RadioGroup v-model="formCustom[item.prop]" v-else-if="item.type === 'radio'">
                                <Radio v-for="radio,raIndex in item['radioModel']" :key="raIndex" :label="radio['label']" :value="radio['value']"/>
                            </RadioGroup>
                            <SelectMore :value="formCustom[item.prop]" v-else-if="item.type === 'select'" :primaryKey="item.primaryKey" @select-change="selectChange"/>
                            <div v-else>
                                暂时没有此类型
                            </div>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="panel-title">手表价格信息</div>
                <div class="panel-content">
                    <Row v-for="row,rowIndex in priceFormContext" :key="rowIndex">
                        <Col span="12" v-for="item,itemIndex in row" :key="itemIndex">
                        <FormItem :label="item.label" :prop="item.prop" :required="!!item.require">
                            <InputNumber v-model="formCustom[item.prop]" v-if="item.type === 'inputNumber'" style="width: 100%" :min="1"/>
                            <div v-else>
                                暂时没有此类型
                            </div>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="panel-title">手表轮播图信息</div>
                <div class="panel-content">
                    <Row>
                        <Col span="24" >
                        <Uploader
                                v-model="formCustom['slideUrls']"
                                action="/server/upload"
                                :beforeUpload="beforeUpload"
                                :primaryKey="'slideUrls'"
                        />
                        </Col>
                    </Row>
                </div>
                <div class="panel-title">手表详情图信息</div>
                <div class="panel-content" style="margin-bottom: 60px">
                    <Row>
                        <Col span="24">
                        <Uploader
                                v-model="formCustom['detailUrls']"
                                action="/server/upload"
                                :beforeUpload="beforeUpload"
                                :primaryKey="'detailUrls'"
                        />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <div class="_f">
            <Button type="primary" style="width: 150px" @click="handleSubmit" :loading="loading">保 存</Button>
        </div>
    </div>
</template>
<script>
    import * as watchServices from "@/api/watch.js"
    import utils from "@/libs/util.js"
    import pageMixins from "@/mixins/page"
    export default {
        mixins:[pageMixins],
        data:function () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手表名称必填!'));
                    return false;
                }
                callback();
            };
            const validateBrand =  (rule, value, callback) => {
                if (!value || value.length === 0) {
                    callback(new Error('品牌必选!'));
                    return false;
                }
                callback();
            };
            return {
                loading:false,
                baseFormContext:[
                    [
                        {label:"手表名称",prop:"watchName",require:true,type:"input"},
                        {label:"手表型号",prop:"model",type:"input"},
                    ],
                    [
                        {label:"手表品牌",prop:"brandId",require:true,type:"select",primaryKey:"brand"},
                        {label:"手表分类",prop:"classifyId",type:"select",primaryKey:"classify"},
                    ],
                    [
                        {label:"手表规格",prop:"specId",type:"select",primaryKey:"spec"},
                        {label:"是否上架",prop:"status",type:"radio",radioModel:[
                            {label:"上架",value:"Y"},
                            {label:"下架",value:"N"},
                        ],defaultValue:"Y"},
                    ]
                ],
                priceFormContext:[
                    [
                        {label:"零售价",prop:"price",require:true,type:"inputNumber"},
                        {label:"市场价",prop:"marketPrice",type:"inputNumber"},
                    ],
                ],
                formCustom: {
                    watchName: "",
                    model: "",
                    brand:"",
                    brandId:"",
                    classify:"",
                    classifyId:"",
                    spec:"",
                    specId:"",
                    status:"上架",
                    price:1,
                    marketPrice:1,
                    slideUrls:[],
                    detailUrls:[],
                },
                formData:{},
                ruleCustom: {
                    watchName:{
                        validator:validateName, trigger: 'blur'
                    },
                    brandId:{
                        validator:validateBrand, trigger: 'blur'
                    },
                    price:{
                        required:true,message:"零售价必填"
                    }
                }
            }
        },
        methods: {
            async fetchData(){
                try{
                    let result = await watchServices.getDetail({
                        watchId:this.$route.query.id
                    });
                    Object.keys(this.formCustom).map((key)=>{
                        if(key === "status")result["data"][key]==="Y"?result["data"][key] = "上架":result["data"][key] = "下架";
                        this.formCustom[key] = result["data"][key]
                    });
                }catch (e){

                }
            },
            selectChange(data){
                this.formCustom = {...this.formCustom,...data}
            },
            handleSubmit(){
                if(this.loading)return;
                this.$refs["formCustom"].validate(async(success)=>{
                    if(!success){
                        return false;
                    }
                    this.loading = true;
                    try{
                        this.formCustom["status"] = this.formCustom["status"] === "上架"?"Y":"N";
                        await watchServices.update({...this.formCustom,watchId:this.$route.query.id});
                        this.loading = false;
                        this.$Notice.success({
                            title: '编辑手表成功!'
                        });
                        this.$router.replace({
                            path:"/watch/list",
                            refresh:1
                        });
                    }catch (e){
                        this.loading = false;
                    }
                })
            },
            beforeUpload(file){
                if(file.type.indexOf("image/")<0){
                    this.$Notice.error({
                        title: '上传文件错误',
                        desc: '',
                        render: h => {
                            return h('span',"当前只能上传图片，请重新上传");
                        }
                    });
                }
                return file.type.indexOf("image/") > -1;
            }
        },
    }
</script>
