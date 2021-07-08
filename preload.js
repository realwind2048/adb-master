// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#get-devices').addEventListener('click', getDevices);
});

function getDevices() {
  console.log("getDevices");
  const { exec } = require("child_process");
  exec("adb devices", (error, data, getter) => {
    if (error) {
      console.log("error  22", error);
      return;
    }
    if (getter) {
      console.log("data 22", data);
      return;
    }
    console.log("data 33", data);
    document.querySelector("#result").innerText = data;
    document.querySelector("#log-console").innerText += data;
    saveDevices(data);
  });
}

var devices = [];
function saveDevices(sss) {
  var ks = sss.split(/\r?\n/);
  ks.forEach((element, index, arr) => {
    if (index >= 1 && element) {
      devices.push(element);
    }
  });
  console.log(devices);
}

function printLogs(sss) {
  var ks = sss.split(/\r?\n/);
  console.log(ks);
  console.log(ks[0]);
}
