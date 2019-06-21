import VueRouter from 'vue-router'

//导入对应的路由组件
import home from '../components/tabbar/home.vue'
import member from '../components/tabbar/member.vue'
import search from '../components/tabbar/search.vue'
import shopcar from '../components/tabbar/shop-car.vue'
import newslist from '../components/news/newslist.vue'
import newsinfo from '../components/news/newsinfo.vue'
//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shop-car',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo}
    ],
    linkActiveClass:'mui-active' //设置class 覆盖默认的router-link-active
})

export default router