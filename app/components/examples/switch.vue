<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">switch（开关）</h1>
		</header>
		<div class="mui-content">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-active">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-mini mui-active">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-mini">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-blue mui-active">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-blue">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-blue mui-switch-mini mui-active">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span></span>
					<div class="mui-switch mui-switch-blue mui-switch-mini">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init({
				swipeBack: true
			});
			mui('.mui-content .mui-switch').each(function() {
				this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
				this.addEventListener('toggle', function(event) {
					this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
				});
			});
		}
	}
</script>
