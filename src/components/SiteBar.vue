<template>
    <Row style="width: 130px">
        <Col span="24">
        <Menu :theme="theme2" width="auto" :active-name="active" :open-names="open">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="md-build" />
                    手表管理
                </template>
                <MenuItem name="index">
                    手表列表
                </MenuItem>
                <MenuItem name="watch-create">
                    新建手表
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
                open:[
                    "1"
                ]
            }
        },
        props:{
          "active":{
              type:String,
              default:""
          }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>
