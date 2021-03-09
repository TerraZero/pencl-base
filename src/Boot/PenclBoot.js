const FileUtil = require("../Util/FileUtil");

module.exports = class PenclBoot {

  constructor(path = null, config = null) {
    this.path = path;
    this.config = null;

    if (this.path) {
      const file = FileUtil.findFileRoot(this.path, 'pencl.js');
      if (file) {
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

  getConfig(name, fallback = null) {
    return this.config[name] || fallback;
  }

}