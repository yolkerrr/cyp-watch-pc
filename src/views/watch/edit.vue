<style scoped lang="less">
    .page-index{

    }
</style>
<template>
    <div class="page-index">

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
