# ajax

手撕ajax代码

```js
function get(url, fn){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); // false 代表是异步
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        fn(xhr.responseText)
      }
    }
  }
  xhr.send(null);
}
```

常考状态码
2xx - 表示处理成功，比如200, 201, 203
3xx - 表示需要重定向，浏览器直接跳转, 301 - 永久重定向,  302 - 暂时重定向 , 
304 - 协商缓存<Etag - 检测文件哈希值，没变就让客户端读取本地缓存, LastModified - 检测文件最后修改时间，没变就让客户端读取本地缓存>
4xx - 客户端请求错误，比如404, 400 - 坏的请求, 401 - 未授权
5xx - 服务器错误

200的缓存和304的缓存的最大区别是200的缓存会优先读取本地缓存，除非到了过期时间，否则是不会访问服务器的，而304的协商缓存会在每一次的时候向服务器发送请求，根据服务器返回的内容决定是否要读取缓存。

跨域
浏览器有同源策略，不允许ajax访问其他域的接口
跨域条件：协议，域名，端口，有一个不同就算跨域

可以跨域的三个标签 - img、link（css加载）、script（js脚本加载）
防盗链的原理 - referer

`<img/>` 可以用来进行打点统计，统计网站的访问量（统计的网站可能是其他域的）
`<link><script>` 可以使用CDN
`<script>`可以用于JSONP

JSONP可以用img来替代script吗？ 不可以，因为img只能用来ping，它无法获取响应的文本内容，只能通过onerror和onsuccess来获取是否访问成功，是一种单向的通讯。
