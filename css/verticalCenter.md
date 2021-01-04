# 元素垂直居中的几种实现方式

- 单行文本垂直居中 - line-height
- 利用 vertical-align 设置父级元素为 table-cell 以及 vertical-align:middle
- 通过新增元素来实现垂直居中(after 也行)

```css
.parent {
  height: 300px;
  font-size: 0px;
}
.child {
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}
.childAdd {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  width: 0px;
}
```

```html
<div class="parent">
    <div class="child">
    我是垂直居中的,多点字可以变成多行文本我是垂直居中的
    </div>
    <label class="childAdd"></label>
</div>
```

- 通过绝对定位来实现垂直居中 position: absolute; top: 50%; transform: translateY(-50%);
- margin-top:50vh; transform:translateY(-50%); (vh 是一个类似百分比的概念，50vh 就是 50%)
- 使用弹性盒模型 flex 实现垂直居中 align-items: center
