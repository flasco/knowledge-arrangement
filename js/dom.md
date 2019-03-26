# DOM

- dom 是哪种基本的数据结构？ -> 树
- dom 常用的 api？
- dom 的 attr 与 property 有什么区别？

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
requestAnimationFrame(() => {});
```

attr 是指 attribute， 是 html 中标签元素的属性，比如 a 标签的 href
property 是指 js 中 object 的属性
