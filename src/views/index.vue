<style scoped lang="less">
    @import "~@/styles/constant";
    .page-index{
        position: relative;
        width: 100%;
        height: 100%;
        .time{
            font-weight: bold;
            font-size: 22px;
            color:#66ccff;
            position: absolute;
            right: 0;
            top: 0;
        }
        .welcome-container{
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 512px;
            height: 512px;
            text-align: center;
            img{
                width: 512/2px;
                height: 512/2px;
                vertical-align: middle;
                margin-bottom: 20px;
            }
            p{
                line-height: 44px;
                font-size: 15px;
                font-weight: bold;
                a{
                    color: #66ccff;
                    text-decoration:underline;
                }
            }
        }
    }
</style>
<template>
    <div class="page-index">
        <div class="time">{{time}}</div>
        <div class="welcome-container">
            <img class="welcome-img" src="../images/manager.png" alt="">
            <p>欢迎回到手表管理后台,去看看 <a @click="goWatchList" href="javascript:;">手表</a> 吧!</p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                time:"",
                ct:null
            }
        },
        methods:{
            getTime(){
                this.time =  new Date().format("YYYY-MM-DD hh:mm:ss");
            },
            goWatchList(){
                this.$router.replace({
                    path:"/watch/list"
                })
            }
        },
        beforeRouteLeave(to,from,next){
            if(this.ct){
                clearInterval(this.ct);
            }
            next();
        },
        mounted(){
            this.$nextTick(()=>{
                this.ct = setInterval(()=>{
                    this.getTime();
                },1000);
            })
        }
    }
</script>
