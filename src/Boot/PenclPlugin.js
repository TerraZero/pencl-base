const Boot = require('../../index');

module.exports = class PenclPlugin {

  /** @returns {string} */
  static get name() {}

  /** @returns {object} */
  static get config() {}

  constructor() {
    this._config = Boot.getConfig(this.name) || this.constructor.config;
  }

  /** @returns {string} */
  get name() {
    return this.constructor.name;
  }

  /** @returns {object} */
  get config() {
    return this._config;
  }

  /** @returns {boolean} */
  get debug() {
    return Boot.getConfig('system', {}).debug || this.config.debug || false;
  }

}