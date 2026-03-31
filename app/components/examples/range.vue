<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">range（滑块）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<h5 style="margin-top:35px;">label+输入框+滑块：</h5>
				<div class="mui-input-row mui-input-range field-contain">
					<div style="float:left">
						<label>滑块：</label>
						<input type="text" id="field-range-input" value="60">
					</div>
					<div style="margin-left:121px;">
						<input type="range" id="field-range" value="60" min="0" max="100" />
					</div>
				</div>
				<h5>label+滑块：<span id="inline-range-val">20</span></h5>
				<div class="mui-input-row mui-input-range">
					<label>滑块：</label>
					<input type="range" id="inline-range" value="20" min="0" max="100">
				</div>
				<h5 style="clear: left;">整行滑块：<span id="block-range-val">50</span></h5>
				<div class="mui-input-row mui-input-range">
					<input type="range" id="block-range" value="50" min="0" max="100">
				</div>
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
			var rangeList = document.querySelectorAll('input[type="range"]');
			for (var i = 0, len = rangeList.length; i < len; i++) {
				rangeList[i].addEventListener('input', function() {
					if (this.id.indexOf('field') >= 0) {
						document.getElementById(this.id + '-input').value = this.value;
					} else {
						document.getElementById(this.id + '-val').innerHTML = this.value;
					}
				});
			}
			document.getElementById('field-range-input').addEventListener('input', function() {
				document.getElementById('field-range').value = this.value;
			});
		}
	}
</script>
<style scoped>
	h5 {
		padding-top: 15px;
	}
	.field-contain label {
		width: auto;
		padding-right: 0;
	}
	.field-contain input[type='text'] {
		width: 40px;
		height: 30px;
		padding: 5px 0;
		float: none;
		text-align: center;
	}
</style>
