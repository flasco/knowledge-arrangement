#options
options请求 - post请求的时候在network页上会出现2条请求
1、获取服务器支持的HTTP请求方法；
2、用来检查服务器的性能。

预检请求是CORS中一种透明服务器验证机制。预检请求首先需要向另外一个域名的资源发送一个 HTTP OPTIONS 请求头，其目的就是为了判断实际发送的请求是否是安全的。

下面的2种情况需要进行预检：
1. 简单请求，比如使用Content-Type 为 application/xml 或 text/xml 的 POST 请求；
2. header中设置自定义头，比如 X-JSON、X-MENGXIANHUI 等。