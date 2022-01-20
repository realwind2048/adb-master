const { shell } = require('electron') // deconstructing assignment
const electron = require('electron')
import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();
export class LogUseCase {
    enable(device: string) {
        const command = `adb -s ${device} logcat`
        executeUseCase.spawn("adb", ['logcat'], (data) => {
            console.log(data);
        })
    }
    // adb -s emulator-5554 logcat -d -t '01-14 23:00:00.000' > 2022-01-15T14-19-55.234Z
    dump(device: string, os: string, logFromTime: string, logPath: string) {
        this.createLogPathIfNeeded(logPath);
        var today = new Date();
        var logTimeOption = "";
        if (logFromTime.length > 0) {
            logTimeOption = `-t ${logFromTime}`
        }
        console.log("logFromTime = " + logFromTime);
        var dateTime = today.toISOString();
        let filename = `log-${device}-${dateTime}.txt`;
        filename = filename.replace(/:/gi, "-");
        // TODO optimize
        // win32 == window
        // darwin == mac
        let command = `adb -s ${device} logcat -d ${logTimeOption}> '${logPath}${filename}'`;
        if (os == 'win32') {
            // command = `adb -s ${device} logcat -d | Out-File -FilePath ${filename}`
            command = `adb -s ${device} logcat -d ${logTimeOption} > '${logPath}${filename}'`;
        } else {
            command = `adb -s ${device} logcat -d ${logTimeOption} > '${logPath}${filename}'`
        }
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
    openLogPath(logPath: string) {
        this.createLogPathIfNeeded(logPath);
        shell.openPath(logPath) // Open the given file in the desktop's default manner.
    }
    createLogPathIfNeeded(logPath: string) {
        var fs = require('fs');
        var dir = logPath;

        if (!fs.existsSync(dir)) {
            console.log('createLogPath');
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}