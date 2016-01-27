const buttons = require('sdk/ui/button/action');
const tabs = require("sdk/tabs");

const button = buttons.ActionButton({
  id: "build-link",
  label: "Build Link",
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
