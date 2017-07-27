<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">块级按钮</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<button type="button" class="mui-btn mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-success mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-warning mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-danger mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-royal mui-btn-block">Block button</button>
				<button type="button" class="mui-btn mui-btn-block mui-btn-outlined">Block button</button>
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">Block button</button>
				<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">Block button</button>
				<button type="button" class="mui-btn mui-btn-warning mui-btn-block mui-btn-outlined">Block button</button>
				<button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined">Block button</button>
				<button type="button" class="mui-btn mui-btn-royal mui-btn-block mui-btn-outlined">Block button</button>
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
	.mui-content-padded {
		margin: 10px;
	}
</style>