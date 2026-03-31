<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">radio（单选框）</h1>
		</header>
		<div class="mui-content">
			<h5 class="mui-content-padded">图标左对齐</h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row mui-radio mui-left">
						<label>radio</label>
						<input name="radio1" type="radio">
					</div>
					<div class="mui-input-row mui-radio mui-left">
						<label>radio</label>
						<input name="radio1" type="radio" checked>
					</div>
					<div class="mui-input-row mui-radio mui-left mui-disabled">
						<label>disabled radio</label>
						<input name="radio1" type="radio" disabled="disabled">
					</div>
				</form>
			</div>
			<h5 class="mui-content-padded">图标右对齐</h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row mui-radio">
						<label>radio</label>
						<input name="radio2" type="radio">
					</div>
					<div class="mui-input-row mui-radio">
						<label>radio</label>
						<input name="radio2" type="radio" checked>
					</div>
					<div class="mui-input-row mui-radio mui-disabled">
						<label>disabled radio</label>
						<input name="radio2" type="radio" disabled="disabled">
					</div>
				</form>
			</div>
			<h5 class="mui-content-padded">列表模式的单选框</h5>
			<ul class="mui-table-view mui-table-view-radio">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">Item 1</a>
				</li>
				<li class="mui-table-view-cell mui-selected">
					<a class="mui-navigate-right">Item 2</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">Item 3</a>
				</li>
			</ul>
			<div class="mui-content-padded">
				<p id="radioInfo"></p>
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
			var info = document.getElementById("radioInfo");
			document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
				info.innerHTML = "当前选中的为：" + e.detail.el.innerText;
			});
		}
	}
</script>
