module.exports = class Arrays {

  static unique(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }

  static remove(array, item) {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }

  static removeAll(array, item) {
    let index = 0;
    while ((index = array.indexOf(item)) !== -1) {
      array.splice(index, 1);
    }
    return array;
  }

}