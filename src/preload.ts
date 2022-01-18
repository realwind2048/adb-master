// preload.js
import { DeviceUseCase } from "./usecase/deviceUseCase.js";
import { InstallUseCase } from "./usecase/installUseCase.js";
import { LogUseCase } from "./usecase/logUseCase.js";
const fixPath = require("fix-path")
const deviceUseCase = new DeviceUseCase(); 
const installUseCase = new InstallUseCase();
const logUseCase = new LogUseCase();
var os: string

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    fixPath();
    distinguishOS();
    getDevices();
  })

const { ipcRenderer } = require('electron')

process.once('loaded', () => {
  window.addEventListener('message', evt => {
    if (evt.data.type === 'select-dirs') {
      ipcRenderer.send('select-dirs')
    }
  })
})

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#get-devices').addEventListener('click', getDevices);
  document.querySelector('#dump-log').addEventListener('click', dumpLog);
  document.querySelector('#open-log-location').addEventListener('click', openLogLocation);
  document.querySelector('#adb-install-area').addEventListener('drop', dropHandler, false);
  document.querySelector('#adb-install-area').addEventListener('dragover', dragOverHandler, false);
});

// // add drag and drop events
// document.addEventListener('drop', (event: DragEvent) => {
//   event.preventDefault();
//   event.stopPropagation();
//   let filepath = event.dataTransfer.files[0].path
//   console.log('File Path of dragged files: ', filepath)

//   var sel = document.getElementById("device-list") as HTMLSelectElement;
//   var text= sel.options[sel.selectedIndex].value;
//   installUseCase.install(text, filepath);
// });

// document.addEventListener('dragover', (e) => {
//   e.preventDefault();
//   e.stopPropagation();
// });

// document.addEventListener('dragenter', (event) => {
//   console.log('File is in the Drop Space');
// });

// document.addEventListener('dragleave', (event) => {
//   console.log('File has left the Drop Space');
// });

function distinguishOS() {
  os = process.platform;
  console.log("distinguishOS os = " + os);
}
function getDevices() {
  console.log("getDevices");
  deviceUseCase.getDevices();
}

function dumpLog() {
  console.log("dumpLog");
  var sel = document.getElementById("device-list") as HTMLSelectElement;
  var text= sel.options[sel.selectedIndex].value;

  var today = new Date();
  var logfromTime = "";
  if ($('#check-select-time-all').prop('checked')) {
    logfromTime = "";
  } else if ($('#check-select-time-1-hour').prop('checked')) {
    var calculatedTime = new Date(today.getTime() - 1 * 60 * 60 * 1000);
    logfromTime = `'${calculatedTime.getMonth() + 1}-${calculatedTime.getDate()} ${calculatedTime.getHours()}:${calculatedTime.getMinutes()}:${calculatedTime.getSeconds()}.${calculatedTime.getUTCMilliseconds()}'`
  } else if ($('#check-select-time-10-minutes').prop('checked')) {
    var calculatedTime = new Date(today.getTime() - 10 * 60 * 1000);
    logfromTime = `'${calculatedTime.getMonth() + 1}-${calculatedTime.getDate()} ${calculatedTime.getHours()}:${calculatedTime.getMinutes()}:${calculatedTime.getSeconds()}.${calculatedTime.getUTCMilliseconds()}'`
  }
  logUseCase.dump(text, os, logfromTime);
}

function openLogLocation() {
  console.log("openLogLocation");
  logUseCase.openLogPath();
}

function dropHandler(ev: any) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);

        installApk(ev, i);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].path);

      installApk(ev, i);
    }
  }
}

function installApk(ev: any, i: number) {
  let filepath = ev.dataTransfer.files[i].path;
  console.log('File Path of dragged files: ', filepath);

  var sel = document.getElementById("device-list") as HTMLSelectElement;
  var text = sel.options[sel.selectedIndex].value;
  installUseCase.install(text, filepath);
}

function dragOverHandler(ev: Event) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}