# 前端模块化

* commonjs
* es module
* amd
* sea
* umd
* iife

## 为什么需要前端模块化

1. 避免变量重名
2. 组织代码排列，便于后续维护

## commonjs

nodejs目前主要采用的是commonjs，通过require去引入模块，require存在cache，可以打印 require.cache 来查看。require export 出来的是值的拷贝。

