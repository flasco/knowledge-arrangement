# 排序

手撕快排
```js
function quickSort(arr, left, right){
  if(left >= right) return ;
  let i = left;
  let j = right;
  let key = arr[left];
  while(i < j){
    while(i < j && key >= arr[i]) i++;
    a[j] = a[i];
    while(i < j && key <= arr[j]) j--;
    a[i] = a[j];
  }
  a[j] = key;
  quickSort(arr, left, j - 1);
  quickSort(arr, j + 1, right);
}
```