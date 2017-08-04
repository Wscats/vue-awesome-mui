<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">图片轮播</h1>
		</header>
		<div class="mui-content">
			<!--<ul class="mui-table-view mui-table-view-chevron">
				<li id="switch" class="mui-table-view-cell">
					定时轮播
					<div class="mui-switch">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
			</ul>-->
		</div>
		<div id="slider" class="mui-slider">
			<div class="mui-slider-group mui-slider-loop">
				<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img :src="src">
					</a>
				</div>
				<!-- 第一张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img :src="src">
					</a>
				</div>
				<!-- 第二张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img :src="src">
					</a>
				</div>
				<!-- 第三张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img :src="src">
					</a>
				</div>
				<!-- 第四张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img :src="src">
					</a>
				</div>
				<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img :src="src">
					</a>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
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
				//需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法
				var gallery = mui('.mui-slider');
				gallery.slider({
					interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
				});
				var slider = mui("#slider");
				this.$nextTick(function(){
					
				})
				/*document.getElementById("switch").addEventListener('toggle', function(e) {
					console.log(e)
					if(e.detail.isActive) {
						slider.slider({
							interval: 5000
						});
					} else {
						slider.slider({
							interval: 0
						});
					}
				});*/
			}
	}
</script>