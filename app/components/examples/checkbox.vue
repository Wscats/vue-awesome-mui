<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">checkbox（复选框）</h1>
		</header>
		<div class="mui-content">
			<h5 class="mui-content-padded">图标左对齐</h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row mui-checkbox mui-left">
						<label>checked：false</label>
						<input name="checkbox" value="Item 1" type="checkbox">
					</div>
					<div class="mui-input-row mui-checkbox mui-left">
						<label>checked：true</label>
						<input name="checkbox" value="Item 2" type="checkbox" checked>
					</div>
					<div class="mui-input-row mui-checkbox mui-left mui-disabled">
						<label>disabled checkbox</label>
						<input name="checkbox" type="checkbox" disabled="disabled">
					</div>
				</form>
			</div>
			<h5 class="mui-content-padded">图标右对齐</h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row mui-checkbox">
						<label>checked：false</label>
						<input name="checkbox1" value="Item 3" type="checkbox">
					</div>
					<div class="mui-input-row mui-checkbox">
						<label>checked：true</label>
						<input name="checkbox1" value="Item 4" type="checkbox" checked>
					</div>
					<div class="mui-input-row mui-checkbox mui-disabled">
						<label>disabled checkbox</label>
						<input name="checkbox1" type="checkbox" disabled="disabled">
					</div>
				</form>
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
			mui('.mui-input-group').on('change', 'input', function() {
				var value = this.checked ? "true" : "false";
				this.previousElementSibling.innerText = "checked：" + value;
			});
		}
	}
</script>