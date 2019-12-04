<template>
    <div :id="prefix+index" :style="cstyle">
        <img :src="src" style="width: 100%;height: 100%" @load="load"/>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                prefix:"_global_common_image_"
            }
        },
        props:{
            src:{
                type:String,
                default:()=>{
                    return ""
                }
            },
            index:{
                type:Number,
                default:()=>{
                    return 0
                }
            },
            cstyle:{
                type:String,
                default:()=>{
                    return ""
                }
            }
        },
        methods:{
            CheckProperty(obj) {
                const ImgObj=new Image();
                ImgObj.src = obj.src;

                const ImgWidth=ImgObj.width;
                const ImgHeight=ImgObj.height;

                this.cut(obj , ImgWidth , ImgHeight);
                this.setCenter(obj);
            },
            setCenter(obj){
                if(navigator.userAgent.indexOf("MSIE") <= 0){
                    obj.parentNode.style.display = 'table-cell';
                } else {
                    obj.parentNode.style.display = 'block';
                    obj.parentNode.style.fontSize = obj.parentNode.height*0.873;
                    obj.parentNode.style.fontFamily = 'Arial';
                }
                obj.parentNode.style.verticalAlign = 'middle';
                obj.parentNode.style.textAlign   = 'center';
            },
            cut(obj , width , height) {
                if (obj.width > obj.height) {
                    obj.width = width * obj.height / height;
                } else {
                    obj.height = height * obj.width / width;
                }
            },
            load(e){
                this.CheckProperty(e["path"][0]);
            }
        },
        mounted(){

        }
    }
</script>
