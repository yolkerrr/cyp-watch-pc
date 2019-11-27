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
    <div class="page-watch-create">
        <div class="create-form-panel">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <div class="panel-title">手表基本信息</div>
                <div class="panel-content">
                    <Row v-for="row,rowIndex in baseFormContext" :key="rowIndex">
                        <Col span="12" v-for="item,itemIndex in row" :key="itemIndex">
                            <FormItem :label="item.label" :prop="item.prop" :required="!!item.require">
                                <Input v-model="formCustom[item.prop]" v-if="item.type === 'input'"/>
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
                            <InputNumber v-model="formCustom[item.prop]" v-if="item.type === 'inputNumber'" style="width: 100%" min="1"/>
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
                        <Col span="12">
                            <Upload
                                    multiple
                                    type="drag"
                                    action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击上传轮播图或者将图片拖拽到这上传</p>
                                </div>
                            </Upload>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </div>
                <div class="panel-title">手表详情图信息</div>
                <div class="panel-content">
                    <Row>
                        <Col span="12">
                            <Upload
                                    multiple
                                    type="drag"
                                    action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击上传详情图或者将图片拖拽到这上传</p>
                                </div>
                            </Upload>
                        </Col>
                    </Row>
                </div>
            </Form>
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
            /*
            {
                "region":"oss-cn-shenzhen.aliyuncs.com",
                "bucket":"cyp-watch",
                "accessKeyId":"LTAI4FikuetJzkFGHqh3M3iE",
                "accessKeySecret":"MWOWKtOSSP8y10shO2BEQnfuALDyCl"
            }
            * */
            const validateName = function () {

            };
            const validatePassword = function () {

            };
          return {
              baseFormContext:[
                  [
                      {label:"手表名称",prop:"name",require:true,type:"input"},
                      {label:"手表型号",prop:"model",type:"input"},
                  ],
                  [
                      {label:"手表品牌",prop:"brand",require:true,type:"select",selectModel:[]},
                      {label:"手表分类",prop:"classify",type:"select",selectModel:[]},
                  ],
                  [
                      {label:"手表规格",prop:"spec",type:"select",selectModel:[],multiple:true},
                      {label:"是否上架",prop:"status",type:"radio",radioModel:[],defaultValue:"Y"},
                  ]
              ],
              priceFormContext:[
                  [
                      {label:"零售价",prop:"price",require:true,type:"inputNumber"},
                      {label:"市场价",prop:"marketPrice",type:"inputNumber"},
                  ],
              ],
              formCustom: {
                  name: '',
                  password: '',
              },
              ruleCustom: {
                  name: [
                      { validator: validateName, trigger: 'blur' }
                  ],
                  password: [
                      { validator: validatePassword, trigger: 'blur' }
                  ]
              }
          }
        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of View UI.'
                });
            },
            demo(){
                console.log(utils.$GET("a"));
            },
            fetchData(){
                console.log(this)
            }
        },
    }
</script>
