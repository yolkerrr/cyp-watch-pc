import pathToRegexp from "path-to-regexp";
import axios from "axios";
import qs from "qs";
import config from './config'
import utils from './util'
import {Message,Modal,Spin} from "view-design"
const fetch = (options) => {
    let {
        method = 'get',
        data = {},
        url,
    } = options;
    const cloneData = data instanceof Array?data.slice(0):{...data};
    try {
        let domin = '';
        if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
            domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
            url = url.slice(domin.length)
        }
        const match = pathToRegexp.parse(url);
        url = pathToRegexp.compile(url)(data);
        for (let item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name]
            }
        }
        url = domin + url
    } catch (e) {
        // Toast(e.message)
    }
    let token = window.localStorage.getItem(`${config.projectKey}-token`)||'';
    let headers = {
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Content-Type':'text/plain',
        'token':token,
        "operaSource":"PC"
    };
    //请求配置
    const requestConfig = {};
    const timeout = 60;
    ["get","post"].map((key)=>{
        requestConfig[key] = {
            headers,
            timeout:timeout*1000,
            withCredentials:true,
        };
        if("get" === key){
            requestConfig[key]["params"] = {
                ...cloneData,
                t:(new Date().getTime())
            }
        }
        if("post" === key && options["transformRequest"]){
            //transformRequest: [function (data, headers) {
            // Do whatever you want to transform the data
            //return data;
            //}],
            requestConfig[key]["transformRequest"] = [
                options["transformRequest"]
            ]
        }
        return true;
    });
    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url,requestConfig["get"]);
        case 'post':
            return axios.post(url, cloneData,requestConfig["post"]);
        default:
            return axios(options)
    }
};
export default function request (options) {
    let cacheKey;
    if(options.loading){
        Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', 'Loading')
                ])
            }
        });
        delete options['loading']
    }
    let _isShowError = true;
    let {isCache,data={}} = options;
    if(data['_isShowError']!==undefined&&!data['_isShowError']){
        _isShowError = false;
        delete data['_isShowError'];
    }
    delete options['isCache'];
    if(isCache){
        cacheKey = [encodeURIComponent(options.url),options.method,qs.stringify(options.data)].join('');
        let cacheData;
        const cacheString = window.localStorage.getItem(cacheKey);
        if(cacheString){
            try {
                cacheData = JSON.parse(cacheString);
            }catch(e) {
                window.localStorage.removeItem(cacheKey);
            }
        }
        if(cacheData){
            return new Promise((resolve,reject)=>{
                resolve(cacheData.response);
            });
        }
    }else if(isCache===false){
        cacheKey = [encodeURIComponent(options.url),options.method,qs.stringify(options.data)].join('');
        window.localStorage.removeItem(cacheKey);
        isCache = true;
    }
    return fetch(options).then((response) => {
        Spin.hide();
        let data = response.data;
        if((data.code !== 200) || (typeof data !== 'object')){
            if(_isShowError) Modal.error({
                title: "请求出错",
                content: data.message?typeof data.message === "object"?JSON.stringify(data.message):data.message:JSON.stringify(response)
            });
            // if([44000,44001,44002,44003,44004].indexOf(data.code)>-1 && !options["notAuth"]){
            //     window.location.href = `./index.html?token=${$GET()['token']}#/handle`;
            // }
        }else if(isCache){
            window.localStorage.setItem(cacheKey,JSON.stringify({response:data,cacheTime:new Date().getTime()}))
        }
        return data
    }).catch((error) => {
        Modal.error({
            title: "服务器返回异常",
            content: error.toString()||'网络异常'
        });
        Spin.hide();
        return {
            hasError:true,message:error.toString()
        }
    })
}
