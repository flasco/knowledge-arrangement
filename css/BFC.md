# BFC
BFC - Block Formatting Contexts (块级格式化上下文);
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，外面的元素也不会影响到内部元素。

## 触发 BFC
只要元素满足下面任一条件即可触发 BFC 特性：
* body 根元素
* 浮动元素：float 除 none 以外的值
* 绝对定位元素：position (absolute、fixed)
* display 为 inline-block、table-cells、flex
* overflow 除了 visible 以外的值 (hidden、auto、scroll)

## 用途
* 避免marginTop，marginBottom的边距重叠(margin-collapse)
* 包含浮动的元素以清除浮动（撑起父元素的高度）<设置overflow:hidden;>
* 阻止元素被浮动元素覆盖