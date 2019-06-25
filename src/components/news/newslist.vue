<template>
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.id"
      >
        <router-link :to="'/home/newsinfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class='mui-ellipsis'><span>发表时间：{{ item.add_time | dateFormat }}</span></p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewslist();
  },
  methods: {
    getNewslist() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(result => {
          //console.log(result)
          if (result.data.status === 0) {
            // 成功了
            this.newslist = result.data.message;
          } else {
            /* console.log("加载失败") */
            Toast("加载轮播图失败。。。");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
