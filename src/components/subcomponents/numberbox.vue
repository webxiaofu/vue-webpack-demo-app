<template>
  <div>
    <div
      class="mui-numbox"
      data-numbox-min='1'
    >
      <button
        class="mui-btn mui-btn-numbox-minus"
        type="button"
      >-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        value="1"
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
      this.$emit("numberchange", parseInt(this.$refs.inputbox.value));
      /* console.log(this.$refs.inputbox.value); */
    }
  },
  props: ["max"],
  watch: {
    max: function(newVal, oldVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

