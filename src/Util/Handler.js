module.exports = class Handler {

  constructor() {
    this.listeners = {};
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
  }

}