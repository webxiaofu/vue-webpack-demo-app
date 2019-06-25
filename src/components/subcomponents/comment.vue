<template>
  <div class="comment-container">
    <h2>发表评论</h2>
    <hr>
    <textarea
      name=""
      id=""
      maxlength="120"
      placeholder="请输入要bb的内容(最多120字)"
      v-model="msg"
    ></textarea>
    <mt-button
      size="large"
      type="primary"
      @click="postComments"
    >发表评论</mt-button>
    <ul>
      <li
        v-for="(item, index) in comments"
        :key="item.add_time"
      >
        <div class="comment-info">第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="comment-text">
          <p>{{item.content === '' ? '此用户很懒，嘛都没说': item.content}}</p>
        </div>
      </li>

    </ul>
    <mt-button
      type="danger"
      size="large"
      plain
      @click="getMore"
    >加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      /* id值可以通过props传递过来 直接使用this.id 也可以在评论组件的this.$route.params里拿到 */
      this.$axios
        .get(
          "http://www.liulongbin.top:3005/api/getcomments/" +
            this.id +
            "?pageindex=" +
            this.pageindex
        )
        .then(result => {
          if (result.data.status === 0) {
            // 成功了
            //console.log(result)
            //this.comments=result.data.message
            //每当获取新数据，不要把原来的数据覆盖，而是加在后面
            this.comments = this.comments.concat(result.data.message);
          } else {
            /* console.log("加载失败") */
            Toast("加载新闻详情内容失败！");
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getComments();
    },
    postComments() {
      if (this.msg.length === 0) {
        return Toast("评论内容不能为空！");
      }
      this.$axios
        .post("http://www.liulongbin.top:3005/api/postcomment/" + this.id, {
          content: this.msg
        })
        .then(result => {
          if (result.data.status === 0) {
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg
            };
            this.comments.unshift(cmt);
            this.msg = "";
          } else {
            Toast("评论失败！");
          }
        });
    }
  },
  props: ["id"] /* 接收newsinfo组件传来的id */
};
</script>
<style lang="scss" scoped>
.comment-container {
  h2 {
    font-size: 16px;
  }
  hr {
    margin-bottom: 3px;
  }
  textarea {
    height: 100px;
    margin-bottom: 0;
  }
  ul {
    margin-top: 5px;
    li {
      .comment-info {
        /* overflow: hidden; */
        font-size: 14px;

        line-height: 30px;
        background-color: grey;
      }
      .comment-text {
        margin-top: 5px;
        p {
          text-indent: 2em;
        }
      }
    }
  }
}
</style>
