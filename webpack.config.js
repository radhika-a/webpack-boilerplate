const path = require("path");
const glob = require("glob");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const templatesList = require("./template-entry")

const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];

//Set output option based on environment
function getOutput(env) {
  if (env && env.dev) {
    return {
      publicPath: "/build/",
      filename: "[name].js",
      path: path.resolve(__dirname, "./build")
    };
  } else {
    return {
      path: path.resolve(__dirname, "../ui.apps/src/main/content/jcr_root/apps/rmit/clientlibs/clientlib-site/"),
      publicPath: "",
      filename: "js/index.min.js",
      libraryTarget: "umd"
    };
  }
}


function getPlugins(env) {
  plugins.push(new CleanWebpackPlugin());

  if (env && env.dev) {
    templatesList.map(function(item){
      plugins.push(
        new HtmlWebpackPlugin({
          template: item.path,
          filename: item.filename
        })
      )
    });


    plugins.push(
      new BrowserSyncPlugin({
        host: "localhost",
        port: 9001,
        server: { baseDir: ["build/"] }
      })
    );

    plugins.push(new CopyWebpackPlugin([{ from: "./templates/", to: "./" },{from:"./assets/",to:"./assets/"}]));
  }

  plugins.push(
    new MiniCssExtractPlugin({
        filename: "css/[name].min.css",
        chunkFilename: "[id].css"
      })
  );

  return plugins;
}

module.exports = function(env) {
  const config = {
    mode: "development",
    entry: {
        index: require("./main.js"), // This is to compile component specific scss files
      },
    output: getOutput(env),
    module: {
      rules: [
        {
            test: /\.(less)$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [require('autoprefixer')]
                }
              },
              "less-loader"
            ]
          },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["es2015"]
            }
          }
      },

      {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true,
              attrs: [':data-src']
            }
          }
        }
      ]
    },
    optimization: env && env.prod ? {
                    minimize: true,
                    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
                  } : {},
    plugins: getPlugins(env),
    resolve: {
      alias: {
        vue: "vue/dist/vue.js"
      }
    },
    devtool: env && env.dev ? "inline-source-map" : false
  };
  return config;
};
