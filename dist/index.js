"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
const path = require('path'), fs = require("fs");
const dcmtk_x64_1 = __importDefault(require("@caoshouse/dcmtk_x64"));
const dcmtk_x86_1 = __importDefault(require("@caoshouse/dcmtk_x86"));
/**
 * Determine whether the current platform is 64 bit.
 *
 * @returns {Boolean}
 */
function is64Bit() {
    return ['arm64', 'ppc64', 'x64', 's390x'].includes(os_1.default.arch());
}
class MyClass {
    constructor(BIN_DIR) {
        this.paths = {};
        this.BIN_DIR = BIN_DIR;
        fs.readdirSync(this.BIN_DIR).forEach(file => {
            var name = path.parse(file).name, ext = path.parse(file).ext;
            if (ext === '.exe') {
                this.registerCommand(name);
            }
        });
    }
    exec(command, params, callback) {
        if (!(command in this.paths)) {
            callback(new Error(this.constructor.name + ': Invalid command ' + command));
        }
        command = this.paths[command] + ' ' + params;
        try {
            return child_process_1.exec(command, callback);
            //return execSync(command).toString();
        }
        catch (e) {
            callback(e);
            return false;
        }
    }
    registerCommand(command) {
        if (fs.existsSync(this.BIN_DIR + '\\' + command + '.exe')) {
            this.paths[command] = this.BIN_DIR + '\\' + command + '.exe';
        }
        else {
            console.error('Cannot define command "' + command + '", binary does not exist');
        }
    }
    getCommandPath(command) {
        return this.paths[command];
    }
}
const dcmtk = new MyClass(is64Bit() ? dcmtk_x64_1.default : dcmtk_x86_1.default);
exports.default = dcmtk;
//# sourceMappingURL=index.js.map