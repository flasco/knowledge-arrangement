## 常用的数据结构 collection

> 都在 std::collection::{\*} 下

- Vec - 线性序列，类似数组，不过是 stack，只能 push/pop，无需额外 use，已经集成在 prelude 里了
- VecDeque - 双端队列，可以类比成 js 的数组
- LinkedList - 链表

> 性能上：Vec 和 VecDeque 在 insert 的时候性能一致，但是 VecDeque 在扩容的时候可能需要 1.5 倍 size 的复制（特定情况下内存上比 Vec 拉胯）

- HashMap - 哈希表，类似 js 的 Map
- BTreeMap - 也是哈希表，不过这个是有序的，里面元素排列的顺序会跟随 push 进去的顺序而排列，hashMap 不会

- HashSet & BTreeSet - 类似 js 的 Set，可以用来去重，两个的区别就是无序 & 有序（BTree 是有序的）

Hash & BTree 的区别 - hash 在占用内存上会比较小（因为不需要记录顺序），但是插入的时候耗时大于 BTree。如果没有顺序要求就都用内存消耗小的

- BinaryHeap - 顶堆，基于二叉最大堆实现，可以在 O(1)的情况下取得最大值，用作优先队列使用，也就是带了权重的元素会优先排在队列的前面。
