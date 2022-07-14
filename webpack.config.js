const path = require("path");
const webpack = require("webpack"); // required because plugins is built into webpack
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
   
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    static: {
        directory: path.join(__dirname, ''),
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        // This object will identify the type of files to pre-process 
        // using the test property to find a regular expression, or regex. 
        // In our case, we are trying to process any image file with the file 
        // extension of .jpg. We could expand this expression to also search for 
        // other image file extensions such as .png, .svg, or .gif.
        test: /\.jpg$/i,
        // where the actual loader is implemented
        use: [
          {
            loader: 'file-loader',
            options: {
              // returns the name of the file with the file extension.
              esModule: false,
              name(file) {
                return "[path][name].[ext]"
              },
              // a function that changes our assignment URL by replacing the ../ from 
              // our require() statement with /assets/
              publicPath: function(url) {
                return url.replace("../", "/assets/")
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    }),
  ],
  mode: "development",
};


// npm run start:dev
// npx serve ./