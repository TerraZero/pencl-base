const Boot = require('../../index');

module.exports = class PenclPlugin {

  /** @returns {string} */
  static get name() {}

  /** @returns {object} */
  static get config() {
    return {};
  }

  constructor() {
    this.config = Boot.getConfig(this.name, this.constructor.config);
    this.pencl = Boot.getConfig('pencl', {});
  }

  /** @returns {string} */
  get name() {
    return this.constructor.name;
  }

  /** @returns {boolean} */
  get debug() {
    return this.pencl.debug || this.config.debug || false;
  }

}