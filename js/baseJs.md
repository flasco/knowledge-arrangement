# JavaScript 基础
## js基本类型
js的基本类型: null, undefined, number, boolean, string.
引用类型: object, array, function.

## js强制类型转换
强制类型转换的发生场景：
* 字符串拼接
* `==` 运算符v
* if语句
* 逻辑运算符<与或非>

## js 类型判断
js中，typeof能得到哪些类型呢？  
undefined, object, string, number, boolean, function (没有null和array)

### null 与 undefined 的区别
* null是一个表示”无”的对象，转为数值时为0；
* undefined是一个表示”无”的原始值，转为数值时为NaN。


instanceof的原理是什么？  
instanceof 的用法是 `obj instanceof constructor`，他会根据obj的原型链向上回溯，查看是否有和给定的`constructor`一致的prototype，有的话就返回true。

除了typeof和instanceof之外还有别的判定类型的方法吗？  
* 根据对象的constructor判断： constructor

```js
alert(c.constructor === Array) ----------> true
alert(d.constructor === Date) -----------> true
alert(e.constructor === Function) -------> true

// tips: constructor 在类继承时会出错
   function A(){};
   function B(){};
   A.prototype = new B(); //A继承自B
   var aObj = new A();
   alert(aobj.constructor === B) -----------> true;
   alert(aobj.constructor === A) -----------> false;

// 而instanceof方法不会出现该问题，对象直接继承和间接继承的都会报true：
   alert(aobj instanceof B) ----------------> true;
   alert(aobj instanceof B) ----------------> true;

```
* 通用但很繁琐的方法： prototype 
```js
alert(Object.prototype.toString.call(a) === '[object String]') // -------> true
alert(Object.prototype.toString.call(b) === '[object Number]') // -------> true
alert(Object.prototype.toString.call(c) === '[object Array]') // -------> true;
alert(Object.prototype.toString.call(d) === '[object Date]')  // -------> true;
alert(Object.prototype.toString.call(e) === '[object Function]') // -------> true;
alert(Object.prototype.toString.call(f) === '[object Function]') // -------> true
```
## == 与 === 
什么时候用 `==` 什么时候用 `===` 呢？
判断变量是否有值得时候用 `==`， 其他情况全部用 `===`
```js
if(a.b == null) {
  // 等价于 a.b === null || a.b === undefined
}
```

js中有哪些内置函数 — 数据封装类对象？
Object，Array，Boolean，Number，String，Function，Date，RegExp，Error

基本类型的赋值是真正的赋值，两个变量之间不会相互干预
引用类型的赋值只是指针地址的赋值，指向同一地址，共享同一个对象

在js中，JSON是一个js对象，也是一种数据格式

手撕深对象拷贝
```js
function deepCopy(obj) {
  if(!obj && typeof obj !== 'object'){
    throw new Error('type err');
  }
  let newObj = Array.isArray(obj)? [] : {};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      if(obj[key] && typeof obj[key] === 'object'){
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

```


在js中，JSON是一个js对象，也是一种轻量级的数据交换格式

