<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">media list（图文列表）</h1>
		</header>
		<div class="mui-content">
			<!--<ul class="mui-table-view mui-unfold">
				<li class="mui-table-view-cell mui-collapse mui-media mui-media-icon">
					<a href="javascript:;">
						<div class="mui-media-object mui-pull-left">
							<img src="../images/shuijiao.jpg">
						</div>
						<div class="mui-media-body">
							幸福
						</div>
					</a>
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell mui-media mui-media-icon">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left"><span class="mui-icon mui-icon-contact"></span>
								</div>
								<div class="mui-media-body">
									幸福
								</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media mui-media-icon">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left"><span class="mui-icon mui-icon-contact"></span>
								</div>
								<div class="mui-media-body">
									幸福
								</div>
							</a>
						</li>
					</ul>
				</li>
				<li class="mui-table-view-cell mui-media mui-media-icon">
					<a href="javascript:;">
						<div class="mui-media-object mui-pull-left"><span class="mui-icon mui-icon-contact"></span>
						</div>
						<div class="mui-media-body">
							幸福
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-media-icon">
					<a href="javascript:;">
						<div class="mui-media-object mui-pull-left"><span class="mui-icon mui-icon-contact"></span>
						</div>
						<div class="mui-media-body">
							幸福
						</div>
					</a>
				</li>
			</ul>-->
			<div class="title">
				缩略图居左
			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							幸福
							<p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							木屋
							<p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							CBD
							<p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
					</a>
				</li>

			</ul>
			<div class="title">
				缩略图居右
			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							远眺
							<p class='mui-ellipsis'>静静的看这个世界，最后终于疯了</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							幸福
							<p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							木屋
							<p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="title">
				右侧带导航箭头
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							CBD
							<p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class='mui-navigate-right' href="javascript:;">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							远眺
							<p class='mui-ellipsis'>静静的看这个世界，最后终于疯了</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-right" :src="src">
						<div class="mui-media-body">
							幸福
							<p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="title">
				card（圆角列表）
			</div>
			<div class="mui-card" style="margin-bottom: 35px;">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-right" :src="src">
							<div class="mui-media-body">
								木屋
								<p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
							</div>
						</a>
					</li>
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-right" :src="src">
							<div class="mui-media-body">
								CBD
								<p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
							</div>
						</a>
					</li>
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-right" :src="src">
							<div class="mui-media-body">
								远眺
								<p class='mui-ellipsis'>静静的看这个世界，最后终于疯了</p>
							</div>
						</a>
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
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
		}
	}
</script>
<style scoped>
	.title {
		margin: 20px 15px 10px;
		color: #6d6d72;
		font-size: 15px;
	}
</style>