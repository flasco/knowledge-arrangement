# options

options 请求 - 其实是一种预检请求，主要有两种用途
1、获取接口支持的请求类型，比如是否支持 post，delete。
2、用来检查接口是否支持跨域。跨域的情况下需要设置特殊请求头才会触发 options 请求

下面的 2 种情况需要进行预检：

1. 简单请求，比如使用 Content-Type 为 application/xml 或 text/xml 的 POST 请求；
2. header 中设置自定义头，比如 X-[custom-name] 等。

如果没设置 Access-Control-Max-Age 的话，每次请求都会发送 options，这时候可以设置 `Access-Control-Max-Age: 1728000` 来指定本次预检请求的有效期，单位是秒，没过期之前都不会再次发起。

注意，在新版 chrome 的 network 中无法看到 options 请求，需要经过特殊配置才行

# cdn 的作用以及原理

cdn，全称是内容分发网络。cdn 可以提供更高效的服务，低延时的访问，可以解决单个域名下链接并发数低的问题，变相提高浏览器的链接并发数。

原理：

- 浏览器访问域名，本地 dns 解析获得 CNAME，将解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。
- 专用服务器返回 cdn 的全局负载均衡设备 ip 给浏览器，浏览器请求。
- 负载均衡设备根据用户的 ip 获取物理地址，接入网的类型，选择一台离用户最近，负载最轻的缓存服务器 ip 返回给用户。
- 用户向缓存服务器发起请求并获得内容。
