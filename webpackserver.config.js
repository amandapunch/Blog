const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  entry: {
    server: './src/server/server.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'components': path.resolve(__dirname, '/components')
    }      
},
  node: {
    __dirname: false,   
    __filename: false,  
  },
  externals: [nodeExternals()], 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }

  
}
