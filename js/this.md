# this 指向的问题
函数中的this，谁调用就指向谁。
this 要在执行时才能确认值，定义时无法确认。（因为有call，apply，bind这些改变this指向的函数）
但是在使用箭头函数的时候，this是在定义的时候就可以确认的。

```js
let a = { 
    b:function(){ console.log(this) } 
  };
a.b();  // print --- {b: ƒ}
let c = a.b;
c();   // print --- window
```

使用构造器new一个对象时, constructor中的this就指向新的对象

this 的几种不同的使用场景
* 作为构造函数执行 指向新生成的实例
* 作为对象属性执行 指向object
* 作为普通函数执行 指向window
* call apply bind 指向绑定的对象

```js
// 1
function A(name){
  this.name = name;
}
let x = new A('nihao');
// 2
let a = {
  b: function() {
    console.log(this.c);
  },
  c: 6
};
a.b(); // 6

// 3
function x(){
  console.log(this);  // window
}
// 4
let a = {};
function speak(){
  console.log(this);
}.bind(a);
speak();  // {}

function speak2(){
  console.log(this);
}

speak2.call(a); // call 和 apply的区别在于 call用逗号分隔多个参数，apply用数组包括多个参数
speak2.apply(a);

fn.call(this, a, b, c);
fn.apply(this, [a, b, c]);
```