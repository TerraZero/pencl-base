const Boot = require('../../index');

module.exports = class PenclPlugin {

  /** @returns {string} */
  static get name() {}

  /** @returns {object} */
  static get config() {}

  constructor() {
    this._config = Boot.getConfig(this.name) || this.constructor.config;
  }

  get name() {
    return this.constructor.name;
  }

  get config() {
    return this._config;
  }

}