import { ExecuteUseCase } from "./executeUseCase";
let executeUseCase = new ExecuteUseCase();

export class InstallUseCase {
    install(device: string, apklocation: string) {
        var options = ""
        if ($('#check-reinstall').prop('checked')) {
            options += " -r";
        }
        if ($('#check-test').prop('checked')) {
            options += " -t";
        }
        const command = `adb -s ${device} install${options} ${apklocation}`
        executeUseCase.execute(command, (data) => {
            console.log(data);
        })
    }
}