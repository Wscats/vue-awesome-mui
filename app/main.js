//引入vue框架
import Vue from "vue";
//引入路由
import VueRouter from 'vue-router';
//引入vuex状态管理
import Vuex from 'vuex';
//axios的ajax封装库
import axios from "axios";

/*import Mui from "mui";
import "mui/dist/css/mui.css"*/

import Mui from "vue-awesome-mui";
import "vue-awesome-mui/mui/dist/css/mui.css"
Vue.use(Mui)

console.log(Vue.prototype)
Vue.use(Vuex);
//通过 Vue.use()明确地安装路由功能
Vue.use(VueRouter);
//挂载axios在Vue构造器下
Vue.prototype.$ajax = axios;

//引入组件
import index from "./components/index.vue";
//A
import accordion from "./components/examples/accordion.vue";
import actionsheet from "./components/examples/actionsheet.vue";
//B
import badges from "./components/examples/badges.vue";
import buttons from "./components/examples/buttons.vue";
import buttonsWithIcons from "./components/examples/buttons-with-icons.vue";
import buttonsWithBadges from "./components/examples/buttons-with-badges.vue";
import buttonsWithBlock from "./components/examples/buttons-with-block.vue";
import buttonsWithLoading from "./components/examples/buttons-with-loading.vue"
//C
import card from "./components/examples/card.vue"
import checkbox from "./components/examples/checkbox.vue"
//D
import dtpicker from "./components/examples/dtpicker.vue"
import dialog from "./components/examples/dialog.vue"
//S
import sliderDefault from "./components/examples/slider-default.vue"
import sliderTableDefault from "./components/examples/slider-table-default.vue"
import sliderWithTitle from "./components/examples/slider-with-title.vue"
//G
import gridDefault from "./components/examples/grid-default.vue"
import gridPagination from "./components/examples/grid-pagination.vue"
//I
import icons from "./components/examples/icons.vue"
import iconsExtra from "./components/examples/icons-extra.vue"
import input from "./components/examples/input.vue"

var router = new VueRouter({
	routes: [{
		path: '/index',
		component: index,
	}, {
		path: '/accordion',
		component: accordion,
	}, {
		path: '/actionsheet',
		component: actionsheet,
	}, {
		path: '/badges',
		component: badges,
	}, {
		path: '/buttons',
		component: buttons,
	}, {
		path: '/buttons-with-icons',
		component: buttonsWithIcons,
	}, {
		path: '/buttons-with-badges',
		component: buttonsWithBadges,
	}, {
		path: '/buttons-with-block',
		component: buttonsWithBlock,
	}, {
		path: '/buttons-with-loading',
		component: buttonsWithLoading,
	}, {
		path: '/card',
		component: card,
	}, {
		path: '/checkbox',
		component: checkbox,
	}, {
		path: '/dtpicker',
		component: dtpicker,
	}, {
		path: '/dialog',
		component: dialog,
	}, {
		path: '/sliderDefault',
		component: sliderDefault,
	}, {
		path: '/sliderTableDefault',
		component: sliderTableDefault,
	}, {
		path: '/sliderWithTitle',
		component: sliderWithTitle,
	}, {
		path: '/gridDefault',
		component: gridDefault,
	}, {
		path: '/gridPagination',
		component: gridPagination,
	}, {
		path: '/icons',
		component: icons,
	}, {
		path: '/iconsExtra',
		component: iconsExtra,
	}, {
		path: '/input',
		component: input,
	}, {
		path: '/',
		redirect: '/index'
	}]
});

//新建一个状态管理
var store = new Vuex.Store({
	//定义一个状态
	//所有组件的状态，也就是数据源
	state: {
		count: 1,
		title: "标题",
		search: "",
		news: null,
		imgUrl: null,
		isShowGallery: false,
		direction: "left"
	},
	getters: {
		getCount(state) {
			//处理数据
			return state.count + "ed"
		}
	},
	//分发状态
	mutations: {
		setCount(state, data) {
			state.count = data

		},
		settitle(state, data) {
			state.title = data
		},
		setNews(state) {
			axios.get('https://cnodejs.org/api/v1//topics')
				.then((response) => {
					state.news = response.data.data
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
	//action就是触发mutations
	actions: {
		setChange(context, data) {
			context.commit('setCount', data)
			context.commit('settitle', data)
		},
		setNews(context, data) {
			context.commit('setNews')
		}
	}
})

new Vue({
	el: "#demo",
	template: `
		<router-view></router-view>
	`,
	router,
	store,
})