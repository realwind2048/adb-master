import { ExecuteUseCase } from "./executeUseCase";
var executeUseCase = new ExecuteUseCase();

export class DeviceUseCase {
    getDevices() {
        console.log("getDevices");
        executeUseCase.execute("adb devices -l", (data) => {
          document.querySelector("#log-console").innerHTML += data;
          this.saveDevices(data);
        });
      }
    
    parseDevice(deviceString: string): Device {
        let ls = deviceString.split(" ");
        let device = new Device();
        let index = 0;
        ls.forEach((element: string) => {
          if (element) {
            if (index == 0) {
              device.id = element;
            } else if (element.startsWith("model:")) {
              var colonIdx = element.indexOf(":");
              device.model = element.slice(colonIdx + 1);
            }
            index++;
            console.log(element);
          }
        });
        return device;
      }
    saveDevices(sss: string) {
      var devices: Array<Device> = [];
      var ks = sss.split(/\r?\n/);
      devices = [];
      ks.forEach((element: any, index: number) => {
        if (index >= 1 && element) {
          devices.push(this.parseDevice(element));
        }
      });
      console.log(devices);
      // document.querySelector("#result").innerText = devices[0];
      var list = document.querySelector("#device-list");
      while (list.firstChild) {
        list.removeChild(list.lastChild);
      }
      devices.forEach((e) => {
        var item = document.createElement('option');
        item.value = e.id;
        item.innerHTML = e.json();
        list.appendChild(item);
      })
    }

}
  
  class Device {
    id: string;
    model: string;
    
    json() {
      return `${this.id} ${this.model}`;
    }
  };