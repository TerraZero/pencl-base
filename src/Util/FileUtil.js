const Path = require('path');
const FS = require('fs');

module.exports = class FileUtil {

  static findFileRoot(path, file) {
    let root = path;
    while (root) {
      if (FS.existsSync(Path.join(root, file))) {
        return Path.join(root, file);
      }
      const parent = Path.join(root, '..');
      if (parent === root) break;
      root = parent;
    }
    return null;
  }

}