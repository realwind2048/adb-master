// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const bootstrap = require('bootstrap')

var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl: { addEventListener: (arg0: string, arg1: (event: any) => void) => void }) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event: { preventDefault: () => void }) {
    event.preventDefault()
    tabTrigger.show()
  })
})