css 布局方式

1. 表格布局 - 使用 table 来布局
2. display: table-row,table-cell 布局 - 可以让 div 做到像 table 布局一样的展现。

盒子模型 - margin, border, padding, width, height(content)

标准盒模型： 一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)
怪异盒模型： 一个块的总宽度= width + margin(左右)（即 width 已经包含了 padding 和 border 值）

怎么改变盒模型：

> box-sizing ： content-box || border-box || inherit;

- 当设置为 box-sizing:content-box 时，将采用标准模式解析计算，也是默认模式；
- 当设置为 box-sizing:border-box 时，将采用怪异模式解析计算；

position 定位 - fixed，relative，absolute，static，inherit
position 和 float 的区别？
position 脱离文档流和文本流。
而 float 脱离了文档流，却没有脱离文本流。

css 选择器权值排列
内联样式 1000
id 选择(#id) 100
类选择(.classA .classB) 10
相邻加法选择(.classA + .classB) 0
!important 最优先（都有 important 的话就看选择器的权值）
