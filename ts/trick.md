# enum 和 const enum 的区别

enum 在编译的时候会有 key-value & value - key 的双重映射关系，但是实际上在大部分情况下我们并不关系 value - key 之间的关系，而 const enum 就只会存在 key-value 的映射关系，且 const enum 在编译之后会作为常量直接编译到使用的地方，不会产生变量，所以在不需要 value key 的情况下都推荐使用 const enum。

# interface 和 type 的区别

- type 更通用，右侧可以包括类型表达式，而 interface 只能是某种结构。
- interface 在继承的时候会被 ts 检查，而 type union 的时候 ts 会尽最大努力去尝试，不会报错。
- 同个作用域中多个同名 interface 会被合并，type 多个同名则会报错。

# as const

在写react hook的时候会用到，把数组转成元组，避免定义报错

```ts
const useXXX = () => {
  // ...
  return [a, setA] as const;
}
```