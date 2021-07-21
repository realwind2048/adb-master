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
        const command = `adb -s ${device} logcat -d > log.txt`
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
}