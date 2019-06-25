<template>
  <div class="main">
    <div
      class="container"
      v-for="item in goodslist"
      :key="item.id"
    >
      <img
        :src="item.img_url"
        alt=""
      >
      <h3>{{item.title}}</h3>
      <div class="bottom">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="state">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>

      </div>
    </div>
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
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      this.$axios
        .get(
          "http://www.liulongbin.top:3005/api/getgoods?pageindex=" +
            this.pageindex
        )
        .then(result => {
          if (result.data.status === 0) {
            this.goodslist = this.goodslist.concat(result.data.message);
          } else {
            Toast("获取商品列表失败！");
          }
        })
        .catch(err => {});
    },
    getMore(){
      this.pageindex++
      this.getgoodslist()
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .container {
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    width: 49%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px;
    margin: 2px 0;
    img {
      width: 100%;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
    .bottom {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .state {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>



