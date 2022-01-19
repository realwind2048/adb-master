// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
const bootstrap = require('bootstrap');
const $ = require('jquery');
const { ipcRenderer } = require('electron')

// bootstrap tab
var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl: { addEventListener: (arg0: string, arg1: (event: any) => void) => void }) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event: { preventDefault: () => void }) {
    event.preventDefault()
    tabTrigger.show()
  })
})

// adb install command option checkbox
$('#check-reinstall').change(function() {
  setCheck($('#adb-install-command-option-r'), $(this).prop('checked'))
})
$('#check-test').change(function() {
  console.log($.type($('#check-test')));
  setCheck($('#adb-install-command-option-t'), $(this).prop('checked'))
})

function setCheck(checkbox: HTMLFormElement, bool: Boolean) {
  console.log($.type(checkbox))
  if (bool) {
    checkbox.show();
  } else {
    checkbox.hide();
  }
}

$('#check-reinstall').prop('checked', true);
$('#adb-install-command-option-r').show();
$('#check-test').prop('checked', false);
$('#adb-install-command-option-t').hide();

// log path
document.getElementById('dirs').addEventListener('click', () => {
  window.postMessage({
    type: 'select-dirs'
  }, '*')
})

ipcRenderer.on('directories-selected-message', function (event, message) {
  console.log(message);
  $('#log-tab-log-path').text(message[0]);
});

