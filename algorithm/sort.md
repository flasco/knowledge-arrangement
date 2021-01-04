# 排序

```js
function quickSort(arr, left, right) {
  if (left >= right) return;
  let i = left;
  let j = right;
  let key = arr[left];
  while (i < j) {
    while (i < j && arr[j] >= key) j--;
    arr[i] = arr[j];
    while (i < j && arr[i] <= key) i++;
    arr[j] = arr[i];
  }
  arr[i] = key;
  quickSort(arr, left, j - 1);
  quickSort(arr, j + 1, right);
}

function pureQuickSort(arr) {
  const newArr = [...arr];
  quickSort(newArr, 0, newArr.length - 1);
  return newArr;
}
```
