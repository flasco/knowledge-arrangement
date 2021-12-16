# Rust 笔记

> 记一些看书/文档学习到的一些 trick，主要是备忘.

## rust 中的 class

```rust

#[derive(Debug)]
struct Dog<'a> {
    name: &'a str,
    age: u32,
}

impl<'c> Dog<'c> {
    fn new(name: &'c str, age: u32) -> Self {
        Dog { name, age }
    }
}

fn main() {
  let a = Dog::new("23", 10);
  let x = Dog::new(&String::from("123123"), 10);
  println!("{:?}", a);
  println!("{:?}", x);
}

```

在 rust 中推崇组合式拼接，也就是说 struct 是 class 的数据部分，impl 里是负责定义结构体相关的 function。传统的 js class 继承的方式很容易导致引入多余的继承属性，组合模式可以更加精确的引入特定内容，更加优雅，也不会有多继承带来的一些问题。

```rust
#[derive(Debug)]
struct Dog<'a> {
    name: &'a str,
    age: u32,
}

trait Eat {
  fn favor_eat() -> ();
  fn favor_ouu() -> ();
}

impl<'c> Dog<'c> {
    fn new(name: &'c str, age: u32) -> Self {
        Dog { name, age }
    }
}

impl Eat for Dog<'_>  {
    fn favor_eat() -> () {
        println!("favor_eat")
    }
    fn favor_ouu() -> () {
        println!("favor_ouu")
    }
}

fn main() {
  let a = Dog::new("23", 10);
  let x = Dog::new(&String::from("123123"), 10);
  println!("{:?}", a);
  println!("{:?}", x);
}

```

impl里所定义的函数如果有带上 &self, 那么在实例化之后可以直接通过`.[method]()`来进行调用，like this.

```rust

#[derive(Debug)]
struct Dog<'a> {
    name: &'a str,
    age: u32,
}

trait Eat {
  fn favor_eat() -> ();
  fn favor_ouu() -> ();
}

impl<'c> Dog<'c> {
    fn new(name: &'c str, age: u32) -> Self {
        Dog { name, age }
    }
    fn asd(&self) {
        println!("asdqwe");
    }
    fn qwe() {
        println!("qweert");
    }
}

let a = Dog::new("123", 22);
a.asd();
Dog::qwe();
a.qwe(); // Error

```