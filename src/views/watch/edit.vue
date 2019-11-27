<style scoped lang="less">
    .page-watch-edit{

    }
</style>
<template>
    <div class="page-watch-edit">

    </div>
</template>
<script>
    import * as watchServices from "../../api/watch"
    import utils from "../../libs/util"
    export default {
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of View UI.'
                });
            },
            demo(){
                console.log(utils.$GET("a"));
            }
        },
        async created(){
            // let data  =await watchServices.getPage();
            // console.log(data);
            // this.demo();
        }
    }
</script>
