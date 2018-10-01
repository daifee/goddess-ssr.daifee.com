# goddess-ssr.daifee.com
React同构





## 注意

### 全局变量

不能再“模块全局环境”使用`window`, `document`等浏览器环境的全部变量，Node.js环境的也不行。因为代码同时运行于两个不同环境。

```js
// 会报错，因为服务端渲染时也会加载该模块，但缺少`window`变量
const storage = window.storage;

export async function getItem(key) {
  let value = storage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (error) {
    // ignore
  }
  return value;
}
```
