# instanceof

用法: `obj instanceof constructor`

## instanceof 的原理

根据 obj 的原型链向上回溯，查看是否有和给定的`constructor`一致的 prototype，有的话就返回 true。

## 除了 typeof 和 instanceof 之外的其他判定方法

- 根据对象的 constructor 判断： constructor

```js
alert(c.constructor === Array); //  true
alert(d.constructor === Date); //  true
alert(e.constructor === Function); // true
// tips: constructor 在类继承时会出错
function A() {}
function B() {}
A.prototype = new B(); //A继承自B
var aObj = new A();
alert(aobj.constructor === B); // true;
alert(aobj.constructor === A); // false;

// 而instanceof方法不会出现该问题，对象直接继承和间接继承的都会报true：
alert(aobj instanceof B); // true;
alert(aobj instanceof B); // true;
```

- 通用但很繁琐的方法： prototype

```js
alert(Object.prototype.toString.call(a) === '[object String]'); // true
alert(Object.prototype.toString.call(b) === '[object Number]'); // true
alert(Object.prototype.toString.call(c) === '[object Array]'); // true;
alert(Object.prototype.toString.call(d) === '[object Date]'); // true;
alert(Object.prototype.toString.call(e) === '[object Function]'); // true;
alert(Object.prototype.toString.call(f) === '[object Function]'); // true
```
