<template>
  <div>
    <mt-swipe :auto="2000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <!-- 谁使用此轮播图组件，需要传递 lunbotuList -->
      <!-- 此时，需要父组件向子组件来传值 -->
      <mt-swipe-item
        v-for="item in lunbotuList"
        :key="item.img"
      >
        <img
          :src="item.img"
          alt=""
          :class="{wid:iswidth}"
        >
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  props: ["lunbotuList","iswidth"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  text-align: center;
  height: 200px;
  img {
    /* width: 100%; */
    height: 100%;
  }
}

.wid{
  width: 100%;
}
</style>
