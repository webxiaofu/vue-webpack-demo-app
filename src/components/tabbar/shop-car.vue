<template>
  <div class="shopcar-container">
    <div
      class="shopcar-list"
      v-for="(item,index) in goodslistinfo"
      :key="item.id"
    >
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- <input type="checkbox" :checked="$store.getters.getgoodSelected[item.id]" @change="selectedchange(item.id,$store.getters.getgoodSelected[item.id])"> -->
            <!-- <el-switch
              v-model="$store.getters.getgoodSelected[item.id]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="selectedchange(item.id,$store.getters.getgoodSelected[item.id])"
            >
            </el-switch> -->
            <!-- <mt-switch v-model="$store.getters.getgoodSelected[item.id]" @change="selectedchange(item.id,$store.getters.getgoodSelected[item.id])"></mt-switch> -->
            <img
              :src="item.thumb_path"
              alt=""
            >
            <span>
              <h1>{{ item.title }}</h1>
              <p>
                <span>￥{{item.sell_price}}</span>
                <carnumbox
                  :initcount="$store.getters.getinitcount[item.id]"
                  :goodsid="item.id"
                > </carnumbox>
                <a
                  href="#"
                  @click.prevent="remove(item.id,index)"
                >删除</a>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已选商品 <span class="red">{{$store.getters.getgoodscountandprice.count}}</span> 件， 总价 <span class="red">￥{{$store.getters.getgoodscountandprice.amount}}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import carnumbox from "../subcomponents/shopcar-numbox";
export default {
  inject: ["reload"],
  data() {
    return {
      goodslistinfo: [],
      
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      var idArr = [];
      this.$store.state.car.forEach(element => {
        idArr.push(element.id);
      });
      if (idArr.length > 0) {
        this.$axios
          .get(
            "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
              idArr.join(",")
          )
          .then(result => {
            if (result.data.status === 0) {
              this.goodslistinfo = result.data.message;
            }
          })
          .catch(err => {});
      }
    },
    remove(id, index) {
      this.goodslistinfo.splice(index, 1);
      this.$store.commit("removecar", id);
      this.reload();
    },
    selectedchange(id, val) {
      //每当改变switch按钮的状态，同步到store中去
      console.log(id, val);
      this.$store.commit("updategoodsselected", {
        id,
        selected: val
      });
    }
  },
  components: {
    carnumbox
  }
};
</script>
<style scoped lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    span {
      h1 {
        font-size: 13px;
      }
      p {
        display: flex;
        margin-bottom: 0px;
        margin-top: 10px;
        span {
          margin-right: 7px;
          color: red;
          font-weight: bold;
          width: 50px;
        }
        a {
          margin-left: 5px;
        }
      }
    }
  }
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>