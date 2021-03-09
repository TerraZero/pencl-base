const PenclBoot = require('./src/Boot/PenclBoot');

module.exports = function boot(path = null, settings = {}) {
  module.exports = new PenclBoot(path, settings);
  return module.exports;
};