const PenclBoot = require('./src/Boot/PenclBoot');

module.exports = function boot(path = null) {
  module.exports = new PenclBoot(path);
  return module.exports;
};