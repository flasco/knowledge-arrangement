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

impl 里所定义的函数如果有带上 &self, 那么在实例化之后可以直接通过`.[method]()`来进行调用，like this.

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

### trait 是什么

trait 可以类比成 java 的 interface，c++的虚基类（应该？），或者说是一个抽象类。

trait 是对类型行为的抽象

```rust

struct Dog {
    name: &'static str,
    age: u32,
}

trait Student {
    fn study(&self) -> ();
    fn go_school(&self) -> () {
        println!("默认的上学校方式")
    }
    // fn study2(&self) -> ();
}

impl Student for Dog {
    fn study(&self) -> () {}
    fn go_school(&self) -> () {}
}

fn main() {
    let a = Dog { name: "2", age: 2 };
    a.study(); // &self 才能直接调，否则就需要 Dog::study 了
}

```

### trait 的用处

可以用来作为函数参数的特定约束，比如说接受的参数必须实现了某个 trait 才行。

```rust
fn go_to_school<T: Student>(p: T) -> () {
    p.go_school();
}

// 假设 Dog，Cat 都继承了 Student
let aa: Dog = Dog { name: "小黄", age: 2 };
let bb: Cat = Cat { name: "小白", age: 2 };

go_to_school(aa);
go_to_school(bb);
go_to_school::<Dog>(aa);
go_to_school::<Dog>(bb); // Error，因为 bb 是 cat，但是这里锁定了是继承了Student的Dog才行

```

这符合零开销原则：如果你不使用某个抽象，就不用为它付出开销（静态分发）；如果你确实需要使用该抽象，可以保证这是开销最小的使用方式（动态分发）。目前在一些基准测试中，Rust 已经拥有了能够和 C/C++竞争的性能。

> 而 js 的 class 目前是做不到的，就算实现了组合继承，写法也很不优雅
