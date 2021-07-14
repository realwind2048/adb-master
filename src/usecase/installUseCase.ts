import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();

export class InstallUseCase {
    install(device: string, apklocation: string) {
        executeUseCase.execute("adb install -r hahaha", (data) => {
            console.log(data);
        })
    }
}