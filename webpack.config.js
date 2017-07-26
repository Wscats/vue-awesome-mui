//webpack 全局安装
//npm install webpack -g
module.exports = {
	//devtool:"source-map",
	//入口文件 相当于gulp.src 导入main.js
	entry: __dirname + "/app/main.js",
	//出口文件
	output: {
		//导出文件的名字
		filename: 'bundle.js',
		//导出的路径
		path: __dirname + "/public"
	},
	//配置加载器，这里是转换非JS文件类型的方法
	module: {
		loaders: [{
			//匹配对应的后缀文件类型
			//cnpm install style-loader css-loader
			test: /\.css$/,
			//用两个loader就用!隔开 style在css之前
			loader: "style-loader!css-loader"
		}, {
			test: /\.html$/,
			loader: "html-loader"
		}, {
			test: /\.(jpg|png|jpeg|gif)$/,
			loader: "url-loader"
		}, {
			//ES6^=>ES5
			test: /\.js$/,
			loader: "babel-loader",
			options: {
				"presets": [
					['es2015', {
						modules: false
					}]
				],
			}
		}, {
			//vue=>js
			test: /\.vue$/,
			loader: "vue-loader"
		}, {
			//vue=>js
			test: /\.scss$/,
			loader: "sass-loader"
		}, {
			//vue=>js
			test: /\.less$/,
			loader: "less-loader"
		}, {
			//ttf=>js
			test: /\.ttf$/,
			loader: "file-loader"
		}]
	},
	//加这一句
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	//webpackd的服务器
	devServer: {
		contentBase: "./public", //服务器需要加载的文件夹目录
		inline: true, //实时更新
		port: 12345,
	}
}