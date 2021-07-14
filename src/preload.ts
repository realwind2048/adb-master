// preload.js
import { DeviceUseCase } from "./usecase/deviceUseCase.js";
import { InstallUseCase } from "./usecase/installUseCase.js";
const fixPath = require("fix-path")
const deviceUseCase = new DeviceUseCase(); 
const installUseCase = new InstallUseCase();

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }

    fixPath();
  })

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#get-devices').addEventListener('click', getDevices);
});

// add drag and drop events
document.addEventListener('drop', (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  console.log('File Path of dragged files: ', event.dataTransfer.files[0].path)
  installUseCase.install("aaaa", "/path/");
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