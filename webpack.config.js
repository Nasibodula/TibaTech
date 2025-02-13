// module.exports = {
//     mode: 'development',  // or 'production'
//     entry: './src/index.js',
//     output: {
//       filename: 'bundle.js',
//       path: __dirname + '/dist',
//     },
//     resolve: {
//       extensions: ['.js', '.jsx'],
//         fallback: {
//           fs: false,
//           net: false,
//           tls: false,
//           http: require.resolve('stream-http'),
//           https: require.resolve('https-browserify'),
//           zlib: require.resolve('browserify-zlib'),
//           stream: require.resolve('stream-browserify'),
//           os: require.resolve('os-browserify/browser')
//         }
//       },
//     module: {
//       rules: [
//         {
//           test: /\.jsx?$/,  // Matches .js and .jsx files
//           exclude: /node_modules/,
//           use: [
//             {
//               loader: 'babel-loader',
//               options: {
//                 presets: ['@babel/preset-env', '@babel/preset-react'],
//               },
//             },
//             {
//               loader: 'style-loader', // This loader injects CSS into the DOM
//             },
//             {
//               loader: 'css-loader', // This loader handles CSS imports
//             }
//           ],
//         },
//       ],
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         }),
//       ],
//   };
  


const webpack = require('webpack');

module.exports = {
  // ... your other webpack config
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "net": false,
      "tls": false,
      "fs": false,
      "os": false,
      "path": false,
      "child_process": false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
};