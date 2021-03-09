const FileUtil = require("../Util/FileUtil");

module.exports = class PenclBoot {

  constructor(path, settings = null) {
    this.path = path;

    if (settings) {
      this.config = settings;
    } else {
      const file = FileUtil.findFileRoot(this.path, 'pencl.js');
      if (file) {
        this.config = require(file);
      }
    }
  }

  async boot() {
    
  }

  getConfig(name) {
    return this.settings[name] || null;
  }

}