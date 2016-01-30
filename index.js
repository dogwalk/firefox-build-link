const isFirefoxAndroid = require('./lib/is-firefox-android')();
const tabs = require('sdk/tabs');

function handleClick() {
  const worker = tabs.activeTab.attach({
    contentScriptFile: './content-script.js',
  });
  worker.port.on('copyToClipboard', (request) => {
    if (!isFirefoxAndroid) {
      const clipboard = require('sdk/clipboard');
      clipboard.set(request);
    }
  });
  worker.port.emit('buildLinkPlain');
}

if (!isFirefoxAndroid) {
  const { ActionButton } = require('sdk/ui/button/action');
  ActionButton({ // eslint-disable-line new-cap
    id: 'build-link-plain',
    label: 'Plain',
    icon: {
      16: './filter3-16.png',
      32: './filter3-32.png',
      64: './filter3-64.png',
    },
    onClick: handleClick,
  });
}

// tabs.on("ready", (tab) => {
//   tab.attach({
//     contentScript: "console.log(document.body.innerHTML);"
//   });
// });
