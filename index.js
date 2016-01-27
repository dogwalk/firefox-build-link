const buttons = require('sdk/ui/button/action');
const tabs = require("sdk/tabs");

const button = buttons.ActionButton({
  id: "build-link-plain",
  label: "Plain",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://www.mozilla.org/");
}

require("sdk/tabs").on("ready", function(tab) {
  tab.attach({
    contentScript: "console.log(document.body.innerHTML);"
  });
});
