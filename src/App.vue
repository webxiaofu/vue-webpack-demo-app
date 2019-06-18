<template>
  <div class="app-container">
    <h1>123</h1>
    <!-- 头部 -->
    <wv-header title="傅兴德的vue app项目" @headerClick="onHeaderClick"></wv-header>
    <!-- 中间 -->
    <!-- 底部 -->
	// 使用mui框架
    <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

.app-container{
  padding-top: 50px;
}
</style>
