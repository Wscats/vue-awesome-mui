<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">popover（弹出菜单）</h1>
			<a id="menuBtn" class="mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<p>popover（弹出菜单）是mobile App中常见的UI组件，在用户点击位置附近弹出悬浮菜单，向用户展示更多信息或提供快捷操作。</p>
				<p>popover最常用的两个位置：顶部导航栏右侧和底部工具栏右侧；点击本页右上角的图标体验，接着点击如下按钮体验。</p>
				<p style="text-indent: 0;">
					<a href="#middlePopover" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" style="padding: 5px 20px;">打开弹出菜单</a>
				</p>
			</div>
		</div>
		<!-- Top right popover -->
		<div id="topPopover" class="mui-popover">
			<div class="mui-popover-arrow"></div>
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell"><a href="#">Item1</a></li>
						<li class="mui-table-view-cell"><a href="#">Item2</a></li>
						<li class="mui-table-view-cell"><a href="#">Item3</a></li>
						<li class="mui-table-view-cell"><a href="#">Item4</a></li>
						<li class="mui-table-view-cell"><a href="#">Item5</a></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- Middle popover -->
		<div id="middlePopover" class="mui-popover">
			<div class="mui-popover-arrow"></div>
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell"><a href="#">Item1</a></li>
						<li class="mui-table-view-cell"><a href="#">Item2</a></li>
						<li class="mui-table-view-cell"><a href="#">Item3</a></li>
						<li class="mui-table-view-cell"><a href="#">Item4</a></li>
						<li class="mui-table-view-cell"><a href="#">Item5</a></li>
					</ul>
				</div>
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
			mui('.mui-scroll-wrapper').scroll();
			mui('body').on('shown', '.mui-popover', function(e) {
				// popover shown
			});
			mui('body').on('hidden', '.mui-popover', function(e) {
				// popover hidden
			});
		}
	}
</script>
<style scoped>
	p {
		text-indent: 22px;
	}
	#topPopover {
		position: fixed;
		top: 16px;
		right: 6px;
		height: 250px;
	}
	#topPopover .mui-popover-arrow {
		left: auto;
		right: 6px;
	}
	#middlePopover {
		height: 250px;
	}
</style>
