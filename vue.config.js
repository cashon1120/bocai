module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.70.100:8082',
        ws: true,
        changeOrigin:true,//允许跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
};