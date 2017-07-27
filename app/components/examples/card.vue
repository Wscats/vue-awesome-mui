<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">cardview（卡片视图）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
			</div>

			<div class="mui-card">
				<div class="mui-card-header mui-card-media" :style="{height:'40vw',backgroundImage:'url('+src+')'}"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>Posted on January 18, 2016</p>
						<p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Read more</a>
				</div>
			</div>

			<!--<div class="mui-card">
				<div class="mui-card-header mui-card-media">
					<div class="mui-card-media-object mui-pull-left">
						<img src="../images/logo.png" width="34px" height="34px" />
					</div>
					<div class="mui-card-media-body">
						小M
						<p class="mui-ellipsis">发表于 6小时前</p>
					</div>
				</div>
				<div class="mui-card-content mui-card-media" style="height:40vw;background-image:url(../images/yuantiao.jpg)"></div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Comment</a>
					<a class="mui-card-link">Read more</a>
				</div>
			</div>-->

			<div class="mui-card">
				<div class="mui-card-header mui-card-media">
					<img :src="src" />
					<div class="mui-media-body">
						小M
						<p>发表于 2016-06-30 15:30</p>
					</div>
					<!--<img class="mui-pull-left" src="../images/logo.png" width="34px" height="34px" />
					<h2>小M</h2>
					<p>发表于 2016-06-30 15:30</p>-->
				</div>
				<div class="mui-card-content">
					<img :src="src" alt="" width="100%" />
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Comment</a>
					<a class="mui-card-link">Read more</a>
				</div>
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
		}
	}
</script>