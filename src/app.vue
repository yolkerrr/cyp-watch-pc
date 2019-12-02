<style lang="less">
    @import "styles/constant";
    @import "styles/function";
    @import "styles/clear";
    ._page{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: @page-bg-color;
        .flex(column);
        ._header{
            height: 44px;
            width: 100%;
            background-color: @mainColor;
            overflow: hidden;
        }
        ._content{
            .flex_item();
            .flex();
            background: @page-bg-color;
            ._content_siteBar{
                width: 150px;
                padding: 10px;
                height: 100%;
                background: @page-bg-color;
                overflow: hidden;
                ._siteBar_content{
                    background: #FFFFFF;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
            ._content_main{
                .flex_item();
                background: @page-bg-color;
                overflow: hidden;
                padding: 10px 0;
                ._main_app{
                    background: #FFFFFF;
                    width: 100%;
                    height:100% ;
                    padding: 20px;
                    overflow: hidden;
                }
            }
        }
    }
    ._page_login{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-image: url("https://cyp-watch.oss-cn-shenzhen.aliyuncs.com/watch-asset/234608-15739191682c63.jpg");
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center center;
        position: relative;
        ._login_form_mask{
            position: absolute;
            margin: auto;
            width: 400px;
            height: 300px;
            padding: 20px 0;
            background: #FFFFFF;
            opacity: 0.4;
            left: 60%;
            top: 0;
            right: 20px;
            bottom: 0;
            z-index: 100;
            border-radius: 12px;
        }
        ._login_form_content{
            position: absolute;
            margin: auto;
            width: 360px;
            height: 260px;
            padding: 20px 0;
            background: #FFFFFF;
            opacity: 1;
            left: 60%;
            top: 0;
            right: 20px;
            bottom: 0;
            z-index: 101;
            border-radius: 6px;
            box-shadow:15px 0 15px -15px #000,
            -15px 0 15px -15px #000;
            .content_title{
                width: 100%;
                padding: 10px 0;
                text-align: center;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
</style>
<template>
    <div>
        <div  v-if="!isLogin" class="_page">
            <div class="_header"></div>
            <div class="_content">
                <div class="_content_siteBar">
                    <div class="_siteBar_content">
                        <SiteBar :route="to"/>
                    </div>
                </div>
                <div class="_content_main">
                    <div class="_main_app">
                        <router-view></router-view>
                    </div>
                </div>
            </div>

        </div>
        <div class="_page_login"  v-else>
            <div class="_login_form_mask"/>
            <div class="_login_form_content">
                <div class="content_title">
                    超级管理员登录
                </div>
                <div style="padding: 0 40px">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <FormItem label="账号名称" prop="userName" >
                            <Input type="password" v-model="formCustom.userName"/>
                        </FormItem>
                        <FormItem label="账号密码" prop="password" >
                            <Input type="password" v-model="formCustom.password"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formCustom')" :loading="loading">登 录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import * as userService from "./api/user"
    import config from "./libs/config"
    import SiteBar from "./components/SiteBar"
    Vue.component('SiteBar',SiteBar);
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('账号不能为空'));
                } else {
                    if (this.formCustom.password !== '') {
                        this.$refs.formCustom.validateField('password');
                    }
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                }else {
                    callback();
                }
            };
            return {
                loading:false,
                isLogin:false,
                to:null,
                formCustom: {
                    userName: '',
                    password: '',
                },
                ruleCustom: {
                    userName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                }
            }
        },
        watch:{
            $route(to,from){
                if(to&&to.path){
                    this.isLogin = to.path === "/login";
                    this.to = to;
                }
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            handleSubmit(name){
                this.$refs[name].validate(async(valid) => {
                    if(valid){
                        let {formCustom} = this;
                        if(this.loading){
                            return
                        }
                        this.loading = true;
                        try{
                            let {token} = await userService.login(formCustom);
                            window.localStorage.setItem(`${config.projectKey}-token`,token);
                            this.$Notice.success({
                                title: '登录成功!'
                            });
                            this.$router.replace({
                                path:"/index"
                            });
                            this.loading = false;
                        }catch (e){
                            this.loading = false;
                            console.log(e);
                        }
                    }
                })
            }
        }
    }
</script>
