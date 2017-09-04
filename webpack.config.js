module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './src/util',
  // Place output files in `./dist/my-app.js`
  output: {
    path: __dirname + '/public/dist',
    filename: 'awsUtils.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};