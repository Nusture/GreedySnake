const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // 入口
  entry: "./src/main.ts",
  // 输出
  output: {
    // 文件的输出路径
    // __dirname nodejs的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),
    filename: "js/main.js", // 将 js 文件输出到 dist 目录中
    clean: true, // 自动清空上次打包的目录
    // 让webpack不使用箭头函数
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.ts$/i, // 只检测xxx文件
        exclude: /node_modules/, // 排除node_modules代码不编译
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 知道corejs版本
                    corejs: "3",
                    // 使用corejs的方式 usage表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ], // 执行顺序从后往前
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset", // 处理图片
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会转成base64
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
    ],
  },
  // 插件
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
    }),
    new CssMinimizerWebpackPlugin(),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".js"],
  },
  mode: "development", // 设置mode
};
