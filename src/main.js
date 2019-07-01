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
Vue.prototype.$axios = axios

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器，可以改变日期格式 
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})



//映入element ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
//按需导入mint ui的组件及相关样式 ---轮播组件
import mintui from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.use(mintui)

//导入缩略图组件 
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)
//导入vuex状态管理
import vuex from 'vuex'
Vue.use(vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new vuex.Store({
  state: {
    //this.$store.state.***
    car: car //{id:商品的id,count:要购买的数量，price:商品单价，selected:是否选中该商品}


  },
  mutations: {
    //this.$store.commit('方法名称','唯一参数')
    addtocar(state, goodsinfo) {
      //把商品数据加入store中去
      //1、如果添加之前已经存在该商品，则更新商品的数量
      //2、如果不存在该商品，则通过push添加该数据进入car

      //假设没有找到
      var flag = false
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = item.count + parseInt(goodsinfo.count)
          flag = true
          return true
        }
      });
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updatecount(state,goodsinfo){
      //点击购物车界面numbox时，更新store里的数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removecar(state,id){
      state.car.some((item,i) =>{
        if(item.id=id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updategoodsselected(state,info){
      state.car.some(item=>{
        if(item.id=info.id){
          item.selected=info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    //this.$store.getters.***
    //相当于一个计算属性
    getAllcount(state){
      var c=0
      state.car.forEach(element => {
        c=c+element.count
      });
      return c
    },
    getinitcount(state){
      var a={}
      state.car.forEach(element =>{
        a[element.id]=element.count
      })
      return a
    },
    getgoodSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getgoodscountandprice(state){
      var o={
        count:0,
        amount:0

      }
      state.car.forEach(item=>{
        o.count=item.count+o.count
        o.amount=item.price*item.count+o.amount
      })
      return o
    }

  }
})
// 导入App根组件
import App from './App'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',

  // render: c => c(App)

  //挂载路由对象到vm实例上
  router,
  //挂在store状态管理对象
  store
})
