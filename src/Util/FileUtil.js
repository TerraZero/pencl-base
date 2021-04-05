const Path = require('path');
const FS = require('fs');

/**
 * @callback copyCallback
 * @param {string} from
 * @param {string} to
 * @param {boolean} isDir
 */

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

  /**
   * @param {string} from 
   * @param {string} to 
   * @param {copyCallback} callback
   */
  static copyPath(from, to, callback = null) {
    if (FS.statSync(from).isFile()) {
      if (callback) callback(Path.join(to, Path.basename(from)), from, false);
      FS.writeFileSync(Path.join(to, Path.basename(from)), FS.readFileSync(from));
    }
    const files = FS.readdirSync(from);
    for (const file of files) {
      const path = Path.join(from, file);
      const toPath = Path.join(to, file);

      if (FS.statSync(path).isDirectory()) {
        if (callback) callback(path, toPath, true);
        FS.mkdirSync(toPath);
        FileUtil.copyPath(path, toPath);
      } else {
        if (callback) callback(path, toPath, false);
        FS.writeFileSync(toPath, FS.readFileSync(path));
      }
    }
  }

}