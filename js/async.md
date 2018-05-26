# js同步与异步

* js同步与异步的区别 -> 同步会阻塞代码的运行，而异步不会
* 使用异步的场景 -> setTimeout, setInterval, Promise, ajax, 动态img加载, 事件绑定
* 宏任务： setTimeout
* 微任务： Promise.then
* 微任务优先于宏任务执行
* Promise中的代码会立即执行

```js
console.log('start!');
let pro = new Promise((resolve, reject)=>{
  let pro1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('action 2');
      resolve('response 2')
    },0);
    resolve('response 3');
  });
  console.log('action 1');
  resolve('response 1');
  pro1.then(val=>{
    console.log(val);
  });
});

pro.then(val=>{
  console.log(val);
})
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

Promise的reject返回的内容会在catch中被捕获，而catch除了能捕获到reject，还能捕获到throw出来的error.
```js
let pro = new Promise((resolve, reject)=>{  
  throw new Error('这里是一个Error') ;
  reject('123');
});  
pro.catch(err => console.log(err));
```

对于setTimeout(fn,200)，当到200ms时，fn会被放进“任务队列”，而“任务队列”必须要等到主线程已有的代码执行完才会执行fn，所以当程序执行到setTimeout(fn,200)这一行时，时间就开始计算，但是fn实际执行时并不一定是在200ms后，可能是在更久的时间后（取决于主线程上的同步代码的执行时间）。

* 如何实现图片懒加载？
在img标签中添加一个attribute，其中存储真实的图片地址，src存储显示加载的loading图片。
当需要显示图片的时候执行替换，将src与attr的值互换即可显示。