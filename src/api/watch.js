import request from '../libs/fetch'
import config from '../libs/config'
//获取商品列表
export async function getPage () {
    return request({
        url: `${config.apiPrefix}/watch`,
        method: 'get'
    })
}