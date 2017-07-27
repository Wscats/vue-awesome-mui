<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">折叠面板</h1>
		</header>
		<div class="mui-content">
			<div class="mui-card">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">表单</a>
						<div class="mui-collapse-content">
							<form class="mui-input-group">
								<div class="mui-input-row">
									<label>Input</label>
									<input type="text" placeholder="普通输入框">
								</div>
								<div class="mui-input-row">
									<label>Input</label>
									<input type="text" class="mui-input-clear" placeholder="带清除按钮的输入框">
								</div>

								<div class="mui-input-row mui-plus-visible">
									<label>Input</label>
									<input type="text" class="mui-input-speech mui-input-clear" placeholder="语音输入">
								</div>
								<div class="mui-button-row">
									<button class="mui-btn mui-btn-primary" type="button" onclick="return false;">确认</button>&nbsp;&nbsp;
									<button class="mui-btn mui-btn-primary" type="button" onclick="return false;">取消</button>
								</div>
							</form>
						</div>
					</li>
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">图片轮播</a>
						<div class="mui-collapse-content">
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
					</li>
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">文字排版</a>
						<div class="mui-collapse-content">
							<h1>h1. Heading</h1>
							<h2>h2. Heading</h2>
							<h3>h3. Heading</h3>
							<h4>h4. Heading</h4>
							<h5>h5. Heading</h5>
							<h6>h6. Heading</h6>
							<p>
								p. 目前最接近原生App效果的框架。
							</p>
						</div>
					</li>
				</ul>
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
				this.$mui.init({
					swipeBack: true //启用右滑关闭功能
				});
				//获得slider插件对象
				//需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法
				var gallery = mui('.mui-slider');
				gallery.slider({
					interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
				});
			}
	}
</script>