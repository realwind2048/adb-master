import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();

export class LogUseCase {
    enable(device: string) {
        const command = `adb -s ${device} logcat`
        executeUseCase.spawn("adb", ['logcat'], (data) => {
            console.log(data);
        })
    }
    dump(device: string, os: string) {
        var today = new Date();
        var dateTime = today.toISOString();
        let filename = `log-${device}-${dateTime}.txt`;
        filename = filename.replace(/:/gi, "-");
        let command = `adb -s ${device} logcat -d > ${filename}`;
        // TODO optimize
        // win32 == window
        // darwin == mac
        if (os == 'win32') {
            // command = `adb -s ${device} logcat -d | Out-File -FilePath ${filename}`
            command = `adb -s ${device} logcat -d > ${filename}`;
        } else {
            command = `adb -s ${device} logcat -d > ${filename}`
        }
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
}