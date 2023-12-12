import { container } from 'webpack';
const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    uniqueName: 'mdmfprofile',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'profile',
      filename: 'remoteEntry.js',
      remotes: {
        list_user: `list_user@http://localhost:4202/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom/client': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
