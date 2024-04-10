---
title: Vue 3 Vite Starter
published: 2024-04-10
description: ''
image: ''
tags: 

- Vue 
category: 'Vue'
draft: false 
---

# Vue 3 Vite Starter

![](/src/assets/images/makima1.jpg)

提示

Starter后缀笔记仅适用于快速上手，且在学习后端前需了解Html,Css,Javascript。

介绍
这是一个配置好的Vite+Vue3的前端空项目，使用前请确保已配置好node.js环境(推荐版本18+)，已配置好router,axios以及请求工具,element-ui plus
下载链接：[123网盘](https://www.123pan.com/s/lYa0Vv-cYEAA.html)
安装教程
1.解压项目，来到src同级目录打开终端，执行以下命令安装依赖

```node.js
npm i
```

![Description](https://z1.ax1x.com/2023/09/27/pPbidiV.png)
![Description](https://z1.ax1x.com/2023/09/27/pPbiHeA.png)
:::
2.打开IDE，导入项目，开敲！

## 1.Vue3组件库引入步骤

**注意：引入组件库清先完整阅读组件库中文文档关于快速开始或安装的说明，确保适用版本为Vue3!!!**

1.前往官方中文文档找到npm包管理器的安装命令，以下示例操作为[element plus](https://element-plus.org/zh-CN/guide/installation.html)组件库引入 其他组件库雷同。找到已配置好的包管理的相应命令，在**src同级目录**下执行！一般选用npm包管理器的命令即可。

![](https://z1.ax1x.com/2023/09/27/pPbFPwn.png)

![](https://z1.ax1x.com/2023/09/27/pPbFKm9.png)

2.成功下载依赖后，打开ide,编辑src/main.js 如下示例 一半步骤为

1.导入依赖

2.将依赖使用use用法应用到Vue应用中

3.开敲

```javascript
import './assets/main.css'
//以下为项目必须依赖
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";
import App from './App.vue'
import router from './router/index.js'
//以下为Element plus 组件库需要导入的依赖
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//创建Vue应用
const app = createApp(App)
//axios请求配置
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios
//项目必须依赖应用至创建的Vue应用
app.use(createPinia())
app.use(router)
//将Element plus应用至创建的应用
app.use(ElementPlus) 
//挂载Vue应用
app.mount('#app')
```

以上即为引入组件库的基本步骤，引入后即可在其他Vue应用中引用组件，所有引用方式及配置参数请仔细阅读组件库文档！

## 2.Axios请求库

### (1).介绍：axios用于处理前端与后端的请求。

### (2).配置

1.编辑src/main.js,来到如下代码段：

```javascript
//axios请求配置
axios.defaults.baseURL = 'http://localhost:8080' //单引号内填写请求后端的地址和端口，配置后在其他vue组件中只需要填写链接后的请求路径即可
axios.defaults.withCredentials = true //跨域coockie
app.config.globalProperties.$axios = axios 

```

2.（选看，因为我已经都配好了，直接看怎么用就行）来到net/index.js

```javascript
import axios from "axios";
import {ElMessage} from "element-plus";//引入用到的组件

const defaultError = () => ElMessage.error('发生错误，请联系管理员。') //定义默认错误提示语
const defaultFailure = (message) => ElMessage.warning(message) //后端请求返回失败信息时将其打印
//post请求示例
function post(url, data, success, failure = defaultFailure, error = defaultError) {//导入请求路径url,请求数据data,以及失败和成功的操作
    axios.post(url, data, { //使用axios的post请求 传入路径和数据
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" //设置内容类型
        },
        withCredentials: true
    }).then(({data}) => {
        if (data.success)
            success(data.message, data.status) //判断数据内含的请求成功或失败并做出对应前端操作，执行的操作在组件中引用时书写
        else
            failure(data.message, data.status)
    }).catch(error)
}

function get(url, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        withCredentials: true
    }).then(({data}) => {
        if (data.success)
            success(data.message, data.status)
        else
            failure(data.message, data.status)
    }).catch(error)
}

function InternalGet(url, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        withCredentials: true
    }).then((response) => {
        success(response.data);
    }).catch(error);
}


export {get, post, InternalGet} //导出get post InternalGet方法 供所有组件使用
```

### (3).使用

1.来到组件,找到标签书写

以下代码为用户访问个人信息页面时向后端请求个人信息，给的起步项目里没有，大家可以依葫芦画瓢

```js
<script>
import {InternalGet, post} from "@/net";
import {ElMessage} from "element-plus";
export default {
  data(){ //定义用到的数据
    return {
      user: {} , //定义用户 单个对象
      users:[]	//定义用户数组 可存多个user对象
        //tip 此处定义不需要指定数据类型 依照赋予值的数据类型而定 每个变量逗号隔开 单个花括号 数组方括号
    }
  },
  mounted() {		// 在组件挂载时执行的函数，基本上有在用户访问网页时同时发生的操作都可以在此书写
    this.getMyInfo(); //执行methods中的getMyInfo函数
  },
  methods: { //此处书写所有网页中用到的函数
    getMyInfo() {
      // 发送GET请求 请求用户数据
      InternalGet('/api/user/me', (data) => { 
        this.user = data.message;
      });
    },sendCode(){
      ElMessage.success("成功发起请求，请等待10s左右");
      post('api/auth/getAuthCode', {
          }, (message) => {
            ElMessage.success(message)
          }
      )
    }
  }
};
</script>
```

这里把我们封装好的axios请求函数用法单独拿出来注释 大家对比着理解

```javascript
getMyInfo() {
      // 发送GET请求 请求用户数据
      InternalGet('后端请求路径，无需重复填写后端地址，我们已经在第一步为全局配置好了', (data) => { 
        this.user = data.message; //把数据层定义的user对象的值赋为后端返回的json中的对象数据
      });
    },sendCode(){ //此处为发送验证码的请求方法 post请求
      ElMessage.success("成功发起请求，请等待10s左右"); //element plus 的信息框提示等待
      post('后端请求路径，无需重复填写后端地址，我们已经在第一步为全局配置好了', {  
          }, (message) => {
            ElMessage.success(message) //此处message为后端返回的提示信息，我们使用信息框直接打印
          }
      )
    }
```

## 3.Router路由

### (1).介绍：路由控制着组件与组件之间的嵌套，跳转以及对用户的访问权限进行限制。

### (2).配置：我们来到router/index.js 

大家配置跳转的主要操作空间即为routes中，每个子路由的节点用花括号结尾，逗号隔开。

```javascript
import { createRouter, createWebHistory } from 'vue-router' //导入路由和访问模式依赖
import login from '@/views/LoginPage.vue'					//引用页面组件
const router = createRouter({								//定义路由组件
  history: createWebHistory(import.meta.env.BASE_URL),		//定义访问历史模式
  routes: [													//定义路由跳转
    {
      path: '/',											//访问路径
      name: 'home',											//子路由名称，只是为了作为当前代码文件内的一个标识，方便开发者
      component: login										//子路由的组件
    },{
      path: '/test',										//访问路径
      name: 'test',											//子路由名称，只是为了作为当前代码文件内的一个标识，方便开发者
      component: () => import('@/views/Common/allPassages.vue')	//子路由的组件
    }
  ]
})
export default router //导出封装的router 供所有组件使用
```

这边单独写出子路由的结构：

```javascript
{
      path: '/',											//访问路径
      name: 'home',											//子路由名称，只是为了作为当前代码文件内的一个标识，方便开发者
      component: login										//子路由的组件
    },//每个子路由写完后面跟个逗号是个好习惯，下次可以直接写下一个子路由，不会因为没有逗号而报错
```

### (3).子路由组件的引入方式

```javascript
//组件引入
import login from '@/views/LoginPage.vue' //在代码头部引入组件并在此
//直接引用
```

## 4.Vue生命周期

> 在单一组件中，钩子的执行顺序是beforeCreate-> created -> mounted->... ->destroyed，但当父子组件嵌套时，父组件和子组件各拥有各自独立的钩子函数，**这些父子组件的这些钩子是如何交融执行，且执行顺序又是怎样的呢?**

#### (1)父子组件生命周期执行顺序

> 组件，分别在他们的钩子函数中打印日志，观察执行顺序。得到的结果如图所示，父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载。

```
父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted
```

> 子组件挂载完成后，父组件还未挂载。所以组件数据回显的时候，在父组件mounted中获取api的数据，子组件的mounted是拿不到的。

> 仔细看看父子组件生命周期钩子的执行顺序，会发现created这个钩子是按照从外内顺序执行，所以父子组件传递接口数据的解决方案是：

- 在created中发起请求获取数据，依次在子组件的created或者mounted中会接收到这个数据。

**加载渲染过程**

```
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```

**更新过程**

```
父beforeUpdate->子beforeUpdate->子updated->父updated
```

**销毁过程**

```
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

**常用钩子简易版**

```
父create->子created->子mounted->父mounted
```

#### (2)补充单一组件钩子执行顺序

> activated, deactivated 是组件keep-alive时独有的钩子

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. activated
8. deactivated
9. beforeDestroy
10. destroyed
11. errorCaptured

#### (3)总结

- beforeCreate执行时：data和el均未初始化，值为undefined
- created执行时：Vue 实例观察的数据对象data已经配置好，已经可以得到data的值，但Vue 实例使用的根 DOM 元素el还未初始化
- beforeMount执行时：data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点
- mounted执行时：此时el已经渲染完成并挂载到实例上
- beforeUpdate和updated触发时，el中的数据都已经渲染完成，但只有updated钩子被调用时候，组件dom才被更新。
- 在created钩子中可以对data数据进行操作，这个时候可以进行数据请求将返回的数据赋给data
- 在mounted钩子对挂载的dom进行操作，此时，DOM已经被渲染到页面上。
- 虽然updated函数会在数据变化时被触发，但却不能准确的判断是那个属性值被改变，所以在实际情况中用**computed**或**watch**函数来监听属性的变化，并做一些其他的操作。
- 所有的生命周期钩子自动绑定 this 上下文到实例中，所以**不能使用箭头函数来定义一个生命周期方法** (例如 created: () => this.fetchTodos()),**会导致this指向父级**。
- 在使用vue-router时有时需要使用来缓存组件状态，这个时候created钩子就不会被重复调用了，如果我们的子组件需要在每次加载或切换状态的时候进行某些操作，可以使用activated钩子触发。
- **父子组件的钩子并不会等待请求返回，请求是异步的，VUE设计也不能因为请求没有响应而不执行后面的钩子。所以，我们必须通过v-if来控制子组件钩子的执行时机**

#### (4)注意 在父组件传递接口的数据给子组件时，一定要在子组件标签上加上v-if="传递的接口数据"

> **在父组件的created中发请求获取数据，通过prop传递给子组件。子组件在created或者mounted中拿父组件传递过来的数据**  这样处理是有问题的。

> 在父组件调用接口传递数据给子组件时，接口响应显然是异步的。这会导致无论你在父组件哪个钩子发请求，在子组件哪个钩子接收数据。都是取不到的。当子组件的mounted都执行完之后，此时可能父组件的请求才返回数据。会导致，从父组件传递给子组件的数据是undefined。

**解决方法1：**

在渲染子组件的时候加上一个条件,data1是父组件调用接口返回的数据。当有数据的时候在去渲染子组件。这样就会形成天然的阻塞。在父组件的created中的请求返回数据后，才会执行子组件的created，mounted。最后执行父组件的mounted。

```javascript
<div class="test">
    <children v-if="data1" :data="data1" ></children>
</div>
```

**解决方法2：**

> 在子组件中 watch 监听，父组件获取到值，这个值就会变化，自然是可以监听到的

```javascript
watch:{
    data:{
      deep:true,
      handler:function(newVal,oldVal) {
        this.$nextTick(() => {
          this.data = newVal
          this.data = newVal.url ? newVal.url : ''
        })
      }
    },
}
```

> 从父组件点击调用接口并显示子组件，子组件拿到数据并监听在watch中调用方法并显示

以下为子组件，data1是从子组件传递过来的数据。在created，mounted中都拿不到父组件调用接口返回的data1。 只能watch监听data1。并调用方法渲染子组件。

```javascript
props:['data1'],
watch:{
    data1:{
      deep:true,
      handler:function(newVal,oldVal) {
        this.$nextTick(() => {
          this.data1 = newVal
          this.showData1(this.data1)
        })
      }
    },
}
```


# 没时间写了，未完待续...
