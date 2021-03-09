module.exports = class PenclBoot {

  constructor(path, settings = {}) {
    this.path = path;
    this.settings = settings;
  }

  async boot() {
    
  }

  getConfig(name) {
    return this.settings[name] || null;
  }

}