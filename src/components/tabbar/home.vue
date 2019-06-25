<template>
  <div>

    <!-- 轮播图区域 -->
    <mt-swipe :auto="2000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item
        v-for="item in lunbotuList"
        :key="item.img"
      >
        <img
          :src="item.img"
          alt=""
        >
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img
            src="../../assets/menu1.png"
            alt=""
          >
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img
            src="../../assets/menu2.png"
            alt=""
          >
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
          <img
            src="../../assets/menu3.png"
            alt=""
          >
          <div class="mui-media-body">商品购买</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img
            src="../../assets/menu4.png"
            alt=""
          >
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img
            src="../../assets/menu5.png"
            alt=""
          >
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img
            src="../../assets/menu6.png"
            alt=""
          >
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>

  </div>
</template>
<script>
//导入 mint-ui里的Toast组件，如果数据获取失败则弹出提醒
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    };
  },
  created() {
    this.getLunBoTu();
  },
  methods: {
    getLunBoTu() {
      //使用anxios获取api里的数据
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          /* console.log(result) */
          if (result.data.status === 0) {
            // 成功了
            this.lunbotuList = result.data.message;
          } else {
            /* console.log("加载失败") */
            Toast("加载轮播图失败。。。");
          }
        });
    }
  }
};
</script>
<style scoped lang="scss">
/* 轮播图相关样式 */
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}

/* 六宫格样式 */
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
