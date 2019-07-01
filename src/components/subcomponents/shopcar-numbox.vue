<template>
  <div>
    <div
      class="mui-numbox"
      data-numbox-min='1'
      style="height:20px"
    >
      <button
        class="mui-btn mui-btn-numbox-minus"
        type="button"
      >-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        :value="this.initcount"
        ref="inputbox"
        @change="change"
      />
      <button
        class="mui-btn mui-btn-numbox-plus"
        type="button"
      >+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../assets/lib/mui/js/mui.min.js";
export default {
  mounted() {
    //初始化numberbox控件
    mui(".mui-numbox").numbox();
  },
  methods: {
    change() {
      // 数量改变了
      // console.log(this.$refs.numbox.value);
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
      this.$store.commit("updatecount",{
        id: this.goodsid,
        count: this.$refs.inputbox.value
      })
    }
  },
  props:["initcount","goodsid"]
};
</script>
<style lang="scss" scoped>

</style>