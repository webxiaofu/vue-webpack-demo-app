<template>
  <div>
    <combox :id="this.$route.params.id"></combox>
  </div>
</template>
<script>
import combox from "../subcomponents/comment";
export default {
  components: {
    combox
  }
};
</script>
<style lang="scss" scoped>
</style>
