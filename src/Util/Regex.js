module.exports = class Regex {

  /**
   * @param {string} string 
   * 
   * @returns {string}
   */
  static escape(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  /**
   * @param {string} pattern 
   * 
   * @returns {RegExp}
   */
  static wildRegex(pattern) {
    return new RegExp('^' + this.escape(pattern).replace(/\\\*/g, '(.*)') + '$', 'g');
  }

  /**
   * @param {(RegExp|string)} pattern 
   * @param {string} string 
   * 
   * @returns {array}
   */
  static wildMatch(pattern, string) {
    if (typeof pattern === 'string') {
      pattern = this.wildRegex(pattern);
    }
    pattern.lastIndex = 0;

    const match = [];
    const matches = pattern.exec(string);

    if (matches !== null) {
      for (const index in matches) {
        if (parseInt(index) === 0 || Number.isNaN(parseInt(index))) continue;
        match.push(matches[index]);
      }
    }
    return match;
  }

  /**
   * @param {(RegExp|string)} pattern 
   * @param {string} string 
   * 
   * @returns {boolean}
   */
  static wildTest(pattern, string) {
    if (typeof pattern === 'string') {
      pattern = this.wildRegex(pattern);
    }
    pattern.lastIndex = 0;
    return pattern.test(string);
  }

}