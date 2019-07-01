<template>
  <div>
    <div
      id="slider"
      class="mui-slider"
    >
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id==0 ? 'mui-active' : '']"
            v-for="item in photolistname"
            v-bind:key="item.id"
            @tap="getPhoto(item.id)"
          >
            {{ item.title}}
          </a>

        </div>
      </div>
      <div>
        <ul class="photo-list">
          <router-link
            tag="ul"
            v-for="item in photo"
            v-bind:key="item.id"
            :to='"/home/photoinfo/"+item.id'
          >
            <img v-lazy="item.img_url">
            <div class="info">
              <h1 class="info-title">{{ item.title }}</h1>
              <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mui from "../../assets/lib/mui/js/mui.js";
/* 初始化scroll控件  http://dev.dcloud.net.cn/mui/ui/#scroll*/

export default {
  data() {
    return {
      photolistname: [],
      photo: []
    };
  },
  created() {
    this.getAllphotolistname();
    this.getPhoto(0); //刚刚进入默认获取全部 类别的图片
  },
  mounted() {
    
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllphotolistname() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(result => {
          if (result.data.status === 0) {
            result.data.message.unshift({ title: "全部", id: 0 });
            this.photolistname = result.data.message;
          }
        });
    },
    getPhoto(cateid) {
      this.$axios("http://www.liulongbin.top:3005/api/getimages/" + cateid)
        .then(result => {
          if (result.data.status === 0) {
            this.photo = result.data.message;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  ul {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    padding: 0;
    
    img {
      width: 100%;
      vertical-align: middle;
      
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>


