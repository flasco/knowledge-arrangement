#options
options请求 - post请求的时候在network页上会出现2条请求
1、获取服务器支持的HTTP请求方法；
2、用来检查服务器的性能。

预检请求是CORS中一种透明服务器验证机制。预检请求首先需要向另外一个域名的资源发送一个 HTTP OPTIONS 请求头，其目的就是为了判断实际发送的请求是否是安全的。

下面的2种情况需要进行预检：
1. 简单请求，比如使用Content-Type 为 application/xml 或 text/xml 的 POST 请求；
2. header中设置自定义头，比如 X-JSON、X-MENGXIANHUI 等。

# http与https的区别
https走的端口是443，而http走的是80端口。http采用的是tcp协议，明文传输，而https则是ssl/tls加密协议，其作用一种是建立一个信息安全通道，来保证数据传输的安全；另一种就是确认网站的真实性。

https 浏览器会使用公钥加密内容，服务器则是对接收到的请求进行私钥解密，这样安全性比较高。

# http2.0的特点
* 服务器端推送，服务器可以对客户端的一个请求发送多个响应。
* 首部压缩，减少体积。
* 多路复用，一次tcp可以同时发送多个请求。

* http1.0 - 连接无法复用，每次都要三次握手和慢启动
* http1.1 - 默认使用持久连接，避免了重复的三次握手

HTTP耗时 = TCP握手
HTTPs耗时 = TCP握手 + SSL握手
HTTPs肯定比HTTP耗时，这就叫SSL延迟。