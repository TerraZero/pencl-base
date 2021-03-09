const PenclBoot = require('./src/Boot/PenclBoot');

module.exports = function boot(path = null, config = null) {
  module.exports = new PenclBoot(path, config);
  return module.exports;
};