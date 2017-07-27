<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">带数字的按钮</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<button type="button" class="mui-btn">Badge button <span class="mui-badge">1</span></button>
				<button type="button" class="mui-btn mui-btn-primary">Badge button <span class="mui-badge mui-badge-primary">2</span></button>
				<button type="button" class="mui-btn mui-btn-success">Badge button <span class="mui-badge mui-badge-success">12</span></button>
				<button type="button" class="mui-btn mui-btn-warning">Badge button <span class="mui-badge mui-badge-warning">121</span></button>
				<button type="button" class="mui-btn mui-btn-danger">Badge button <span class="mui-badge mui-badge-danger">999</span></button>
				<button type="button" class="mui-btn mui-btn-royal">Badge button <span class="mui-badge mui-badge-royal">999</span></button>

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
	.mui-btn {
		margin-top: 10px;
		margin-right: 100px;
		margin-left: 10px;
	}
</style>