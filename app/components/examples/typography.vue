<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">typography（文字）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<h1>h1. Heading</h1>
				<h2>h2. Heading</h2>
				<h3>h3. Heading</h3>
				<h4>h4. Heading</h4>
				<h5>h5. Heading</h5>
				<h6>h6. Heading</h6>
				<p>p. 目前最接近原生App效果的框架。</p>
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
		}
	}
</script>
