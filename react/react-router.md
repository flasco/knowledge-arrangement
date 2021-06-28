# hashHistory 与 browserHistory 的区别

- browserHistory 需要 server 端支持，比如/asd，那 server 需要把所有 /asd/\* 的请求都转到请求前端资源。
- hashHistory 中当#后面的字符串变化之时，浏览器并不会去发送一次 request，react-router 自己根据 url 去 render 相应的模块。

# 如何实现一个 react-router

react-router 可以简单分为两个部分，分别是 switch 以及 route，switch 负责监听 history 的变化，根据 current url 去切换 route 的渲染，简单的结构就是这样

```ts
const Switch = (props) => {
  const [path] = useHistory();

  const routes = props.children;

  return routers[path] ?? null;
};
```

route 就是注册组件，他是一个 Wrapper，主要负责挂载一些额外的信息。

```tsx
<Route component={Page1} path="/hello" />
```

这里的 history 实现分为两种，分别是 hashHistory 以及 browserHistory，hash 主要是依赖 window.location.hash & window 上的一个 onhashChange 的事件，browserHistory 则是依赖 html5 的 history 事件，监听 window 上的 popState 事件。基于这两个监听事件去实现自己的 history 即可。
