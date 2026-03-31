// Vue framework
import Vue from "vue";
// Router
import VueRouter from 'vue-router';
// State management
import Vuex from 'vuex';
// HTTP client
import axios from "axios";

import Mui from "vue-awesome-mui";
import "vue-awesome-mui/mui/dist/css/mui.css";
Vue.use(Mui);

Vue.use(Vuex);
// Install router plugin
Vue.use(VueRouter);
// Mount axios on Vue prototype
Vue.prototype.$ajax = axios;

// Import components
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
import card from "./components/examples/card.vue";
import checkbox from "./components/examples/checkbox.vue";
//D
import dtpicker from "./components/examples/dtpicker.vue";
import dialog from "./components/examples/dialog.vue";
//S
import sliderDefault from "./components/examples/slider-default.vue";
import sliderTableDefault from "./components/examples/slider-table-default.vue";
import sliderWithTitle from "./components/examples/slider-with-title.vue";
//G
import gridDefault from "./components/examples/grid-default.vue";
import gridPagination from "./components/examples/grid-pagination.vue";
//I
import icons from "./components/examples/icons.vue";
import iconsExtra from "./components/examples/icons-extra.vue";
import input from "./components/examples/input.vue";
import mediaList from "./components/examples/media-list.vue";
//N
import nav from "./components/examples/nav.vue";
import navTransparent from "./components/examples/nav_transparent.vue";
import numbox from "./components/examples/numbox.vue";

const router = new VueRouter({
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
		path: '/mediaList',
		component: mediaList,
	}, {
		path: '/nav',
		component: nav,
	}, {
		path: '/navTransparent',
		component: navTransparent,
	}, {
		path: '/numbox',
		component: numbox,
	}, {
		path: '/',
		redirect: '/index'
	}]
});

// Create Vuex store
const store = new Vuex.Store({
	state: {
		count: 1,
		title: "Title",
		search: "",
		news: null,
		imgUrl: null,
		isShowGallery: false,
		direction: "left"
	},
	getters: {
		getCount(state) {
			return state.count + "ed"
		}
	},
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
					// Error handled silently
				});
		}
	},
	// Actions trigger mutations
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
