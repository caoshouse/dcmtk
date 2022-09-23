
import Os from 'os'
import { exec } from 'child_process'
const path = require('path'), fs = require("fs")
import binPath64 from "@caoshouse/dcmtk_x64"

import binPath86 from "@caoshouse/dcmtk_x86"
/**
 * Determine whether the current platform is 64 bit.
 *
 * @returns {Boolean}
 */
function is64Bit() {
  return ['arm64', 'ppc64', 'x64', 's390x'].includes(Os.arch())
}

class MyClass {
  BIN_DIR
  paths = {}

  constructor(BIN_DIR) {
    this.BIN_DIR = BIN_DIR
    fs.readdirSync(this.BIN_DIR).forEach(file => {
      var name = path.parse(file).name,
        ext = path.parse(file).ext;
      if (ext === '.exe') {
        this.registerCommand(name);
      }
    });
  }

  exec(command: string, params: string, callback?: (error: Error) => void) {
    if (!(command in this.paths)) {
      callback(new Error(this.constructor.name + ': Invalid command ' + command));
    }
    command = this.paths[command] + ' ' + params;
    try {
      return exec(command, callback)
      //return execSync(command).toString();
    } catch (e) {
      callback(e);
      return false;
    }
  }

  registerCommand(command: string) {
    if (fs.existsSync(this.BIN_DIR + '\\' + command + '.exe')) {
      this.paths[command] = this.BIN_DIR + '\\' + command + '.exe'
    } else {
      console.error('Cannot define command "' + command + '", binary does not exist')
    }
  }

  getCommandPath(command: string) {
    return this.paths[command];
  }
}

const dcmtk = new MyClass(is64Bit() ? binPath64 : binPath86);
export default dcmtk;
