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
                        icon:"md-build",
                        name:"watch",
                        title:"手表管理",
                        children:[
                            {
                                name:"list",title:"手表列表",to:"/watch/list"
                            },
                            {
                                name:"create",title:"创建手表",to:"/watch/create"
                            },
                            {
                                name:"edit",title:"编辑手表",to:"/watch/edit"
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
