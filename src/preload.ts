// preload.js
import { DeviceUseCase } from "./usecase/deviceUseCase.js";
import { InstallUseCase } from "./usecase/installUseCase.js";
import { LogUseCase } from "./usecase/logUseCase.js";
const fixPath = require("fix-path")
const deviceUseCase = new DeviceUseCase(); 
const installUseCase = new InstallUseCase();
const logUseCase = new LogUseCase();

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    fixPath();
    getDevices();
  })

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#get-devices').addEventListener('click', getDevices);
  document.querySelector('#dump-log').addEventListener('click', dumpLog);
});

// add drag and drop events
document.addEventListener('drop', (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  let filepath = event.dataTransfer.files[0].path
  console.log('File Path of dragged files: ', filepath)

  var sel = document.getElementById("device-list") as HTMLSelectElement;
  var text= sel.options[sel.selectedIndex].value;
  installUseCase.install(text, filepath);
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// document.addEventListener('dragenter', (event) => {
//   console.log('File is in the Drop Space');
// });

// document.addEventListener('dragleave', (event) => {
//   console.log('File has left the Drop Space');
// });

function getDevices() {
  console.log("getDevices");
  deviceUseCase.getDevices();
}

function dumpLog() {
  console.log("dumpLog");
  var sel = document.getElementById("device-list") as HTMLSelectElement;
  var text= sel.options[sel.selectedIndex].value;
  logUseCase.dump(text);
}