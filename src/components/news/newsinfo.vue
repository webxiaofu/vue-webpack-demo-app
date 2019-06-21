<template>
    <div class="newsinfo-container">
        <h1>{{ newsinfo.title}}</h1>
        <h3>{{newsinfo.add_time | dateFormat}}</h3>
        <div class="content" v-html="newsinfo.content">
           <!-- 内容区域 -->
        </div>
           <!-- 评论组件区域 -->
           <comment-box v-bind:id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from '../subcomponents/comment'
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:[]
        }
    },
    created(){
        this.getNewsinfo()
    },
    methods:{
        getNewsinfo(){
            this.$axios.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then((result) => {
                //console.log(result)
                if (result.data.status === 0) {
            // 成功了
            this.newsinfo = result.data.message[0];
          } else {
            /* console.log("加载失败") */
            Toast("加载新闻详情内容失败！");
          }
            }); 
        }
    },
    components:{
        'comment-box':comment
    }
    
}
</script>
<style lang="scss" >
.newsinfo-container{
    margin-left: 5px;
    margin-right: 5px;
    
    
    h1{
        font-size: 18px;
        text-align: center;
    }
    h3{
        
        font-size: 12px;
        padding-top: 10px;
        color: aqua;
        text-align: center;
        
  
    }
    .content{
        
        padding-top: 5px;
        img{
            width: 100%;
        }
    }
}

</style>
