/// <reference types="node" />
declare class MyClass {
    BIN_DIR: any;
    paths: {};
    constructor(BIN_DIR: any);
    exec(command: string, params: string, callback?: (error: Error) => void): false | import("child_process").ChildProcess;
    registerCommand(command: string): void;
    getCommandPath(command: string): any;
}
declare const dcmtk: MyClass;
export default dcmtk;
