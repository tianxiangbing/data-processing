<!--
 * @Author: 田想兵
 * @Date: 2021-01-11 11:35:15
 * @LastEditTime: 2021-01-16 15:42:00
 * @github: https://github.com/tianxiangbing
 * @Contact: 55342775@qq.com
-->
# dataProcessing
对数组数据进行增删改操作
# Demo
```js
let DataProcessing = require('../src/index');
let arr = [];
let d = new DataProcessing(arr);
d.add({"kk":111,"dd":"AAA"});
d.add({"kk":222,"dd":"BBB"});
console.log(d)
d.update('kk',{kk:111,dd:'aaa'});
console.log(d)
d.updateBeatch('kk',[{kk:111,dd:'ccc'},{kk:222,dd:'ddd'}])
console.log(d)
d.delete('kk',222);
console.log(d)
```
# Npm
```
npm install  x-data-processing --save-dev
```