const { exec } = require("child_process");
export class ExecuteUseCase {
    execute(command: string, callback: (data: any) => void) {
      document.querySelector("#log-console").innerHTML += `$ ${command}\n`;
        exec(command, {maxBuffer: 1024 * 50000}, (error: any, data: any, getter: any) => {
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
            var textarea = document.getElementById('log-console');
            textarea.scrollTop = textarea.scrollHeight;
            callback(data);
          });
    }
    spawn(command: string, args: [string], callback: (data: any) => void) {
      var spawn = require('child_process').spawn;
      var cmd  = spawn('adb', args);
      var counter = 0;
      cmd.stdout.on('data', function(data: any) {
        counter ++;
        console.log('stdout: ' + data);
        document.querySelector("#log-console").innerHTML += data;
      });

      cmd.stderr.on('data', function(data: any) {
        console.log('stderr: ' + data);
        document.querySelector("#log-console").innerHTML += data;
      });

      cmd.on('exit', function(code: any) {
        console.log('exit code: ' + code);
        console.log(counter);
        document.querySelector("#log-console").innerHTML += code;
      });
    }
}