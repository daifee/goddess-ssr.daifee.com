# goddess-ssr.daifee.com

React同构

访问[goddess-ssr.daifee.com](https://goddess-ssr.daifee.com/)

API项目[https://github.com/daifee/goddess.daifee.com](https://github.com/daifee/goddess.daifee.com)

## 开发

> npm run dev

## 部署

> 本地虚拟机作为部署服务机器，部署脚本：`/home/daifee/sf_development/publish-goddess-ssr/main.sh`

*部署脚本依据“git tag”发布，并支持回滚、重启*

## 注意

> 一套代码运行于两个不同环境，需要注意2个环境的差异。

1. 需要意识到哪些代码在2个环境都执行，哪些代码只在其中一个环境执行。
  1. 立即执行的代码在2个环境都执行。
  2. React组件生命周期的代码只在Browser环境执行。
  3. `Component.getInitialProps()`方法在2个环境都执行。
  4. 小心使用运行环境的“接口”
2. `next.js`自带`Router`，与“其他Router”肯定存在差异。
3. 某些组件需要用唯一自增ID或随机数，这种做法会使服务端于客户端存在差异。
4. “服务端”与“客户端”基本只能用cookie共享“状态”，要珍惜cookie资源。


