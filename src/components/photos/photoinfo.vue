<template>
  <div class="photoinfo">
    <h3>{{ photoinfo.title}}</h3>
    <div class="photoinfo-header">
      <span>发布时间：{{ photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{ photoinfo.click}}次</span>
    </div>
    <!-- 缩略图区域 -->
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '100px', height: '100px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
    <!--           -->
    <hr>
    <p>{{ photoinfo.content}}</p>
    <!-- 评论组件 -->
    <comment-box v-bind:id="id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoinfo();
    this.getPhotoSLT();
  },
  methods: {
    getPhotoinfo() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            this.photoinfo = result.data.message[0];
          } else {
            Toast("加载图片详情页失败");
          }
        })
        .catch(err => {});
    },
    //获取缩略图数据
    getPhotoSLT() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            result.data.message.forEach((item) => {
              item.w = 600;
              item.h = 400;
            });
            this.list = result.data.message;
          } else {
          }
        })
        .catch(err => {});
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log("closeHandler");
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log("destroyHandler");
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo {
  padding: 3px;
  h3 {
    text-align: center;
    color: cyan;
    font-size: 20px;
  }
  .photoinfo-header {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
    }
  }
  p {
    line-height: 25px;

    padding: 5px;
  }
}
</style>

