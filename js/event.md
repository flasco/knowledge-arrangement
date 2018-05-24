# 事件

* 事件的两种方式 事件冒泡与事件捕获
* 冒泡就是一个事件从子元素触发，依次传递至父元素。
* 捕获就是事件从父元素触发，依次传递给子元素。

```js
//阻止事件默认行为和事件冒泡的方法是什么
// 默认行为：
event.preventDefault();
// 冒泡:
event.stopPropregation();
event.cancelBubble();
```

事件冒泡可以使用代理机制加以应用  
当需要给一个无线懒加载的图片列表的每一个图片绑定事件的时候可以通过给父元素添加事件处理，
完成对每一个图片的事件绑定，而不是重复的给每一个图片添加。
这样提高了性能，也节省了空间。

```js
let div = document.getElementById('test');
div.addEventListener('click', function(e) {
  let target = e.target;
  if(target.nodeName === 'IMG'){
    alert('你点击了xx图片');
  }
});

```
DOM事件流：将事件分为三个阶段：捕获阶段、目标阶段、冒泡阶段。  
先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。  

当一个元素绑定多个事件的时候，优先执行捕获，从父级元素到子级的目标元素，然后从目标元素开始冒泡，冒泡按顺序执行。先绑定的先执行
控制是否为捕获还是冒泡可以通过 addEventListener('click',fn,true|false)的第三个参数来控制，true就是捕获,false是冒泡，默认是false