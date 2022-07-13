const path = require("path");
const webpack = require("webpack"); // required because plugins is built into webpack
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
  ],
  mode: "development",
};
