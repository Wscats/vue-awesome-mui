<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">off canvas（侧滑导航）</h1>
		</header>
		<div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
			<!-- Side menu -->
			<aside id="offCanvasSide" class="mui-off-canvas-left">
				<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="aside-title">侧滑导航</div>
						<div class="aside-content">
							这是可拖动式侧滑菜单示例，你可以在这里放置任何内容。
							<p style="margin: 10px 15px;">
								<button id="offCanvasHide" type="button" class="mui-btn mui-btn-danger mui-btn-block" style="padding: 5px 20px;">关闭侧滑菜单</button>
							</p>
						</div>
						<ul class="mui-table-view mui-table-view-chevron">
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">Item 1</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">Item 2</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">Item 3</a>
							</li>
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">Item 4</a>
							</li>
						</ul>
					</div>
				</div>
			</aside>
			<!-- Main content -->
			<div class="mui-inner-wrap">
				<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="mui-content-padded">
							<p>这是可拖动式右滑导航示例，主页面和菜单在一个组件中。</p>
							<p>打开侧滑菜单有多种方式：1、在当前页面向右拖动；2、点击如下按钮；3、通过JS API触发。</p>
							<p style="padding: 5px 20px;margin-bottom: 5px;">
								<button id="offCanvasShow" type="button" class="mui-btn mui-btn-primary mui-btn-block" style="padding: 10px;">
									显示侧滑菜单
								</button>
							</p>
						</div>
					</div>
				</div>
				<div class="mui-off-canvas-backdrop"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init();
			var offCanvasWrapper = mui('#offCanvasWrapper');
			// Show button
			document.getElementById('offCanvasShow').addEventListener('tap', function() {
				offCanvasWrapper.offCanvas('show');
			});
			// Hide button
			document.getElementById('offCanvasHide').addEventListener('tap', function() {
				offCanvasWrapper.offCanvas('close');
			});
			// Enable scroll
			mui('#offCanvasSideScroll').scroll();
			mui('#offCanvasContentScroll').scroll();
		}
	}
</script>
<style scoped>
	p {
		text-indent: 22px;
	}
	.mui-off-canvas-left {
		color: #fff;
	}
	.aside-title {
		margin: 35px 15px 10px;
	}
	.aside-content {
		margin: 10px 15px 35px;
		color: #bbb;
		text-indent: 1em;
		font-size: 14px;
		line-height: 24px;
	}
</style>
