## Map & WeakMap 的区别

WeakMap 是弱引用，js 处理垃圾回收的时候是 GC，但是 WeakMap 的对象需要自行去维护清除，js 不会去主动帮我们清理。

weakMap 主要的应用场景是使用对象作为 key 的时候，如果用 Map 去存储，那么作为 key，引用计数会一直保留对象的引用，导致对象无法被清理，容易造成内存泄漏。

因为 weakMap 的弱引用特性，导致变量随时可能会消失，所以不存在 size，也不可遍历。

```ts
const mapper = new Map();
let o1 = {}; // 持有，cnt = 1

mapper.set(o1, "123"); // GC 的cnt = 2;

// 如果用不到了，需要手动清理
o1 = null; // 但是实际上这样是清理不掉的，因为 mapper 还持有这个 o1，cnt = 2 - 1 = 1

const weakMapper = new WeakMap();
let o2 = {};

weakMapper.set(o2, "213"); // WeakMap 里的持有不算入 gc，所以 cnt 还是 1
o2 = null; // 当这里置为 null 之后，放弃了对这块内存的持有，weakMap 也不算入，所以就会被清理掉
```

> Set 和 WeakSet 也是同理
