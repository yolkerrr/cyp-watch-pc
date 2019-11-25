<template>
    <div>
        <div class="page-error">
            <div class="wrap">
                <p>404</p>
                <table>
                    <tr>
                        <td rowspan="5" style=""><img style="background-color: transparent" src="https://ws1.sinaimg.cn/large/a15b4afegy1fhsfdznep4j2020020web.jpg" alt="错误页面"></td>
                        <td class="header">很抱歉！当前页面找不到了</td>
                    </tr>
                    <tr><td>原因一：你敲错了网址</td></tr>
                    <tr><td>原因二：这个页面已经被网站管理员(也就是我...)删了</td></tr>
                    <tr><td class="check-info">或者，你也可以<a href="/index">先去首页逛逛</a></td></tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
            }
        },
        methods:{
        },
        mounted:function () {
        },
        destroyed() {
        }
    }
</script>
<style >
    body{font-size: 14px;font-family: 'helvetica neue',tahoma,arial,'hiragino sans gb','microsoft yahei','Simsun',sans-serif; background-color:#fff; color:#808080;}
    .wrap{margin:200px auto;width:510px;}
    .wrap p{
        text-align: center;
        font-weight: bold;
        font-size: 200px;
        color: lightseagreen;
        text-shadow: 0.1em 0.1em #333;
        font-style:oblique
    }
    td{text-align:left; padding:2px 10px;}
    td.header{font-size:22px; padding-bottom:10px; color:#000;}
    td.check-info{padding-top:20px;}
    a{color:#328ce5; text-decoration:none;}
    a:hover{text-decoration:underline;}
</style>