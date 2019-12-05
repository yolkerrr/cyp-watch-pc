<template>
    <div class="common-select-more" style="display: flex">
        <div style="flex: 1;">
            <Select v-model = "selectValue" clearable @on-change="change">
                <Scroll :on-reach-bottom="handleReachBottom" :loading-text="loadingText" :distance-to-edge="[-12,-12]">
                    <Option v-for="item in data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Scroll>
            </Select>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import * as baseService from "@/api/base"
    export default{
        data(){
            return{
                selectValue:"",
                loadingText:"加载中...",
                data:[],
                page:1,
                size:10,
                total:1,
                hasNext:false,
                getPage:baseService.getPage,
                column:[]
            }
        },
        props:{
            primaryKey:{
                type:String,
                value:""
            },
            value:{
                type:String,
                default:""
            },
            filter:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        watch:{
          value(newVal,oldVal){
              if(newVal !== this.selectValue){
                  this.selectValue = newVal;
              }
          }
        },
        methods:{
            change(e){
                let data = this.data.filter((i)=>{
                        return e === i["value"]
                    })||null;
                this.$emit("select-change",data.length>0?{
                    [`${this.primaryKey}`]:data[0]["label"],
                    [`${this.primaryKey}Id`]:e,
                }:{
                    [`${this.primaryKey}`]:"",
                    [`${this.primaryKey}Id`]:"",
                });
            },
            handleReachBottom(){
                if(this.hasNext){
                    this.page = this.page + 1;
                    return new Promise(async(resolve)=>{
                        try{
                            await this.fetchData();
                            resolve();
                        }catch (e){
                            resolve();
                        }
                    })
                }else{
                    this.loadingText = "没有更多数据了";
                    return new Promise((resolve)=>{
                        resolve();
                    })
                }
            },
            openPage(){

            },
            async fetchData(){
                if(this.getPage && typeof this.getPage === "function"){
                    let result = await this.getPage(this.primaryKey,{
                        page:this.page,
                        size:this.size,
                        filter:this.filter
                    });
                    this.total = result.total;
                    this.page = result.current;
                    this.hasNext = result.hasNext;
                    this.data =  this.data .concat(result.data.map((item)=>{
                        return{
                            label:item[this.primaryKey],
                            value:item[`${this.primaryKey}Id`],
                        }
                    }));
                }
            }
        },
        async created(){
            try{
                let result =  await this.fetchData();
                if(typeof result === "object"){
                    this.total = result.total;
                    this.page = result.current;
                    this.data = result.data.map((item)=>{
                        return{
                            label:item.brand,
                            value:item.brandId,
                        }
                    });
                }
            }catch (e){

            }
        }
    }
</script>