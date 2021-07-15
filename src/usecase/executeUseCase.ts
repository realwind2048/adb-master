const { exec } = require("child_process");
export class ExecuteUseCase {
    execute(command: string, callback: (data: any) => void) {
        exec(command, (error: any, data: any, getter: any) => {
            if (error) {
              console.log("execute error: ", error);
              return;
            }
            if (getter) {
              console.log("execute data: ", data);
              return;
            }
            console.log("data: ", data);
            callback(data);
          });
    }
}