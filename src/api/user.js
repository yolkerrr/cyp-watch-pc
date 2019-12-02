import request from '../libs/fetch'
import config from '../libs/config'
//获取商品列表
export async function login (data) {
    return request({
        url: `${config.apiPrefix}/user/login`,
        method: 'post',
        data
    })
}
