const Boot = require('../../index');
const Reflection = require('../Util/Reflection');

module.exports = class PenclPlugin {

  /** @returns {string} */
  static get name() {}

  /** @returns {object} */
  static get config() {
    return {};
  }

  get LOG_DEBUG() {return 1;};
  get LOG_NOTICE() {return 2;};
  get LOG_WARNING() {return 3;};
  get LOG_ERROR() {return 4;};

  constructor() {
    this.config = Boot.getConfig(this.name, this.config);
    this.pencl = Boot.getConfig('pencl', {});

    Boot.hook('init', this);
  }

  get config() {
    return {};
  }

  /** @returns {string} */
  get name() {
    return this.constructor.name;
  }

  /** @returns {boolean} */
  get debug() {
    return this.pencl.debug || this.config.debug || false;
  }

  get logLevel() {
    return this.pencl.log_level || this.config.log_level || 2;
  }

  /**
   * 
   * @param {string} message 
   * @param {(object|Array)} placeholders 
   * @param {string} type 
   * @param {boolean} save 
   */
  log(message, placeholders = {}, type = PenclPlugin.LOG_NOTICE, save = true) {
    message = Reflection.replaceMessage(message, placeholders, '"');
    if (this.debug || type >= this.logLevel) {
      switch (type) {
        case PenclPlugin.LOG_DEBUG: 
          type = 'DEBUG';
          break;
        case PenclPlugin.LOG_NOTICE: 
          type = 'NOTICE';
          break;
        case PenclPlugin.LOG_WARNING: 
          type = 'WARNING';
          break;
        case PenclPlugin.LOG_ERROR: 
          type = 'ERROR';
          break;
      }
      console.log('[' + type + ']: ' + message);
    }
  }

}