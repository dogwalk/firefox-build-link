const { Cu } = require('chrome');
module.exports = () => {
  /* eslint-disable no-undef */
  Cu.import('resource://gre/modules/Services.jsm');
  return Services.wm.getMostRecentWindow('navigator:browser');
  /* eslint-enable no-undef */
};
