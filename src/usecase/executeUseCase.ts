const { exec } = require("child_process");
export class ExecuteUseCase {
    execute(command: string, callback: (data: any) => void) {
      document.querySelector("#log-console").innerHTML += `$ ${command}\n`;
        exec(command, (error: any, data: any, getter: any) => {
            if (error) {
              console.log("execute error: ", error);
              document.querySelector("#log-console").innerHTML += error;
              return;
            }
            if (getter) {
              console.log("execute data: ", data);
              document.querySelector("#log-console").innerHTML += data;
              return;
            }
            console.log("data: ", data);
            document.querySelector("#log-console").innerHTML += data;
            callback(data);
          });
    }
}