---
title: 2
lang: zh-CN
description: 2
a: 1
---

::: v-pre
`{{ This will be displayed as-is }}`
:::


<script setup lang="ts">
import { useData } from 'vitepress'
import A from "../components/a.vue"
const { page } = useData()
</script>

<pre>{{ page }}</pre>
# a 

<A />

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

::: info
This is an info box.
:::
# start
```js
export default {
  name: 'MyComponent',
  // ...
}
```
[2](./test/2.md)

![1](/public/1.jpg)








# Button 按钮
常用操作按钮

## 基础用法

基础的函数用法

:::demo 使用`size`、`color`、`pain`、`round`属性来定义 Button 的样式。

```vue
<template>
    <JzMsgList :listData="[{title:'asdfa','avatar':'3233',time:'asdf','message':'adsfads'}]"  />
    <div>
        <div></div>
    </div>
</template>
```
:::
