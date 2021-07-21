import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();

export class LogUseCase {
    enable(device: string) {
        const command = `adb -s ${device} logcat`
        executeUseCase.spawn("adb", ['logcat'], (data) => {
            console.log(data);
        })
    }
    dump(device: string) {
        var today = new Date();
        var dateTime = today.toISOString();
        const command = `adb -s ${device} logcat -d > log-${device}-${dateTime}.txt`
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
}