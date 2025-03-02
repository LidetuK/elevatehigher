// next.config.js
module.exports = {
    webpack: (config) => {
      config.resolve.modules.push('src')
      return config
    },
  }
  