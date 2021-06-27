# ajax

## 手撕 ajax 代码

```js
function get(url, fn) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, false); // false 代表是异步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        fn(xhr.responseText);
      }
    }
  };
  xhr.withCredentials = true; //支持跨域发送cookies
  xhr.send(null);
}
```

## 常考状态码

- 2xx - 表示处理成功，比如 200, 201, 203
- 3xx - 表示需要重定向，浏览器直接跳转, 301 - 永久重定向, 302 - 暂时重定向, 304 - 协商缓存<Etag - 检测文件哈希值，没变就让客户端读取本地缓存, LastModified - 检测文件最后修改时间，没变就让客户端读取本地缓存>
- 4xx - 客户端请求错误，比如 404, 400 - 坏的请求, 401 - 未授权， 403 - 服务器理解但是拒绝访问
- 5xx - 服务器错误

## 缓存

请求的缓存分两种，分为强缓存与协商缓存，强缓存就是检测 header 的 Cache-Control 和 Expires 是否过了有效期，没的话直接用缓存，否则就发起请求。

协商缓存是服务器根据 LastModified(文件最后修改时间) 以及 ETag(文件的 hash 值) 判断是否需要返回，如果无更新就直接返回 304，让服务器读取缓存。

### Expires & Cache-control 的区别

expires 是请求之后服务端返回的一个绝对时间戳，在此时间戳之前均使用缓存，但是可能会出现时区不同或者是客户端/服务端的时间不准，导致缓存失效的情况。

cache-control 是用的 max-age，一个相对时间戳来声明缓存的有效期，可以有效避免绝对时间可能带来的误差。

cache-control 优先级比 expires 高，优先生效。

## 跨域

浏览器有同源策略，不允许 ajax 访问其他域的接口
跨域条件：协议，域名，端口，有一个不同就算跨域

可以跨域的三个标签 - img、link（css 加载）、script（js 脚本加载）
防盗链的原理 - referer

`<img/>` 可以用来进行打点统计，统计网站的访问量（统计的网站可能是其他域的）
`<link><script>` 可以使用 CDN
`<script>`可以用于 JSONP

JSONP 可以用 img 来替代 script 吗？ 不可以，因为 img 只能用来 ping，它无法获取响应的文本内容，只能通过 onerror 和 onsuccess 来获取是否访问成功，是一种单向的通讯。

### JSONP 的原理 & 实现

script 允许跨域，且 script 请求的代码会直接执行，所以我们可以利用这一点进行请求，服务器端直接拼好代码，通过 url 上携带的参数对 cb 进行调用。

```js
const cb = (payload) => console.log(payload);

<script src="http://localhost:3000/jsonp-xxx?cb=cb">

/**
  const cbStr = ctx.query.cb;
  const result = JSON.stringify({asdasd: 111});
  ctx.body = cbStr + `(${result})`;
*/
```

## get 与 post 的区别

- get 传参带在 url 里，post 传参带在 body 中。
- 因为浏览器或者是 web 服务器的原因，get 的传参长度有限制，而 post 的传参长度无限制，在 http 协议中并没有规定 get 或者是 post 的长度限制。
- restful 语义化
  - get 请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
  - post 做的一般是修改的工作，所以不能使用缓存。
- post 的参数不会暴露，在历史记录中无法被直接看到，更加安全。 duckduckgo 就允许使用 post 模式搜索
