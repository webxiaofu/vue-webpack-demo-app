// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入App根组件
import App from './App'
//按需导入we-vue的组件
import { Header } from 'we-vue'
Vue.use(Header)
import 'we-vue/lib/style.css'
// 导入mui的样式
import './lib/mui/css/mui.min.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
  // render: c => c(App)
})
