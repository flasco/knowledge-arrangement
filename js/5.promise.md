# 手撕 Promise

本次仿写主要是实现了 then、catch 调用链以及 finally ，模拟了 Promise.all, Promise.race，只能算可以跑，并不完全符合 Promise/A+规则，只是符合个人印象里的 Promise，属于直觉上的模拟

## 实现

```js
class Promixe {
  constructor(func) {
    this.thenCallArr = [];
    this.errorCallArr = [];
    this.status = 'PENDING';

    func.call(null, this._resolve.bind(this), this._reject.bind(this));
  }

  static all(array) {
    return new Promixe(resolve => {
      const resArr = [];
      array.forEach((element, index) => {
        element.then(res => {
          resArr.splice(index, 0, res);
          if (resArr.length === array.length) resolve(resArr);
        });
      });
    });
  }

  static deferred() {
    const dfd = {};
    dfd.promise = new Promixe(function(resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }

  static race(array) {
    return new Promixe(resolve => {
      array.forEach((element, index) => {
        element.then(res => {
          // 利用 resolve 只会返回一次，但是其他的不会取消
          resolve(res);
        });
      });
    });
  }

  static resolve(val) {
    return new Promixe(resolve => resolve(val));
  }

  static reject(val) {
    return new Promixe((resolve, reject) => reject(val));
  }

  _resolve(result) {
    // setTimeout 可以让 resolve，reject 进入异步队列，让catch，then 的 function 先行 initial， 挂载到 this 上
    process.nextTick(() => {
      if (this.status === 'PENDING') {
        this.status = 'RESOLVED';
        this.result = result;
        try {
          this._runThenCall();
        } catch (error) {
          this.error = error;
          this._runCatchCall();
        } finally {
          this.finallyCall && this.finallyCall.call(this);
        }
      }
    });
  }

  _runThenCall() {
    while (this.thenCallArr.length > 0) {
      this.result = this.thenCallArr.shift().call(this, this.result);
    }
  }

  _runCatchCall() {
    if (this.errorCallArr.length > 0) {
      while (this.errorCallArr.length > 0 && this.error != null) {
        try {
          if (this.error != null)
            this.errorCallArr.shift().call(this, this.error);
          this.error = null;
        } catch (error) {
          this.error = error;
        }
      }
    } else {
      throw this.error;
    }
  }

  _reject(error) {
    process.nextTick(() => {
      if (this.status === 'PENDING') {
        this.status = 'REJECTED';
        this.error = error;
        this._runCatchCall();
      }
    });
  }

  catch(call) {
    this.errorCallArr.push(call);
    return this;
  }

  then(onResolved, onRejected) {
    if (onResolved != null) {
      this.thenCallArr.push(onResolved);
    }
    if (onRejected != null) {
      this.errorCallArr.push(onRejected);
    }
    return this;
  }

  finally(call) {
    this.finallyCall = call;
    return this;
  }
}

module.exports = Promixe;
```

## 简单的 Jest 测试用例

```js
test('promixe -> then chain', () => {
  new Promixe((resolve, reject) => {
    setTimeout(() => {
      resolve(4 ** 2);
    }, 1000);
  })
    .then(val => {
      expect(val).toBe(16);
    })
    .then(val => {
      expect(val).toBeUndefined();
    });
});

test('promixe -> catch chain', () => {
  new Promixe((resolve, reject) => {
    setTimeout(() => {
      resolve(4 ** 2);
    }, 1000);
    reject('error!');
  })
    .catch(e => {
      expect(e).toBe('error!');
      throw 'waa, new Error!';
    })
    .catch(e => {
      expect(e).toBe('waa, new Error!');
    });
});

test('promixe -> finally action', () => {
  let x = 0;
  new Promixe((resolve, reject) => {
    setTimeout(() => {
      resolve(4 ** 2);
    }, 1000);
  }).finally(() => {
    x = 10086;
    expect(x).toBe(10086);
  });
});

test('promixe -> async/await test', async () => {
  const result = await new Promixe(resolve => {
    setTimeout(() => resolve('hello, async/await'), 1000);
  });
  expect(result).toBe('hello, async/await');
});

// async/await 本质还是一个promise，await 关键字会向 then 函数里塞 onResolved 和 onRejected 两个 function
test('promixe -> async/await test throw', async () => {
  try {
    await new Promixe((resolve, reject) => {
      setTimeout(() => reject('async/await error'), 1000);
    });
  } catch (error) {
    expect(error).toBe('async/await error');
  }
});

test('promixe -> promixe.all', () => {
  const task1 = new Promixe(resolve => setTimeout(() => resolve(5), 500));
  const task2 = new Promixe(resolve => setTimeout(() => resolve(10), 800));
  Promixe.all([task1, task2]).then(val => {
    expect(val).toBe([5, 10]);
  });
});
```
