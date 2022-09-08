const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode && "source-map";

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		port,
		open: true,
		hot: true,
	},
	entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.tsx")],
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
		filename: "js/[name].[contenthash].bundle.js",
		chunkFilename: "js/[id].[contenthash].js",
		assetModuleFilename: "assets/[hash][ext]",
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	resolve: {
		extensions: [".json", ".jsx", ".tsx", ".ts", ".js", ".mjs"],
		alias: {
			"@": path.resolve(__dirname, "src/"),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].bundle.css",
		}),
		new Dotenv(),
		new CleanWebpackPlugin(),
		new StylelintPlugin({
			files: ["**/*.{css,sss,less,scss,sass}"],
		}),
		new ESLintPlugin({
			extensions: ["ts", "tsx"],
			exclude: ["/node_modules/", "/.idea/", "/.vscode/"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							esModule: true,
							importLoaders: 1,
							modules: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("postcss-preset-env")],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.woff2?$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name].[ext]",
				},
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg|eot|ttf)$/i,
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
				type: "asset/resource",
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.m?jsx?$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
};
