/**
 * @callback handlerListener 
 * @param {import('./Handler')} handler
 * @param {string[]} events
 * @param {any[]} args
 */

module.exports = class Handler {

  constructor() {
    this.listeners = {};
    this.events = {};
  }

  /**
   * @param {(string|string[])} events
   * @param {function} listener 
   */
  on(events, listener) {
    if (!Array.isArray(events)) events = [events];
    for (const event of events) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(listener);
    }
  }

  /**
   * @param {(string|string[])} events
   * @param {function} listener 
   */
  once(events, listener) {
    listener.once = true;
    if (!Array.isArray(events)) events = [events];
    for (const event of events) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(listener);
    }
  }

  /**
   * @param {(string|string[])} events
   * @param {function} listener 
   */
  off(events, listener = null) {
    if (!Array.isArray(events)) events = [events];
    for (const event of events) {
      if (listener === null) {
        this.listeners[event] = {};
      } else {
        this.listeners[event] = this.listeners[event].filter((value) => {
          return value !== listener;
        });
      }
    }
  }

  /**
   * @param {(string|string[])} events 
   * @param  {...any} args 
   */
   async emit(events, ...args) {
    if (!Array.isArray(events)) events = [events];
    await this.execute('prepare', events, args);
    for (const event of events) {
      if (!this.listeners[event]) continue;
      for (const listener of this.listeners[event]) {
        await listener(...args);
        if (listener.once) {
          this.listeners[event][this.listeners[event].indexOf(listener)] = null;
        }
      }
      this.listeners[event] = this.listeners[event].filter((v) => v);
    }
    await this.execute('done', events, args);
  }

  /**
   * @param {(string|string[])} events 
   * @param  {...any} args 
   */
   emitSync(events, ...args) {
    if (!Array.isArray(events)) events = [events];
    this.execute('prepareSync', events, args);
    for (const event of events) {
      if (!this.listeners[event]) continue;
      for (const listener of this.listeners[event]) {
        listener(...args);
        if (listener.once) {
          this.listeners[event][this.listeners[event].indexOf(listener)] = null;
        }
      }
      this.listeners[event] = this.listeners[event].filter((v) => v);
    }
    this.executeSync('doneSync', events, args);
  }

  async execute(name, events, args) {
    if (!this.events[name]) return;
    for (const event of this.events[name]) {
      await event(this, events, args);
    }
  }

  executeSync(name, events, args) {
    if (!this.events[name]) return;
    for (const event of this.events[name]) {
      event(this, events, args);
    }
  }

  /**
   * @param {handlerListener} listener 
   */
  prepare(listener) {
    this.events['prepare'] = this.events['prepare'] || [];
    this.events['prepare'].push(listener);
  }

  /**
   * @param {handlerListener} listener 
   */
  prepareSync(listener) {
    this.events['prepareSync'] = this.events['prepareSync'] || [];
    this.events['prepareSync'].push(listener);
  }

  /**
   * @param {handlerListener} listener 
   */
  done(listener) {
    this.events['done'] = this.events['done'] || [];
    this.events['done'].push(listener);
  }

  /**
   * @param {handlerListener} listener 
   */
  doneSync(listener) {
    this.events['doneSync'] = this.events['doneSync'] || [];
    this.events['doneSync'].push(listener);
  }

}