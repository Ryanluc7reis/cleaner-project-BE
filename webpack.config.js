const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports ={
  entry: './src/index.js',
  target: 'node',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'index.js' 
  },
  resolve:{
    extensions: ['.js'],
  },
  plugins:[
    new NodemonPlugin()

  ],
  externals :[
    nodeExternals()
  ]

}