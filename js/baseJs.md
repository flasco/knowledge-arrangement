# JavaScript 基础

## js 基本类型

js 的基本类型: null, undefined, number, boolean, string, Symbol.
引用类型: object, array, function.

### Symbol

Symbol - 独一无二的值

```js
let type = {
  t1: Symbol('类型1'), // 参数相当于注解，只起到区分作用，名字一样也是不一样的
  t2: Symbol('类型2')
};
```

当使用 if 比较的时候，t1 或是 t2 的值并无所谓，只要不一致即可，所以可以使用 Symbol。
无意义的数字或字符串被称为 `魔法数字/字符串`

Symbol 还可以作为属性使用，但是只能用`[]`，不能用`.`

```js
let t = Symbol();
let a = {};
a[t] = '123';

let b = {
  [t]: '123'
};
```

## js 强制类型转换

强制类型转换的发生场景：

- 字符串拼接
- `==` 运算符 v
- if 语句
- 逻辑运算符 <与或非>

## js 类型判断

js 中，typeof 能得到哪些类型呢？  
undefined, object, string, number, boolean, function (没有 null 和 array)

### null 与 undefined 的区别

- null 是一个表示”无”的对象，转为数值时为 0；
- undefined 是一个表示”无”的原始值，转为数值时为 NaN。

## == 与 ===

什么时候用 `==` 什么时候用 `===` 呢？
判断变量是否有值的时候用 `==`， 其他情况全部用 `===`

```js
if (a.b == null) {
  // 等价于 a.b === null || a.b === undefined
}
```

js 中有哪些内置函数 — 数据封装类对象？
Object，Array，Boolean，Number，String，Function，Date，RegExp，Error

基本类型的赋值是真正的赋值，两个变量之间不会相互干预
引用类型的赋值只是指针地址的赋值，指向同一地址，共享同一个对象

在 js 中，JSON 是一个 js 对象，也是一种数据格式

## for in & of

for in 遍历的是索引（即键名），而 for of 遍历的是元素值。
for in 可以遍历 obj 或者是 arr，但是可能会遍历到原型链上的属性，看具体的浏览器。
for of 只能遍历 iterable 的变量, object 不可以用 of 遍历。

```js
const obj = {
  a: 1,
  b: 2
};
const arr = [1, 2];

for (let key in obj) {
  console.log(obj[key]);
}

for (let value of arr) {
  console.log(value);
}
```

## 手撕深对象拷贝

```js
function deepCopy(obj) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('type err');
  }
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
```

在 js 中，JSON 是一个 js 对象，也是一种轻量级的数据交换格式
