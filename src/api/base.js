import request from '../libs/fetch'
import config from '../libs/config'
//获取品牌,规格，分类列表
export async function getPage (base,data) {
    return request({
        url: `${config.apiPrefix}/${base}/list`,
        method: 'post',
        data
    })
}
//创建品牌,规格，分类
export async function create(base,data) {
    return request({
        url:`${config.apiPrefix}/${base}/create`,
        method:"post",
        data
    })
}

//更新品牌,规格，分类
export async function update(base,data) {
    return request({
        url:`${config.apiPrefix}/${base}/update`,
        method:"post",
        data
    })
}