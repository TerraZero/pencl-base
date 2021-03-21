const FileUtil = require("../Util/FileUtil");
const Path = require('path');
const Handler = require('events');

module.exports = class PenclBoot {

  constructor(path = null, config = null) {
    this.path = path;
    this.root = config && config.root || null;
    this.config = {};
    this.handler = new Handler();

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
    const config = this.getConfig('pencl', {});
    if (Array.isArray(config.modules)) {

      for (const module of config.modules) {
        try {
          require(module + '/pencl.hook')(this);
        } catch (e) {}
      }
    }
    await this.trigger('boot', this);
  }

   /**
   * @param {(string|array)} events 
   * @param  {...any} args 
   * @returns {this}
   */
  triggerSync(events, ...args) {
    if (typeof events === 'string') events = [events];
    for (const event of events) {
      this.handler.emit(event, ...args);
    }
    return this;
  }

  /**
   * @param {(string|array)} events 
   * @param  {...any} args 
   * @returns {Promise<this>}
   */
  async trigger(events, ...args) {
    if (typeof events === 'string') events = [events];
    for (const event of events) {
      await (new Promise((resolve) => {
        this.handler.once(event, resolve);
        this.handler.emit(event, ...args);
      }));
    }
    return this;
  }

  /**
   * @param {string} hook
   * @param {import('./PenclPlugin')} plugin 
   * @param {...*} args
   * @returns {Promise<this>}
   */
  async hook(hook, plugin, ...args) {
    return this.trigger([hook + ':' + plugin.name, hook], plugin, ...args);
  }

  /**
   * @param {string} event 
   * @param {function} listener 
   * @returns {this}
   */
  on(event, listener) {
    this.handler.on(event, listener);
    return this;
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