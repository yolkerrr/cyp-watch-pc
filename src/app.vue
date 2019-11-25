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
            background-color: #03b8cc;
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
                    height: 100%;
                    overflow: hidden;
                }
            }
        }
    }
</style>
<template>
    <div class="_page">
        <div class="_header"></div>
        <div class="_content">
            <div class="_content_siteBar">
                <div class="_siteBar_content">
                    <SiteBar :active="activeRoute"/>
                </div>
            </div>
            <div class="_content_main">
                <div class="_main_app">
                    <router-view></router-view>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Vue from "vue"
    import SiteBar from "./components/SiteBar"
    Vue.component('SiteBar',SiteBar);
    export default {
        data () {
            return {
                activeRoute:""
            }
        },
        watch:{
            $route(to,from){
                if(to&&to.path){
                    this.activeRoute = to.path.replace(/\//,"");
                }
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
