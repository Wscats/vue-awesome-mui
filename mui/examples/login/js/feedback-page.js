'use strict';

(function(mui, window, document, undefined) {
	mui.init();
	const get = function(id) {
		return document.getElementById(id);
	};
	const qsa = function(sel) {
		return [].slice.call(document.querySelectorAll(sel));
	};
	const ui = {
		question: get('question'),
		contact: get('contact'),
		imageList: get('image-list'),
		submit: get('submit')
	};
	ui.clearForm = function() {
		ui.question.value = '';
		ui.contact.value = '';
		ui.imageList.innerHTML = '';
		ui.newPlaceholder();
	};
	ui.getFileInputArray = function() {
		return [].slice.call(ui.imageList.querySelectorAll('input[type="file"]'));
	};
	ui.getFileInputIdArray = function() {
		let fileInputArray = ui.getFileInputArray();
		const idArray = [];
		fileInputArray.forEach(function(fileInput) {
			if (fileInput.value !== '') {
				idArray.push(fileInput.getAttribute('id'));
			}
		});
		return idArray;
	};
	let imageIndexIdNum = 0;
	ui.newPlaceholder = function() {
		const fileInputArray = ui.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		}
		imageIndexIdNum++;
		const placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		const closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('click', function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			setTimeout(function() {
				ui.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		const fileInput = document.createElement('input');
		fileInput.setAttribute('type', 'file');
		fileInput.setAttribute('accept', 'image/*');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.addEventListener('change', function(event) {
			const file = fileInput.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = function() {
					//处理 android 4.1 兼容问题
					const base64 = reader.result.split(',')[1];
					const dataUrl = 'data:image/png;base64,' + base64;
					//
					placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
				}
				reader.readAsDataURL(file);
				placeholder.classList.remove('space');
				ui.newPlaceholder();
			}
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		ui.imageList.appendChild(placeholder);
	};
	ui.newPlaceholder();
	ui.submit.addEventListener('tap', function(event) {
		if (ui.question.value === '' ||
			(ui.contact.value !== '' &&
				ui.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) !== 0)) {
			return mui.toast('信息填写不符合规范');
		} 
		plus.nativeUI.showWaiting();
		feedback.send({
			question: ui.question.value,
			contact: ui.contact.value,
			images: ui.getFileInputIdArray()
		}, function() {
			plus.nativeUI.closeWaiting();
			mui.toast('感谢您的建议~');
			ui.clearForm();
			mui.back();
		});
	}, false);
})(mui, window, document, undefined);