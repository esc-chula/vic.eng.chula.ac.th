const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const axios = require('axios')

export default {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules = [{
      oneOf: [
        defaultLoaders.jsLoader,
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.svg$/,
          use: [
            "babel-loader",
            {
              loader: "react-svg-loader",
              options: {
                svgo: {
                  plugins: [
                    { removeTitle: false }
                  ],
                  floatPrecision: 2
                }
              }
            }
          ]
        },
        defaultLoaders.fileLoader,
      ]
    }]
    if(Object.getPrototypeOf(config.plugins[config.plugins.length - 1]).constructor.name === "UglifyJsPlugin"){
      console.log("Replace default UglifyJsPlugin with uglifyjs-webpack-plugin")
      config.plugins[config.plugins.length - 1] = new UglifyJSPlugin()
    }
    config.plugins.push(new ExtractTextPlugin("styles.css"))
    return config;
  },
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => ([
    {
      path: '/',
      component: 'src/containers/Home',
    },
    {
      path: '/VIC2017',
      component: 'src/containers/camp_history/VIC_2017',
    },
    {
      path: '/VIC2018',
      component: 'src/containers/camp_history/VIC_2018',
    },
    {
      path: '/about',
      component: 'src/containers/About',
    },
    {
      path: '/article/1',
      component: 'src/containers/article/1',
    },
    {
      is404: true,
      component: 'src/containers/404',
    },
  ])
}
