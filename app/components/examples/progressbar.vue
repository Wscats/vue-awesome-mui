<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">progress bar（进度条）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-demo-container">
				<div id="demo1" class="mui-text-center">
					<h5>动态设置进度条进度</h5>
					<p class="mui-progressbar mui-progressbar-in" data-progress="20"><span></span></p>
					<ul id="progressbarBtn1" class="mui-pagination">
						<li><a href="javascript:;" data-progress="10">10%</a></li>
						<li><a href="javascript:;" data-progress="30">30%</a></li>
						<li><a href="javascript:;" data-progress="50">50%</a></li>
						<li><a href="javascript:;" data-progress="100">100%</a></li>
					</ul>
				</div>
				<div id="demo2">
					<h5>动态创建内联进度条及销毁</h5>
					<p style="height: 2px;"></p>
					<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block">开始加载</button>
				</div>
				<div id="demo3">
					<h5>动态创建页面顶部进度条</h5>
					<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block">开始加载</button>
				</div>
			</div>
			<div style="padding-left: 10px;margin: 15px 0;">
				<h5>无限循环进度条</h5>
			</div>
			<div class="mui-demo-container">
				<div>
					<h5>内联无限循环进度条</h5>
					<p class="mui-progressbar mui-progressbar-infinite"></p>
				</div>
				<div id="demo4" style="margin-top: 18px;">
					<h5>页面顶部无限循环进度条</h5>
					<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block">开始加载</button>
				</div>
			</div>
			<div style="padding-left: 10px;margin: 15px 0;">
				<h5>自定义进度条颜色</h5>
			</div>
			<div id="demo5" class="mui-demo-container" style="padding-bottom: 30px;">
				<p class="mui-progressbar mui-progressbar-success" data-progress="20"><span></span></p>
				<p class="mui-progressbar mui-progressbar-warning" data-progress="30"><span></span></p>
				<p class="mui-progressbar mui-progressbar-danger" data-progress="50"><span></span></p>
				<p class="mui-progressbar mui-progressbar-royal" data-progress="80"><span></span></p>
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
			// Example 1: set progress
			var progressbar1 = mui('#demo1');
			mui(progressbar1).progressbar().setProgress(10);
			progressbar1.on('tap', 'a', function() {
				mui(progressbar1).progressbar().setProgress(this.getAttribute('data-progress'));
			});

			function simulateLoading(container, progress) {
				if (typeof container === 'number') {
					progress = container;
					container = 'body';
				}
				setTimeout(function() {
					progress += Math.random() * 20;
					mui(container).progressbar().setProgress(progress);
					if (progress < 100) {
						simulateLoading(container, progress);
					} else {
						mui(container).progressbar().hide();
					}
				}, Math.random() * 200 + 200);
			}

			// Example 2: inline progressbar
			mui("#demo2").on('tap', '.mui-btn', function() {
				var container = mui("#demo2 p");
				if (container.progressbar({ progress: 0 }).show()) {
					simulateLoading(container, 0);
				}
			});

			// Example 3: top progressbar
			mui('#demo3').on('tap', 'button', function() {
				mui('body').progressbar({ progress: 0 }).show();
				simulateLoading(0);
			});

			// Example 4: infinite top progressbar
			mui('#demo4').on('tap', 'button', function() {
				mui('body').progressbar({ progress: undefined }).show();
				setTimeout(function() {
					mui('body').progressbar().hide();
				}, 5000);
			});

			// Example 5: custom colors
			mui("#demo5 .mui-progressbar").each(function() {
				mui(this).progressbar({ progress: this.getAttribute("data-progress") }).show();
			});
		}
	}
</script>
<style scoped>
	h5 {
		margin-bottom: 10px;
		text-align: left;
	}
	.mui-demo-container {
		background-color: #fff;
		padding: 10px 15px;
	}
	.mui-btn-block {
		padding: 5px 0;
	}
	#demo5 .mui-progressbar {
		margin: 15px 10px;
	}
	.mui-progressbar-success span {
		background-color: #4cd964;
	}
	.mui-progressbar-warning span {
		background-color: #f0ad4e;
	}
	.mui-progressbar-danger span {
		background-color: #dd524d;
	}
	.mui-progressbar-royal span {
		background-color: #8a6de9;
	}
</style>
