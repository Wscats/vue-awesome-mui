<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">H5模式actionsheet</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item" href="#delete">
				<span class="mui-icon mui-icon-trash"></span>
			</a>
			<a class="mui-tab-item" href="#">
			</a>
			<a class="mui-tab-item" href="#">
			</a>
			<a class="mui-tab-item" href="#forward">
				<span class="mui-icon mui-icon-undo"></span>
			</a>
		</nav>
		<div class="mui-content">
			<div class="mui-content-padded">
				<p>actionsheet一般从底部弹出，显示一系列可选择的操作按钮，供用户选择； actionSheet可从任意位置触发， 点击本页面左下角
					<span class="mui-icon mui-icon-trash"></span>会弹出删除信息确认框； 点击本页面右下角
					<span class="mui-icon mui-icon-undo"></span>会弹出转发确认框； 你也可点击如下按钮，打开照片选择框：
				</p>
				<p>
					<a href="#picture" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" style="padding: 5px 20px;">打开actionsheet</a>
				</p>
				<p>本页面为H5模式的actionsheet演示示例，该模式具有如下优点：</p>
				<ul class="des">
					<li>可通过css自由定制展现样式</li>
				</ul>

				<p>另一方面，H5模式的actionsheet也具备如下缺点：</p>
				<ul class="hm-description">
					<li>不支持覆盖顶部状态栏</li>
					<li>不支持跨webview的遮罩</li>
					<li>在有map等原生组件时，容易被遮挡</li>
				</ul>
				<p id="info"></p>
			</div>
		</div>

		<div id="delete" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#" style="color: #FF3B30;">删除信息</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#delete"><b>取消</b></a>
				</li>
			</ul>
		</div>
		<div id="forward" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#">回复</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#">转发</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#">打印</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#forward"><b>取消</b></a>
				</li>
			</ul>
		</div>
		<div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#">拍照或录像</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="#">选取现有的</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="#picture"><b>取消</b></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			mui('body').on('shown', '.mui-popover', function(e) {
				//console.log('shown', e.detail.id);//detail为当前popover元素
			});
			mui('body').on('hidden', '.mui-popover', function(e) {
				//console.log('hidden', e.detail.id);//detail为当前popover元素
			});
			var info = document.getElementById("info");
			mui('body').on('tap', '.mui-popover-action li>a', function() {
				var a = this,
					parent;
				//根据点击按钮，反推当前是哪个actionsheet
				for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
					if(parent.classList.contains('mui-popover-action')) {
						break;
					}
				}
				//关闭actionsheet
				mui('#' + parent.id).popover('toggle');
				info.innerHTML = "你刚点击了\"" + a.innerHTML + "\"按钮";
			})
		}
	}
</script>
<style scoped>
	p {
		text-indent: 22px;
	}
	
	span.mui-icon {
		font-size: 14px;
		color: #007aff;
		margin-left: -15px;
		padding-right: 10px;
	}
	
	#info {
		padding: 20px 10px;
	}
</style>