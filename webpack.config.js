const path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  "mode": "none",
  "entry": {
    index: "./src/scripts.js",
    signin: "./src/signin.js"
  },
  "output": {
    "path": path.resolve(__dirname, '/dist'),
    "filename": "[name].[contenthash].js",
    // sourceMapFilename: "bundle.js.map"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './dist/signin.html',
      chunks: ['signin'],
      filename: 'signin.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
    },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  }
};
