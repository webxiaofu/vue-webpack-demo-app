<template>
  <div class="content">
    <div class="mui-card">
      <div class="mui-card-header">{{goodsdesc.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-html="goodsdesc.content">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        goodsdesc:[],
        id:this.$route.params.id
    };
  },
  created(){
    this.getDesc()
  },
  methods:{
      getDesc(){
          this.$axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.id).then((result) => {
              if(result.data.status===0){
                this.goodsdesc=result.data.message[0]
              }
          }).catch((err) => {
              
          });
      }
  }
};
</script>
<style lang="scss" scoped>
.content{
    /deep/ .gomeImgLoad{
        width:100% !important;
    }
}
</style>
