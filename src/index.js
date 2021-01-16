/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing/data-processing
 * User: 田想兵
 * Date: 2021-01-11 
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 * desc: 针对本地缓存数据进行增删改查的操作
 * 请使用https://github.com/tianxiangbing/data-processing 上的代码
 */
(function (definition) {
    // 
    if (typeof exports === "object") {
        module.exports = definition();
        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    } else {
        DataProcessing = definition();
    }
})(function () {
    "use strict";
    class DataProcessing {
        constructor(source=[]) {
            this.source = source;
        }
        /**
         * @description: 新增一条数据
         * @param {*} obj 新增数据对象
         * @return {*} 返回所有数据
         */
        add(obj){
            this.source.push(obj);
            return this.source;
        }
        /**
         * @description: 更新
         * @param {*} keyName 主键名称
         * @param {*} obj 包含主键的对象
         * @param {*} isReplace 是否替换该条记录，默认合并不替换
         * @return {*}  source 返回所有数据源
         */
        update(keyName,obj,isReplace = false){
            let  value = obj[keyName];
            let {index,item} = this.get(keyName,value);
            if(index>-1){
                let newItem = {};
                if(!isReplace){
                    Object.assign(newItem,item,obj)
                }else{
                    newItem = obj;
                }
                this.source.splice(index,1,newItem);//删除原值添加新值
            }
            return this.source;
        }
        /**
         * @description: 批量操作
         * @param {*} keyName
         * @param {*} listObj
         * @return {*}
         */
        updateBeatch(keyName,listOb,isReplace = false){  
            for(let i = 0 ,l = this.source.length;i <l ;i ++){
                this.update(keyName,listOb[i],isReplace);
            }
            return this.source;
        }
        /**
         * @description: 删除
         * @param {*} key 主键名
         * @param {*} value 主键值
         * @return {*}  source 返回所有数据源
         */
        delete(key,value){
            let {index} = this.get(key,value);
            if(index>-1){
                this.source.splice(index,1);
            }
            return this.source;
        }
        /**
         * @description: 根据主键去查找记录
         * @param {*} key 主键名
         * @param {*} value 主键值
         * @return {*} {index,item} 返回记录所在的索引和记录，无则返回 index为-1
         */
        get(key,value){
            let index = -1;
            let item = {};
            for(let i = 0 ,l = this.source.length;i <l ;i ++){
                let obj = this.source[i];
                let v =  obj[key];
                if(v ===value ){
                    index = i;
                    item = obj
                    break;
                }
            }
            return {index,item};
        }
    }
    return DataProcessing;
});