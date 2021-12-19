## 指针

### 智能指针

rust 的值默认都是分配到栈内存上的，使用智能指针可以让内存分配到堆内存上。

```rust
#[derive(Debug)]
struct LinkedListNode<T> {
    value: T,
    next: Option<Box<LinkedListNode<T>>>,
}

impl<T> LinkedListNode<T> {
    fn new(value: T) -> Self {
        LinkedListNode { value, next: None }
    }
}

```

因为 rust 有类型推导，如果涉及到比如上面的 next 一样的类型，如果不用 Box 的话，无限递归，rust 无法计算出这个 struct 到底占用多少内存，导致编译过不去。
