<template>
    <div>
        <Upload
                multiple
                type="drag"
                :action="action"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-progress="uploading"
                :show-upload-list="false"
                :headers="{'Authorization':'token'}"
        >
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>{{tips}}</p>
            </div>
        </Upload>
        <Row>
            <div style="padding: 0 0 20px 0" :class="className">
                <viewer :images="value">
                    <li style="display: inline-block;position: relative;margin-right: 20px;margin-top: 20px;"  v-for="img,index in value" :key="index" >
                        <Icon @click="deleteIt(index)" type="ios-close-circle" size="30" style="color: #0a0a0a;position: absolute;top:-15px;right:-15px;cursor:pointer" />
                        <img style="width:168px;height: 168px;vertical-align: middle;border: 1px solid #ececec;object-fit: cover" :src="img" alt="" @load="curPic(img,index)">
                    </li>
                </viewer>
            </div>
        </Row>
    </div>
</template>
<script>
    import Vue from "vue"
    import Viewer from 'v-viewer'
    import 'viewerjs/dist/viewer.css'
    Vue.use(Viewer);
    export default{
        data(){
            return{

            }
        },
        props:{
            value:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            primaryKey:{
                type:String,
                default:""
            },
            tips:{
                type:String,
                default:"点击上传图片或者将图片拖拽到这上传"
            },
            multiple:{
                type:Boolean,
                default:true
            },
            beforeUpload:{
                type:Function,
                default:()=>{return true}
            },
            action:{
                type:String
            },
            accept:{
                type:String,
                default:"image/*"
            },
            maxSize:{
                type:Number,
                default:2*1024
            }
        },
        computed:{
            className(){
                return this.primaryKey + "_image_gallery_holder"
            }
        },
        methods:{
            deleteIt(index){
                this.value.splice(index,1);
            },
            curPic(src,index){
//                let image = new Image();
//                const vm = this;
//                image.onload = function (img) {
//                    let current = document.querySelectorAll(`.${vm.primaryKey}_image_gallery_holder li`)[index];
//                    let imgHolder = current.querySelector("img");
//                    const realWidth = img.path[0].width;
//                    const realHeight = img.path[0].height;
//                    if (realWidth > realHeight) {
//                        imgHolder.style.width = `${realWidth * (168 / realHeight)}px`;
//                    } else {
//                        imgHolder.style.height = `${realHeight * (168 / realWidth)}px`;
//                    }
//                };
//                image.src = src;
            },
            uploading(){
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', "图片上传中")
                        ])
                    }
                });
            },
            uploadSuccess(response, file, fileListfileList){
                this.$Spin.hide();
                if(response&&response.code === 200){
                    this.$Notice.success({
                        title: '上传成功!'
                    });
                    this.value.push(file.response.url);
                }else if(response.url){
                    this.$Notice.success({
                        title: '上传成功!'
                    });
                    this.value.push(file.response.url);
                }else{
                    this.$Notice.error({
                        title: '上传失败!'+response.message
                    })
                }
            },
            uploadError(error, file, fileList){
                this.$Spin.hide();
                this.$Notice.error({
                    title: '上传失败!'+error
                })
            }
        },
        created(){

        }
    }
</script>