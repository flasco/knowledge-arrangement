# DOM

* dom是哪种基本的数据结构？ -> 树
* dom常用的api？
* dom的attr与property有什么区别？

```js
// 常用api
document.getElementById(); // 元素
document.getElementsByTagName(); // 集合
document.getElementsByClassName(); // 集合
document.querySelectorAll(); // 集合

let div1 = document.getElementById('test');
let parent = div1.parentElement;
let child = div1.childNodes;
div1.removeChild();
div1.appendChild();

// 优化dom操作的2个重要的api
document.createDocumentFragment();
requestAnimationFrame(()=>{});

```

attr 是指attribute， 是html中标签元素的属性，比如a标签的href
property是指js中object 的属性