<template>
    <Row style="width: 130px">
        <Col span="24">
        <Menu :theme="theme2" width="auto" :active-name="active" :open-names="open" ref="_menu">
            <Submenu  v-for="item,pIndex in menu" :name="item.name" :key="pIndex">
                <template slot="title">
                    <Icon :type="item.icon" />
                    {{item.title}}
                </template>
                <MenuItem  v-for="child,cIndex in item.children" :name="child.name" :key="cIndex" :to = "child.to" :replace="!child.notReplace">
                    {{child.title}}
                </MenuItem>
            </Submenu>
        </Menu>
        </Col>
    </Row>
</template>
<script>
    export default {
        data(){
            return{
                theme2: 'light',
                active:"",
                open:[],
                menu:[
                    {
                        icon:"ios-clock",
                        name:"watch",
                        title:"手表管理",
                        children:[
                            {
                                name:"list",title:"手表列表",to:"/watch/list"
                            },
                            {
                                name:"create",title:"创建手表",to:"/watch/create"
                            }
                        ]
                    },
                    {
                        icon:"md-build",
                        name:"base",
                        title:"基础设置",
                        children:[
                            {
                                name:"brand",title:"品牌管理",to:"/base/brand"
                            },
                            {
                                name:"classify",title:"分类管理",to:"/base/classify"
                            },
                            {
                                name:"spec",title:"规格管理",to:"/base/spec"
                            },
                            {
                                name:"comment",title:"留言管理",to:"/base/comment"
                            },
                            {
                                name:"system",title:"系统管理",to:"/base/system"
                            }
                        ]
                    }
                ]
            }
        },
        props:{
            "route":{
                type:Object,
                default:()=>{
                    return {}
                }
            },
        },
        watch:{
            "route":{
                handler(newVal){
                    let context = newVal.path.split("/");
                    let length = context.length;
                    if(length === 3){
                        this.open = [context[1]];
                        this.active = context[2];
                    }else{
                        this.open = [];
                        this.active = "";
                    }
                    this.$nextTick(()=>{
                        this.$refs["_menu"].updateOpened();
                        this.$refs["_menu"].updateActiveName();
                    })
                } ,
                deep:1
            }
        }
    }
</script>
