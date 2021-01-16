var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition();
        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    } else {
        DataProcessing = definition();
    }
})(function () {
    "use strict";

    var DataProcessing = function () {
        function DataProcessing() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            _classCallCheck(this, DataProcessing);

            this.source = source;
        }
        /**
         * @description: 新增一条数据
         * @param {*} obj 新增数据对象
         * @return {*} 返回所有数据
         */


        _createClass(DataProcessing, [{
            key: "add",
            value: function add(obj) {
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

        }, {
            key: "update",
            value: function update(keyName, obj) {
                var isReplace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                var value = obj[keyName];

                var _get = this.get(keyName, value),
                    index = _get.index,
                    item = _get.item;

                if (index > -1) {
                    var newItem = {};
                    if (!isReplace) {
                        _extends(newItem, item, obj);
                    } else {
                        newItem = obj;
                    }
                    this.source.splice(index, 1, newItem); //删除原值添加新值
                }
                return this.source;
            }
            /**
             * @description: 批量操作
             * @param {*} keyName
             * @param {*} listObj
             * @return {*}
             */

        }, {
            key: "updateBeatch",
            value: function updateBeatch(keyName, listOb) {
                var isReplace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                for (var i = 0, l = this.source.length; i < l; i++) {
                    this.update(keyName, listOb[i], isReplace);
                }
                return this.source;
            }
            /**
             * @description: 删除
             * @param {*} key 主键名
             * @param {*} value 主键值
             * @return {*}  source 返回所有数据源
             */

        }, {
            key: "delete",
            value: function _delete(key, value) {
                var _get2 = this.get(key, value),
                    index = _get2.index;

                if (index > -1) {
                    this.source.splice(index, 1);
                }
                return this.source;
            }
            /**
             * @description: 根据主键去查找记录
             * @param {*} key 主键名
             * @param {*} value 主键值
             * @return {*} {index,item} 返回记录所在的索引和记录，无则返回 index为-1
             */

        }, {
            key: "get",
            value: function get(key, value) {
                var index = -1;
                var item = {};
                for (var i = 0, l = this.source.length; i < l; i++) {
                    var obj = this.source[i];
                    var v = obj[key];
                    if (v === value) {
                        index = i;
                        item = obj;
                        break;
                    }
                }
                return { index: index, item: item };
            }
        }]);

        return DataProcessing;
    }();

    return DataProcessing;
});