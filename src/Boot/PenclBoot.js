const FileUtil = require("../Util/FileUtil");
const Path = require('path');

module.exports = class PenclBoot {

  constructor(path = null, config = null) {
    this.path = path;
    this.root = config && config.root || null;
    this.config = {};

    if (this.path) {
      const file = FileUtil.findFileRoot(this.path, 'pencl.json');
      if (file) {
        this.root = this.root || Path.dirname(file);
        this.config = require(file);
      }
    }
    if (config) {
      for (const index in config) {
        this.config[index] = config[index];
      }
    }
  }

  async boot() {
    
  }

  /**
   * @param {string} name 
   * @param {(Object|Array|String|Number)} fallback 
   * @returns {(Object|Array|String|Number)}
   */
  getConfig(name, fallback = null) {
    return this.config[name] || fallback;
  }

  /**
   * @param {string} path 
   * @returns {string}
   */
  getPath(path) {
    if (path.startsWith('~')) {
      return Path.join(this.root, (path.startsWith('~/') ? path.substring(2) : path.substring(1)));
    }
    return path;
  }

}