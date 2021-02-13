const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    swed_crs_transform: './src/index.ts',
  },  
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'dist',
    filename: '[name]_bundled_with_webpack.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'sweden_crs_transformations'
  },
};