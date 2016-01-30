const { Cc, Ci } = require('chrome');

module.exports = () =>
  Cc['@mozilla.org/xre/app-info;1']
    .getService(Ci.nsIXULRuntime)
    .widgetToolkit.toLowerCase() === 'android';
