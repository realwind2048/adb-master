import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();

export class InstallUseCase {
    install(device: string, apklocation: string) {
        const command = `adb -s ${device} install -r ${apklocation}`
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
}