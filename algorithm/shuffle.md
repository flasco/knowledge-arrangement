### 洗牌算法

```ts
const shuffle = (arr) => {
  const newArr = [...arr];
  const len = newArr.length;
  for (let i = len - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * i);
    [newArr[i], newArr[index]] = [newArr[index], newArr[i]];
  }

  return newArr;
};
```
