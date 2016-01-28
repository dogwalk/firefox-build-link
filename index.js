const buttons = require('sdk/ui/button/action');
const clipboard = require("sdk/clipboard");
const tabs = require("sdk/tabs");

const button = buttons.ActionButton({
  id: "build-link-plain",
  label: "Plain",
  icon: {
    "16": "./filter3-16.png",
    "32": "./filter3-32.png",
    "64": "./filter3-64.png"
  },
  onClick: handleClick
});

function handleClick() {
  const worker = tabs.activeTab.attach({
    contentScriptFile: './content-script.js'
  });
  worker.port.on('copyToClipboard', (request) => {
    clipboard.set(request);
  });
  worker.port.emit("buildLinkPlain");
}

// tabs.on("ready", (tab) => {
//   tab.attach({
//     contentScript: "console.log(document.body.innerHTML);"
//   });
// });
