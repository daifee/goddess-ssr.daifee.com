# goddess-ssr.daifee.com
React同构





## 注意

> 既然是“同构”，就是要求一套代码运行在2个环境（Node.js和Browser）。需要注意2个环境的差异。

1. 需要意识到哪些代码在2个环境都执行，哪些代码只在其中一个环境执行。
  1. 立即执行的代码在2个环境都执行。
  2. React组件生命周期的代码只在Browser环境执行。
  3. `Component.getInitialProps()`方法在2个环境都执行。
  4. 小心使用运行环境的“接口”
2. `next.js`自带`Router`，与“其他Router”肯定存在差异。
3. 某些组件需要用唯一自增ID或随机数，这种做法会使服务端于客户端存在差异。


