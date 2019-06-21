// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入自己的index.js路由模块
import router from './router/index'

//导入vue ajax工具axios
import axios from 'axios'
Vue.prototype.$axios=axios

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

//按需导入we-vue的组件 --- 顶部那一小块的组件
import { Header} from 'we-vue'
Vue.use(Header)
import 'we-vue/lib/style.css'
//按需导入mint ui的组件及相关样式 ---轮播组件
import {  Swipe, SwipeItem,Button} from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入mui的样式  --mui 类似于一个bootstrap，负责组成底部的组件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入App根组件
import App from './App'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',

  // render: c => c(App)

  //挂载路由对象到vm实例上
  router
})
