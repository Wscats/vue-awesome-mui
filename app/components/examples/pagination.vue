<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<router-link to="/index" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">pagination（分页）</h1>
		</header>
		<div class="mui-content">
			<h5 class="mui-content-padded">分页(默认尺寸)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pagination">
					<li class="mui-previous mui-disabled">
						<a href="#">&laquo;</a>
					</li>
					<li class="mui-active">
						<a href="#">1</a>
					</li>
					<li>
						<a href="#">2</a>
					</li>
					<li>
						<a href="#">3</a>
					</li>
					<li>
						<a href="#">4</a>
					</li>
					<li>
						<a href="#">5</a>
					</li>
					<li class="mui-next">
						<a href="#">&raquo;</a>
					</li>
				</ul>
			</div>
			<h5 class="mui-content-padded">分页(大尺寸)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pagination mui-pagination-lg">
					<li class="mui-previous">
						<a href="#">&laquo;</a>
					</li>
					<li>
						<a href="#">1</a>
					</li>
					<li>
						<a href="#">2</a>
					</li>
					<li>
						<a href="#">3</a>
					</li>
					<li>
						<a href="#">4</a>
					</li>
					<li class="mui-active">
						<a href="#">5</a>
					</li>
					<li class="mui-next mui-disabled">
						<a href="#">&raquo;</a>
					</li>
				</ul>
			</div>
			<h5 class="mui-content-padded">分页(小尺寸)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pagination mui-pagination-sm">
					<li class="mui-previous">
						<a href="#">&laquo;</a>
					</li>
					<li>
						<a href="#">1</a>
					</li>
					<li>
						<a href="#">2</a>
					</li>
					<li class="mui-active">
						<a href="#">3</a>
					</li>
					<li>
						<a href="#">4</a>
					</li>
					<li>
						<a href="#">5</a>
					</li>
					<li class="mui-next">
						<a href="#">&raquo;</a>
					</li>
				</ul>
			</div>
			<h5 class="mui-content-padded">翻页(默认)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pager">
					<li>
						<a href="#">上一页</a>
					</li>
					<li>
						<a href="#">下一页</a>
					</li>
				</ul>
			</div>
			<h5 class="mui-content-padded">翻页(对齐)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pager">
					<li class="mui-previous">
						<a href="#">上一页</a>
					</li>
					<li class="mui-next">
						<a href="#">下一页</a>
					</li>
				</ul>
			</div>
			<h5 class="mui-content-padded">翻页(禁用)</h5>
			<div class="mui-content-padded">
				<ul class="mui-pager">
					<li class="mui-disabled">
						<span>上一页</span>
					</li>
					<li>
						<a href="#">下一页</a>
					</li>
				</ul>
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
			(function($) {
				$('.mui-pagination').on('tap', 'a', function() {
					var li = this.parentNode;
					var classList = li.classList;
					if (!classList.contains('mui-active') && !classList.contains('mui-disabled')) {
						var active = li.parentNode.querySelector('.mui-active');
						if (classList.contains('mui-previous')) {
							if (active) {
								var previous = active.previousElementSibling;
								if (previous && !previous.classList.contains('mui-previous')) {
									$.trigger(previous.querySelector('a'), 'tap');
								} else {
									classList.add('mui-disabled');
								}
							}
						} else if (classList.contains('mui-next')) {
							if (active) {
								var next = active.nextElementSibling;
								if (next && !next.classList.contains('mui-next')) {
									$.trigger(next.querySelector('a'), 'tap');
								} else {
									classList.add('mui-disabled');
								}
							}
						} else {
							active.classList.remove('mui-active');
							classList.add('mui-active');
							var page = parseInt(this.innerText);
							var previousPageElement = li.parentNode.querySelector('.mui-previous');
							var nextPageElement = li.parentNode.querySelector('.mui-next');
							previousPageElement.classList.remove('mui-disabled');
							nextPageElement.classList.remove('mui-disabled');
							if (page <= 1) {
								previousPageElement.classList.add('mui-disabled');
							} else if (page >= 5) {
								nextPageElement.classList.add('mui-disabled');
							}
						}
					}
				});
			})(mui);
		}
	}
</script>
