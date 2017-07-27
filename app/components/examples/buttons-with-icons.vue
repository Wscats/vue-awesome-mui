<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">带图标按钮</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<h5>图标居左：</h5>
				<button type="button" class="mui-btn mui-icon mui-icon-home">
		            首页
		        </button>
				<button type="button" class="mui-btn mui-btn-primary mui-icon mui-icon-search">
		            搜索
		        </button>
				<button type="button" class="mui-btn mui-btn-success mui-icon mui-icon-plus">添加</button>
				<button type="button" class="mui-btn mui-btn-danger mui-btn-outlined">
		            <span class="mui-icon mui-icon-trash"></span>
		            删除	
		        </button>
				<button type="button" class="mui-btn mui-btn-link">
		            <span class="mui-icon mui-icon-back"></span>
		            返回
		        </button>
				<h5>图标居右：</h5>
				<button type="button" class="mui-btn mui-icon mui-icon-home mui-right">
		            首页
		        </button>
				<button type="button" class="mui-btn mui-btn-primary mui-icon mui-icon-search mui-right">
		            搜索
		        </button>
				<button type="button" class="mui-btn mui-btn-success mui-icon mui-icon-plus mui-right">添加</button>
				<button type="button" class="mui-btn mui-btn-danger mui-btn-outlined">
		            删除	
		            <span class="mui-icon mui-icon-trash"></span>
		        </button>
				<button type="button" class="mui-btn mui-btn-link">
		            下一步
		            <span class="mui-icon mui-icon-forward"></span>
		        </button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
		}
	}
</script>
<style scoped>
	.mui-btn {
		margin-top: 10px;
		margin-left: 10px;
	}
</style>