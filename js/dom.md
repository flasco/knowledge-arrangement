# DOM

# dom 是哪种基本的数据结构？

树

## dom 常用的 api？

```js
// 常用api
document.getElementById(); // 元素
document.getElementsByTagName(); // 集合
document.getElementsByClassName(); // 集合
document.querySelectorAll(); // 集合
document.querySelector();
element.getBoundingClientRect(); // 常用的获取元素宽高，位置等信息
// 优化dom操作的2个重要的api
document.createDocumentFragment();
requestAnimationFrame(() => {});
```

## dom 的 attr 与 property 有什么区别？

property 是 DOM 中的属性，是 JavaScript 里的对象；
attribute 是 HTML 标签上的特性，比如 class，id，type 等
