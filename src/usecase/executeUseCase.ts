const { exec } = require("child_process");
export class ExecuteUseCase {
    execute(command: string, callback: (data: any) => void) {
        exec(command, (error: any, data: any, getter: any) => {
            if (error) {
              console.log("error  22", error);
              return;
            }
            if (getter) {
              console.log("data 22", data);
              return;
            }
            console.log("data 33", data);
            callback(data);
          });
    }
}