const PenclError = require('./src/Error/PenclError');
const PenclBoot = require('./src/Boot/PenclBoot');

let instance = null;

module.exports = function boot(path = null) {
  if (instance === null && path === null) throw new PenclError('Use of instance without path givin as init is not allowed. Please check your boot chain.');
  if (instance === null) {
    instance = new PenclBoot(path);
  }
  return instance;
};