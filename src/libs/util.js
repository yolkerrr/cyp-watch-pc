let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'View UI project';
    window.document.title = title;
};

util.$GET = () =>{
    function parseParam(string){
        let result={};
        let search=string;
        if(search){
            let params=search.substr(1).split("&");
            for(let i=0;i<params.length;i++){
                let data=params[i].split("=");
                if(data[0]){
                    result[data[0]]=decodeURI(data[1]);
                }
            }
            return result;
        }else{
            return result;
        }
    }
    return parseParam(window.location.search);
};



export default util;
