## if

```rust
let a = 1;

if a < 2 {
  println!("hello");
} else if a < 4 {
  println!("hello");
} else {
  println!("hello");
}

```

## println 的用法

- nothing 代表 Display，比如 `println!("{}", 2)`
- ? 代表 Debug，比如 `println!("{:?}", 2)`
- o 代表八进制，比如 `println!("{:o}", 2)`
- x 代表十六进制小写，比如 `println!("{:x}", 2)`
- X 代表十六进制大写，比如 `println!("{:X}", 2)`
- p 代表指针，比如 `println!("{:p}", 2)`
- b 代表二进制，比如 `println!("{:b}", 2)`
- e 代表指数小写，比如 `println!("{:e}", 2)`
- E 代表指数大写，比如 `println!("{:E}", 2)`

## 注释

- // 单行注释
- /\*\* \*/ 多行注释，支持 markdown
- /// 库文档的注释，支持 markdown
- //! 库文档开头的注释，支持 markdown
