<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">tab bar（选项卡）</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar-home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-setting">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
		<div class="mui-content">
			<div id="tabbar-home" class="mui-control-content mui-active">
				<div class="tab-title">这是div模式选项卡中的第1个子页面</div>
				<div class="tab-title">何谓div模式的选项卡？其实就是通过DIV模拟一个独立页面，通过DIV的显示、隐藏模拟不同页面的切换，典型的SPA模式。</div>
			</div>
			<div id="tabbar-chat" class="mui-control-content">
				<div class="tab-title">这是div模式选项卡中的第2个子页面，该页面展示一个消息列表</div>
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell"><a href="" class="mui-navigate-right">Item 1</a></li>
					<li class="mui-table-view-cell"><a href="" class="mui-navigate-right">Item 2</a></li>
					<li class="mui-table-view-cell"><a href="" class="mui-navigate-right">Item 3</a></li>
					<li class="mui-table-view-cell"><a href="" class="mui-navigate-right">Item 4</a></li>
					<li class="mui-table-view-cell"><a href="" class="mui-navigate-right">Item 5</a></li>
				</ul>
			</div>
			<div id="tabbar-contact" class="mui-control-content">
				<div class="tab-title">这是div模式选项卡中的第3个子页面</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">联系人 1</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">联系人 2</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">联系人 3</a>
					</li>
				</ul>
			</div>
			<div id="tabbar-setting" class="mui-control-content">
				<div class="tab-title">这是div模式选项卡中的第4个子页面</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">新消息通知</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">隐私</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">通用</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init({
				swipeBack: true
			});
		}
	}
</script>
<style scoped>
	.tab-title {
		margin: 20px 15px 10px;
		color: #6d6d72;
		font-size: 15px;
	}
</style>
