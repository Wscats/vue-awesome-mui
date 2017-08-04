<template>
	<div>
		<header id="header" class="mui-bar mui-bar-transparent">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">导航栏</h1>
		</header>

		<div class="mui-content">
			<!--静态图片-->
			<img :src="src" />
			<!--轮播图片-->
			<div id="slider" class="mui-slider mui-hidden">
				<div class="mui-slider-group">
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img :src="src" />
						</a>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img :src="src" />
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<p style="margin: 30px 15px 20px;">这是transparent bar（透明导航栏）演示页面， 默认情况下标题栏透明， 当用户向下滚动时，标题栏逐渐由透明转变为不透明；当用户再次向上滚动时，标题栏又从不透明变为透明状态。
			</p>
			<p style="margin: 5px 15px 15px 15px;">
				这是一种解决滚动条通顶问题的变通解决方案，该方案相比双webview的方案，性能更高，动效更酷，但也有其适用场景：
			</p>
			<ul class="hm-description">
				<li>顶部最好有图片或轮播组件</li>
				<li>导航栏字体颜色和图片颜色协调</li>
			</ul>
			<!--<h5 class="mui-content-padded">图片类型</h5>-->
			<!--<form class="mui-input-group" style="margin-bottom: 300px;">
				<div class="mui-input-row mui-radio">
					<label>静态图片</label>
					<input name="style" type="radio" checked value="static">
				</div>
				<div class="mui-input-row mui-radio">
					<label>轮播图</label>
					<input name="style" type="radio" value="slider">
				</div>
			</form>-->
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					src: require("../../images/wscats.jpg")
				}
			},
			mounted() {
				mui.init({
					swipeBack: true //启用右滑关闭功能
				});
				var slider = document.getElementById("slider");
				mui('.mui-input-group').on('change', 'input', function() {
					if(this.checked) {
						switch(this.value) {
							case 'static':
								document.getElementById("img1").className = "";
								document.getElementById("slider").classList.add("mui-hidden");
								break;
							case 'slider':
								document.getElementById("img1").className = "mui-hidden";
								if(slider.classList.contains("mui-hidden")) {
									document.getElementById("slider").classList.remove("mui-hidden");
								}
								break;
						}
					}
				});
			}
	}
</script>
<style scoped>
	html,
	body {
		background-color: #efeff4;
	}
	
	.mui-bar .mui-pull-left .mui-icon {
		padding-right: 5px;
		font-size: 28px;
	}
	
	.mui-bar .mui-btn {
		font-weight: normal;
		font-size: 17px;
	}
	
	.mui-bar .mui-btn-link {
		top: 1px;
	}
	
	.mui-content img {
		width: 100%;
	}
	
	.hm-description {
		margin: 15px;
	}
	
	.hm-description>li {
		font-size: 14px;
		color: #8f8f94;
	}
</style>