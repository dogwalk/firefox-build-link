'use strict';

const isFirefoxAndroid = require('./lib/is-firefox-android')();
const tabs = require('sdk/tabs');

function handleClick() {
  const worker = tabs.activeTab.attach({
    contentScriptFile: './content-script.js',
  });
  worker.port.on('copyToClipboard', (request) => {
    if (isFirefoxAndroid) {
      const { Cc, Ci } = require('chrome');
      const prompts = Cc['@mozilla.org/embedcomp/prompt-service;1']
        .getService(Ci.nsIPromptService);
      prompts.prompt(null, 'Build Link Plain', 'Built link', { value: request }, null, { value: false });
    } else {
      const clipboard = require('sdk/clipboard');
      clipboard.set(request);
    }
  });
  worker.port.emit('buildLinkPlain');
}

if (isFirefoxAndroid) {
  const { Cu } = require('chrome');
  const getWindow = () => {
    Cu.import('resource://gre/modules/Services.jsm');
    return Services.wm.getMostRecentWindow('navigator:browser');// eslint-disable-line no-undef
  };
  const nativeWindow = getWindow().NativeWindow;
  let menuId = 0;
  exports.main = (options, callback) => {// eslint-disable-line no-unused-vars
    menuId = nativeWindow.menu.add({
      name: 'Link Plain',
      callback: handleClick,
    });
  };
  exports.onUnload = (reason) => {// eslint-disable-line no-unused-vars
    nativeWindow.menu.remove(menuId);
  };
} else {
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
