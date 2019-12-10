<template>
    <div class="page-system _p">
        <div class="create-form-panel">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
                <div class="panel-title">系统配置信息</div>
                <div class="panel-content">
                    <Row>
                        <Col span="12">
                        <FormItem :label="'微信号'" :prop="'wxAccount'" >
                            <Input v-model="formCustom['wxAccount']"  :placeholder="'请填写你的微信号'"/>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormItem :label="'微信二维码'" :prop="'wxQrCode'" >
                            <Uploader
                                    v-model="formCustom['wxQrCode']"
                                    action="/server/upload"
                                    :beforeUpload="beforeUpload"
                                    :primaryKey="'slideUrls'"
                            />
                        </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <div class="_f" style="bottom: 100px">
            <Button type="primary" style="width: 150px" @click="handleSubmit" :loading="loading">保 存</Button>
        </div>
    </div>
</template>
<script>
    import * as baseServices from "@/api/base.js"
    import pageMixins from "@/mixins/page"
    export default {
        mixins:[pageMixins],
        data(){
            return{
                formCustom: {
                    wxAccount: "",
                    wxQrCode: [],
                },
                ruleCustom:{},
                loading:false
            }
        },
        methods:{
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
            },
            async fetchData(){
                let {data} = await baseServices.getSysInfo();
                this.formCustom = data;
            },
            handleSubmit(){
                if(this.loading)return;
                this.$refs["formCustom"].validate(async(success)=>{
                    if(!success){
                        return false;
                    }
                    this.loading = true;
                    try{
                        await baseServices.updateSysInfo({...this.formCustom});
                        this.loading = false;
                        this.$Notice.success({
                            title: '保存信息成功!'
                        });
                        this.fetchData();
                    }catch (e){
                        this.loading = false;
                    }
                })
            }
        },
        created(){

        }
    }
</script>
<style lang="less">
    .page-system{
        width:100%;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
        .create-form-panel{
            padding: 0 20px;
            .panel-title{
                color: #66CCFF;
                font-size: 15px;
                padding: 0  0 15px 0;
            }
        }
    }
    ::-webkit-scrollbar {//滚动条的宽度
        width:0;
    }
</style>
