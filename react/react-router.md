# hashhistory 与 browserhistory 的区别

- browserHistory 需要 server 端支持
- hashHistory 中当#后面的字符串变化之时，浏览器并不会去发送一次 request，react-router 自己根据 url 去 render 相应的模块。
