
css布局方式
1. 表格布局 - 使用table来布局
2. display: table-row,table-cell 布局 - 可以让div做到像table布局一样的展现。

盒子模型 - margin, border, padding, width, height(content)

标准盒模型： 一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)
怪异盒模型： 一个块的总宽度= width + margin(左右)（即width已经包含了padding和border值）

怎么改变盒模型：
> box-sizing ： content-box || border-box || inherit;
* 当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；
* 当设置为box-sizing:border-box时，将采用怪异模式解析计算；


position定位 - fixed，relative，absolute，static，inherit
position和float的区别？
position脱离文档流和文本流。
而float脱离了文档流，却没有脱离文本流。