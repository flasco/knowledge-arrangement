# ajax

## 手撕 ajax 代码

```js
function get(url, fn) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); // false 代表是异步
  xhr.onreadystatechange = function() {
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

200 的缓存和 304 的缓存的最大区别是 200 的缓存会优先读取本地缓存，除非到了过期时间，否则是不会访问服务器的，而 304 的协商缓存会在每一次的时候向服务器发送请求，根据服务器返回的内容决定是否要读取缓存。

## 跨域

浏览器有同源策略，不允许 ajax 访问其他域的接口
跨域条件：协议，域名，端口，有一个不同就算跨域

可以跨域的三个标签 - img、link（css 加载）、script（js 脚本加载）
防盗链的原理 - referer

`<img/>` 可以用来进行打点统计，统计网站的访问量（统计的网站可能是其他域的）
`<link><script>` 可以使用 CDN
`<script>`可以用于 JSONP

JSONP 可以用 img 来替代 script 吗？ 不可以，因为 img 只能用来 ping，它无法获取响应的文本内容，只能通过 onerror 和 onsuccess 来获取是否访问成功，是一种单向的通讯。

## get 与 post 的区别

get 传参带在 url 里，post 传参带在 body 中。  
因为浏览器或者是 web 服务器的原因，get 的传参长度有限制，而 post 的传参长度无限制，在 http 协议中并没有规定 get 或者是 post 的长度限制。  
get 请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
post 不同，post 做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此 get 请求适合于请求缓存。
