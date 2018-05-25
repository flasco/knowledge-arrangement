# 排序

手撕快排
```js
function quickSort(arr, left, right) {
  if(left >= right) return ;
  let i = left;
  let j = right;
  let key = arr[left];
  while(i < j) {
    while(i < j && arr[j] >= key) j--;
    a[i] = a[j];
    while(i < j && arr[i] <= key) i++;
    a[j] = a[i];
  }
  a[i] = key;
  quickSort(arr, left, j - 1);
  quickSort(arr, j + 1, right);
}
```