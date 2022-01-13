const { shell } = require('electron') // deconstructing assignment
const electron = require('electron')
import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();
let logPath = "./logs/"
export class LogUseCase {
    enable(device: string) {
        const command = `adb -s ${device} logcat`
        executeUseCase.spawn("adb", ['logcat'], (data) => {
            console.log(data);
        })
    }
    dump(device: string, os: string) {
        this.createLogPathIfNeeded();
        var today = new Date();
        var dateTime = today.toISOString();
        let filename = `log-${device}-${dateTime}.txt`;
        filename = filename.replace(/:/gi, "-");
        // TODO optimize
        // win32 == window
        // darwin == mac
        let command = `adb -s ${device} logcat -d > ${logPath}${filename}`;
        if (os == 'win32') {
            // command = `adb -s ${device} logcat -d | Out-File -FilePath ${filename}`
            command = `adb -s ${device} logcat -d > ${logPath}${filename}`;
        } else {
            command = `adb -s ${device} logcat -d > ${logPath}${filename}`
        }
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
    openLogPath() {
        this.createLogPathIfNeeded();
        shell.openPath(logPath) // Open the given file in the desktop's default manner.
    }
    createLogPathIfNeeded() {
        var fs = require('fs');
        var dir = logPath;

        if (!fs.existsSync(dir)){
            console.log('createLogPath');
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}