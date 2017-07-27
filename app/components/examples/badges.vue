<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">badge（数字角标）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<h5>有底色</h5>
				<span class="mui-badge">1</span>
				<span class="mui-badge mui-badge-primary">12</span>
				<span class="mui-badge mui-badge-success">123</span>
				<span class="mui-badge mui-badge-warning">3</span>
				<span class="mui-badge mui-badge-danger">45</span>
				<span class="mui-badge mui-badge-purple">456</span>
				<h5>无底色（使用父元素背景色）</h5>
				<span class="mui-badge mui-badge-inverted">1</span>
				<span class="mui-badge mui-badge-primary mui-badge-inverted">2</span>
				<span class="mui-badge mui-badge-success mui-badge-inverted">3</span>
				<span class="mui-badge mui-badge-warning mui-badge-inverted">4</span>
				<span class="mui-badge mui-badge-danger mui-badge-inverted">5</span>
				<span class="mui-badge mui-badge-royal mui-badge-inverted">6</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
		}
	}
</script>
<style scoped>
	h5 {
		margin: 10px;
	}
	
	.mui-badge {
		margin: 10px;
	}
</style>