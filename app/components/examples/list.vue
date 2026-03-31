<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">list（普通列表）</h1>
		</header>
		<div class="mui-content">
			<div class="title">右侧无导航箭头</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">Item 1</li>
				<li class="mui-table-view-cell">Item 2</li>
				<li class="mui-table-view-cell">Item 3</li>
			</ul>
			<div class="title">右侧有导航箭头</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">Item 1</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">Item 2</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">Item 3</a>
				</li>
			</ul>
			<div class="title">右侧带数字角标</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						Item 1
						<span class="mui-badge mui-badge-primary">11</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						Item 2
						<span class="mui-badge mui-badge-success">22</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						Item 3
						<span class="mui-badge">33</span>
					</a>
				</li>
			</ul>
			<div class="title">card（圆角列表）</div>
			<div class="mui-card" style="margin-bottom: 35px;">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">Item 1</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">Item 2</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">Item 3</a>
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
	.title {
		margin: 20px 15px 7px;
		color: #6d6d72;
		font-size: 15px;
	}
</style>
