module.exports = class Arrays {

  static unique(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }

}