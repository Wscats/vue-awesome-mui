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
import accordion from "./components/examples/accordion.vue";

var router = new VueRouter({
	routes: [{
		path: '/index',
		component: index,
	}, {
		path: '/accordion',
		component: accordion,
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