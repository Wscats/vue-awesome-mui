# vue-awesome-mui
[![npm package](https://img.shields.io/npm/v/vue-awesome-mui.svg)](https://www.npmjs.com/package/vue-awesome-mui)
[![NPM downloads](http://img.shields.io/npm/dm/vue-awesome-mui.svg)](https://www.npmjs.com/package/vue-awesome-mui)
<a href="https://github.com/Wscats/vue-awesome-mui"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats/vue-awesome-mui"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>

> Design Mui library for Vuejs 2.x

## Links
* [Demo Page](https://wscats.github.io/vue-awesome-mui/public/#/index)
* [Mui中文文档](http://dev.dcloud.net.cn/mui/ui/)

## Install

Install vue-awesome-mui
```bash
npm install vue-awesome-mui -save
```

## Get Started

Vue mount

```javascript
// import or require
import Vue from 'vue'
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
// mount with global
Vue.use(Mui)
```

If you need icon, you can require `icon.css`
```javascript
import "vue-awesome-mui/mui/examples/hello-mui/css/icons-extra.css";
```

## Example

|Vue components|Mui document|
|-|-|
|[折叠面板](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/accordion.vue)|[Accordion](http://dev.dcloud.net.cn/mui/ui/#accordion)|
|[操作表](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/actionsheet.vue)|[Actionsheet](http://dev.dcloud.net.cn/mui/ui/#actionsheet)|
|[数字角标](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/badges.vue)|[Badges](http://dev.dcloud.net.cn/mui/ui/#badges)|
|[按钮](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/buttons.vue)|[Buttons](http://dev.dcloud.net.cn/mui/ui/#buttons)|
|[带图标按钮](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/buttons-with-icons.vue)|[Buttons](http://dev.dcloud.net.cn/mui/ui/#buttons)|
|[带数字按钮](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/buttons-with-badges.vue)|[Buttons](http://dev.dcloud.net.cn/mui/ui/#buttons)|
|[块级按钮](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/buttons-with-block.vue)|[Buttons](http://dev.dcloud.net.cn/mui/ui/#buttons)|
|[加载中按钮](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/buttons-with-loading.vue)|[Buttons](http://dev.dcloud.net.cn/mui/ui/#buttons)|
|[卡片视图](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/card.vue)|[Card](http://dev.dcloud.net.cn/mui/ui/#card)|
|[复选框](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/checkbox.vue)|[Checkbox](http://dev.dcloud.net.cn/mui/ui/#checkbox)|
|[日期时间](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/dtpicker.vue)|[Dtpicker](http://dev.dcloud.net.cn/mui/ui/#dtpicker)|
|[消息框](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/dialog.vue)|[Dialog](http://dev.dcloud.net.cn/mui/ui/#dialog)|
|[图片轮播](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/slider-default.vue)|[Slider](http://dev.dcloud.net.cn/mui/ui/#gallery)|
|[图片轮播-标题](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/slider-with-title.vue)|[Slider](http://dev.dcloud.net.cn/mui/ui/#gallery)|
|[图文表格](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/slider-table-default.vue)|[Slider](http://dev.dcloud.net.cn/mui/ui/#gallery)|
|[9宫格](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/grid-default.vue)|[Grid](http://dev.dcloud.net.cn/mui/ui/#grid)|
|[9宫格-分页](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/grid-pagination.vue)|[Grid](http://dev.dcloud.net.cn/mui/ui/#grid)|
|[图标](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/icons.vue)|[Icon](http://dev.dcloud.net.cn/mui/ui/#icon)|
|[扩展图标](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/icons-extra.vue)|[Icon](http://dev.dcloud.net.cn/mui/ui/#icon)|
|[输入框](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/input.vue)|[Input](http://dev.dcloud.net.cn/mui/ui/#input)|
|[列表](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/list.vue)|[List](http://dev.dcloud.net.cn/mui/ui/#list)|
|[图文列表](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/media-list.vue)|[Media List](http://dev.dcloud.net.cn/mui/ui/#medialist)|
|[导航栏](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/nav.vue)|[Navbar](http://dev.dcloud.net.cn/mui/ui/#navbar)|
|[透明导航栏](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/nav_transparent.vue)|[Navbar](http://dev.dcloud.net.cn/mui/ui/#navbar)|
|[数字输入框](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/numbox.vue)|[Numbox](http://dev.dcloud.net.cn/mui/ui/#numbox)|
|[侧滑导航](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/offcanvas.vue)|[Off Canvas](http://dev.dcloud.net.cn/mui/ui/#offcanvas)|
|[分页](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/pagination.vue)|[Pagination](http://dev.dcloud.net.cn/mui/ui/#pagination)|
|[弹出菜单](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/popover.vue)|[Popover](http://dev.dcloud.net.cn/mui/ui/#popover)|
|[进度条](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/progressbar.vue)|[Progress Bar](http://dev.dcloud.net.cn/mui/ui/#progressbar)|
|[单选框](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/radio.vue)|[Radio](http://dev.dcloud.net.cn/mui/ui/#radio)|
|[滑块](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/range.vue)|[Range](http://dev.dcloud.net.cn/mui/ui/#range)|
|[开关](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/switch.vue)|[Switch](http://dev.dcloud.net.cn/mui/ui/#switch)|
|[选项卡](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/tabbar.vue)|[Tab Bar](http://dev.dcloud.net.cn/mui/ui/#tabbar)|
|[文字](https://github.com/Wscats/vue-awesome-mui/blob/master/app/components/examples/typography.vue)|[Typography](http://dev.dcloud.net.cn/mui/ui/#typography)|

## Browser Support

* IE 10+
* Andorid 4.4+
* IOS 7+

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/Wscats/vue-awesome-mui).

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/Wscats/vue-awesome-mui) before making a pull request.

## Dependencies

* [vuejs 2.x](https://vuejs.org/)
* [mui 3.5](https://github.com/dcloudio/mui)

## Licence

vue-awesome-mui is open source and released under the MIT Licence.

Copyright (c) 2017 [Wscats](https://github.com/Wscats)

## About author

* [Github](https://github.com/Wscats)
* [Segmentfault](https://segmentfault.com/u/enoy)
* [CSDN](http://blog.csdn.net/qq_27080247)
* [Juejin](https://juejin.im/user/584c7f44ac502e0069275cd7)
