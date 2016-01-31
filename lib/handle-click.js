const isFirefoxAndroid = require('./is-firefox-android')();
const tabs = require('sdk/tabs');
const data = require('sdk/self').data;

module.exports = () => {
  const worker = tabs.activeTab.attach({
    contentScriptFile: data.url('content-script.js'),
  });
  worker.port.on('copyToSystem', (request) => {
    if (isFirefoxAndroid) {
      const { Cc, Ci } = require('chrome');
      const prompts = Cc['@mozilla.org/embedcomp/prompt-service;1']
        .getService(Ci.nsIPromptService);
      prompts.prompt(
        null,
        'Build Link Plain',
        'Built link',
        { value: request },
        null,
        { value: false }
      );
    } else {
      const clipboard = require('sdk/clipboard');
      clipboard.set(request);
    }
  });
  worker.port.emit('buildLinkPlain');
};
