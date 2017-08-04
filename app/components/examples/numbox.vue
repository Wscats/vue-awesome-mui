<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">number box（数字输入框）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<h5 class="mui-content-padded">默认</h5>
				<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<h5 class="mui-content-padded">限定最小值和最大值(1~9)</h5>
				<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="5" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<h5 class="mui-content-padded">设定步长值(步长 10)</h5>
				<div class="mui-numbox" data-numbox-step='10' data-numbox-min='10' data-numbox-max='90'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<h5 class="mui-content-padded">取值操作</h5>
				<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="box" class="mui-input-numbox" type="number" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<button id="btn" class="mui-btn" style="padding: 7px 12px;">取当前值</button>
				<h5 class="mui-content-padded">在行内</h5> 购买数量:
				<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<h5 class="mui-content-padded">在表单中</h5>
				<div class="mui-card">
					<form class="mui-input-group">
						<div class="mui-input-row">
							<label>数字框一</label>
							<div class="mui-numbox">
								<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
								<input class="mui-input-numbox" type="number" />
								<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
							</div>
						</div>
						<div class="mui-input-row">
							<label>数字框二</label>
							<div class="mui-numbox">
								<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
								<input class="mui-input-numbox" type="number" />
								<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
							</div>
						</div>
					</form>
				</div>
				<h5 class="mui-content-padded">通过样式定义大小(220x60)</h5>
				<div class="mui-numbox" style="width: 220px;height: 60px;">
					<button class="mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" />
					<button class="mui-btn-numbox-plus" type="button">+</button>
				</div>
				<br/>
				<br />
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		mounted() {
			mui.init();
			document.getElementById("btn").addEventListener('tap', function(event) {
				mui.alert('当前值: ' + document.getElementById("box").value, null, "提示");
			});
			var testBox = document.getElementById("test");
			testBox.addEventListener('change', function() {
				console.log(testBox.value);
			});
		}
	}
</script>
<style scoped>
	html,
	body,
	.mui-content {
		height: 0px;
		margin: 0px;
		background-color: #efeff4;
	}
	
	h5.mui-content-padded {
		margin-left: 0px !important;
		margin-top: 20px !important;
	}
	
	.mui-card {
		margin: 0px;
	}
</style>