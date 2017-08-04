<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">icons（扩展图标）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<p style="text-align: center;">点击图标查看高亮样式</p>
				<div class="flex-container">
					<a><span class="mui-icon-extra mui-icon-extra-calc"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-new"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-card"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-grech"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-trend"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-cart"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-custom"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-express"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-class"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-gift"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-gold"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-heart"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-order"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-alipay"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-calendar"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-prech"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-rank"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-notice"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-share"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-regist"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-sweep"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-people"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-addpeople"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-peoples"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-like"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-filter"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-at"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-comment"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-computer"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-lamp"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-dictionary"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-xiaoshuo"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-topic"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-classroom"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-university"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-outline"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-find"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-arrowleftcricle"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-arrowrightcricle"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-top"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-phone"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-holiday"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-hotel"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-cold"></span></a>
					<a><span class="mui-icon-extra mui-icon-extra-cate"></span></a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//引入图标样式
	import "vue-awesome-mui/mui/examples/hello-mui/css/icons-extra.css";
	export default {
		mounted() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			var active = null,
				lastid, span;
			mui(".mui-content").on("tap", "a", function() {
				var id = this.getAttribute("id");
				if(!active) {
					this.classList.add("active");
					if(id) {
						span = this.querySelector("span");
						span.classList.remove("mui-" + id);
						span.classList.add("mui-" + id + "-filled");
					}
					active = this;
				} else {
					active.classList.remove("active");
					if(lastid) {
						span.classList.remove("mui-" + lastid + "-filled");
						span.classList.add("mui-" + lastid);
					}

					this.classList.add("active");
					if(id) {
						span = this.querySelector("span");
						span.classList.remove("mui-" + id);
						span.classList.add("mui-" + id + "-filled");
					}

					active = this;
				}
				lastid = id;
			});
		}
	}
</script>
<style scoped>
	.flex-container {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-flow: row wrap;
		justify-content: space-between;
		text-align: center;
	}
	
	.mui-content-padded {
		padding: 10px;
	}
	
	.mui-content-padded a {
		margin: 3px;
		width: 50px;
		height: 50px;
		display: inline-block;
		text-align: center;
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 25px;
		background-clip: padding-box;
	}
	
	.mui-content-padded a .mui-icon-extra {
		margin-top: 12px;
	}
	
	.mui-spinner,
	.mui-spinner-white {
		margin-top: 12px
	}
	
	.active .mui-spinner-indicator {
		background: #007AFF;
	}
	
	.mui-content a {
		color: #8F8F94;
	}
	
	.mui-content a.active {
		color: #007aff;
	}
</style>