# 事件

- 事件的两种方式 事件冒泡与事件捕获
- 冒泡就是一个事件从子元素触发，依次传递至父元素。
- 捕获就是事件从父元素触发，依次传递给子元素。
- 优先从父级到子级的捕获，然后是子级到父级的冒泡，可以通过 addEventListener 的第三个参数去控制是采用冒泡还是捕获，一般来说都是采用冒泡模型。

```js
//阻止事件默认行为和事件冒泡的方法是什么
// 默认行为：
event.preventDefault();
// 冒泡:
event.stopPropregation(); // w3c定义的模型，比较通用
event.cancelBubble(); // 微软里定义的模型，不考虑ie可以不用管
```

## 事件代理 / 事件委托

事件冒泡可以使用代理机制加以应用  
当需要给一个无限懒加载的图片列表的每一个图片绑定事件的时候,可以通过给父元素添加事件处理，
而不是重复的给每一个图片添加，这样提高了性能，也节省了内存空间。

```js
let div = document.getElementById("test");
div.addEventListener("click", function (e) {
  let target = e.target;
  if (target.nodeName === "IMG") {
    alert("你点击了xx图片");
  }
});
```

DOM 事件流：将事件分为三个阶段：捕获阶段、目标阶段、冒泡阶段。  
先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。

当一个元素绑定多个事件的时候，优先执行捕获，从父级元素到子级的目标元素，然后从目标元素开始冒泡，冒泡按顺序执行。先绑定的先执行  
控制是否为捕获还是冒泡可以通过 addEventListener('click', fn, true | false) 的第三个参数来控制，true 就是捕获, false 是冒泡，默认是 false

### 事件委托的坏处 & 处理方式

> https://mp.weixin.qq.com/s?__biz=MzkzNzI0MDMxNQ==&mid=2247487301&idx=1&sn=11af3639fb1e8315aab2adb68348f216&source=41#wechat_redirect

视图的滚动渲染是在渲染线程处理的，但是如果某个区域存在事件处理监听的时候，就需要渲染进程的合成器线程等待主线程的 js 执行完毕之后才会继续响应，这个区域会被称为 “非快速滚动区”。

一个事件处理程序就可以面向多个元素，这种高效的写法因此很流行。然而，从浏览器的角度来看，这样会导致整个页面被标记为“非快速滚动区”。这也就意味着，即便事件发生在那些不需要处理的元素上，合成器线程也要每次都跟主线程沟通，并等待它的回应。于是，合成器线程平滑滚动的优点就被抵销了。

为缓冲使用事件委托带来的副作用，可以在注册事件时传入 passive: true。这个选项会提醒浏览器，你仍然希望主线程处理事件，但与此同时合成器线程也可以继续合成新的帧。

```ts
document.body.addEventListener('touchstart', evt => {
  ...
}, { passive: true });
```

## stopPropagation 和 preventDefault 有什么区别

preventDefault 是阻止当前事件默认的行为，stopPropagation 是阻止事件继续冒泡

```html
<div class="A">
  <a href="http://w3c.org" class="B onclick="alert('JavaScript Click Event');"
    >点击链接</a
  >
</div>
```

如果什么都不做的情况下，给两个 dom 加上 click 的 listener，那么会先执行 a 标签的时间，然后执行 div 的事件，然后开始跳转。

如果我们给 a 标签加了 preventDefault，就会阻止跳转链接的 action，div 还是会触发 action。

如果我们给 a 标签加了 stopPropagation，不加 preventDefault，那么就不会阻止默认的事件，仅阻止事件冒泡。（也就是说，点击之后还是会正常跳转，但是点击 a 标签之后， div 的监听不会生效了，因为被阻断了
