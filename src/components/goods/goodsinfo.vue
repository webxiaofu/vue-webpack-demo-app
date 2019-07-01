<template>
  <div>
    <transition
      @before-enter="brforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div
        class="ball"
        v-if="ballflag"
        ref="ball"
      ></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper
            :lunbotuList='lunbotu'
            :iswidth="false"
          ></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{SPparams.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>市场价:<span class="market-price">￥{{SPparams.market_price}}</span>销售价:<span class="now-price">￥{{SPparams.sell_price}}</span></p>
          <p class="numberbuy">购买数量:<numberbox
              @numberchange="numberchange"
              :max="SPparams.stock_quantity"
            ></numberbox>
          </p>
          <mt-button
            type="primary"
            size="small"
          >立即购买</mt-button>
          <mt-button
            type="danger"
            size="small"
            @click="addtocar"
          >加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{SPparams.goods_no}}</p>
          <p>库存情况:{{SPparams.stock_quantity}}件</p>
          <p>上架时间:{{SPparams.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button
          type="primary"
          size="large"
          plain
          @click="goDesc(id)"
        >图文介绍</mt-button>
        <mt-button
          type="danger"
          size="large"
          plain
          @click="goComment(id)"
        >商品评价</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper";
import numberbox from "../subcomponents/numberbox";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [], //轮播图
      SPparams: [], //商品详情
      ballflag: false,
      buynumber: 1 //商品购买的数量
    };
  },
  created() {
    this.getlunbotu();
    this.getSPparam();
  },
  methods: {
    getlunbotu() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            result.data.message.forEach(element => {
              element.img = element.src;
            });
            this.lunbotu = result.data.message;
          }
        })
        .catch(err => {});
    },
    getSPparam() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.data.status === 0) {
            this.SPparams = result.data.message[0];
            console.log(this.$refs);
          }
        })
        .catch(err => {});
    },
    goDesc(id) {
      this.$router.push({
        name: "goodsdesc",
        params: { id }
      });
    },
    goComment(id) {
      this.$router.push({
        name: "goodscomment",
        params: { id }
      });
    },
    brforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的样式，结束状态
      el.offsetWidth; //得写这个，会强制动画刷新
      //动态获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取购物车图标在页面中的位置
      /* console.log(this.$refs) */
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDistance = badgePosition.left - ballPosition.left;
      const yDistance = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDistance}px,${yDistance}px)`; //移动位置   ``= es6拼接字符串
      el.style.transition = "all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)"; //设置动画的时间 和 效果
      done(); //这里的done 其实就是afterEnter，官方文档说这个必须调用一下，不然动画结束 会有延迟
    },
    afterEnter(el) {
      this.ballflag = !this.ballflag;
    },
    numberchange(count) {
      this.buynumber = count;
      /* console.log("父组件拿到的数量值为： " + this.buynumber); */
    },
    addtocar() {
      this.ballflag = !this.ballflag;
      //点击该按钮时，拼接出商品的数据，并将商品的数据存入store的car中去
      var goodsinfo = {
        id: this.id,
        count: this.buynumber,
        price: this.SPparams.sell_price,
        selected: true
      };
      this.$store.commit('addtocar',goodsinfo)
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>
<style lang="scss" scoped>
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  left: 138px;
  top: 400px;
  z-index: 100;
}
.market-price {
  text-decoration: line-through;
  margin-right: 5px;
}
.now-price {
  color: red;
  font-weight: bold;
}
.numberbuy {
  display: flex;
  line-height: 35px;
}
.mui-card-footer {
  display: block;
  .mint-button {
    margin-bottom: 7px;
  }
}
</style>
