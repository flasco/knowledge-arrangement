# js 同步与异步

- js 同步与异步的区别 -> 同步会阻塞代码的运行，而异步不会
- 使用异步的场景 -> setTimeout, setInterval, Promise, ajax, 动态 img 加载, 事件绑定
- 宏任务： setTimeout, setInterval
- 微任务： Promise.then
- 微任务优先于宏任务执行
- Promise 中的代码会立即执行

```js
console.log('start!');
let pro = new Promise((resolve, reject) => {
  let pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('action 2');
      resolve('response 2');
    }, 0);
    resolve('response 3');
  });
  console.log('action 1');
  resolve('response 1');
  pro1.then(val => {
    console.log(val);
  });
});

pro.then(val => {
  console.log(val);
});
console.log('end!');

/* Answer
  start!
  action 1
  end!
  response 3
  response 1
  action 2
  此题注意点是 对于同一个resolve只会响应一次，而对于自由变量(没有在本作用域中声明的)则是会在作用域链向上查找
*/
```

Promise 的 reject 返回的内容会在 catch 中被捕获，而 catch 除了能捕获到 reject，还能捕获到 throw 出来的 error.

```js
let pro = new Promise((resolve, reject) => {
  throw new Error('这里是一个Error');
  reject('123');
});
pro.catch(err => console.log(err));
```

对于 setTimeout(fn,200)，当到 200ms 时，fn 会被放进“任务队列”，而“任务队列”必须要等到主线程已有的代码执行完才会执行 fn，所以当程序执行到 setTimeout(fn,200) 这一行时，时间就开始计算，但是 fn 实际执行时并不一定是在 200ms 后，可能是在更久的时间后（取决于主线程上的同步代码的执行时间）。

- 如何实现图片懒加载？
  在 img 标签中添加一个 attribute，其中存储真实的图片地址，src 存储显示加载的 loading 图片。当需要显示图片的时候执行替换，将 src 与 attr 的值互换即可显示。
