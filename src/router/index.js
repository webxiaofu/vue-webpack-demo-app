import VueRouter from 'vue-router'

//导入对应的路由组件
import home from '../components/tabbar/home.vue'
import member from '../components/tabbar/member.vue'
import search from '../components/tabbar/search.vue'
import shopcar from '../components/tabbar/shop-car.vue'
import newslist from '../components/news/newslist.vue'
import newsinfo from '../components/news/newsinfo.vue'
import photolist from '../components/photos/photolist.vue'
import photoinfo from '../components/photos/photoinfo.vue'
import goodslist from '../components/goods/goodslist.vue'
import goodsinfo from '../components/goods/goodsinfo.vue'
import goodsdesc from '../components/goods/goodsdesc.vue'
import goodscomment from '../components/goods/goodscomment.vue'
//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shop-car',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},
        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo},
        {path:'/home/goodsdesc/:id',component:goodsdesc ,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:goodscomment ,name:'goodscomment'}
    ],
    linkActiveClass:'mui-active', //设置class 覆盖默认的router-link-active
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})

export default router