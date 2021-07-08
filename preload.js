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
  exec("adb devices -l", (error, data, getter) => {
    if (error) {
      console.log("error  22", error);
      return;
    }
    if (getter) {
      console.log("data 22", data);
      return;
    }
    console.log("data 33", data);
    document.querySelector("#log-console").innerText += data;
    saveDevices(data);
  });
}

var devices = [];
function saveDevices(sss) {
  var ks = sss.split(/\r?\n/);
  ks.forEach((element, index) => {
    if (index >= 1 && element) {
      devices.push(parseDevice(element));
    }
  });
  console.log(devices);
  // document.querySelector("#result").innerText = devices[0];
  var list = document.querySelector("#device-list");
  devices.forEach((e) => {
    var item = document.createElement('li');
    item.innerHTML = e.json();
    list.appendChild(item);
  })
}

function printLogs(sss) {
  var ks = sss.split(/\r?\n/);
  console.log(ks);
  console.log(ks[0]);
}

function parseDevice(deviceString) {
  var ls = deviceString.split(" ");
  var device = new Device();
  var index = 0;
  ls.forEach((element) => {
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

const Device = class {
  constructor(id, model) {
    this.id = id;
    this.model = model;
  }
  json() {
    return `${this.id} ${this.model}`;
  }
};
