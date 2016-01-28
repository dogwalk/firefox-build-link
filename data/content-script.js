self.port.on("buildLinkPlain", () => {
  const title = window.document.title;
  const url = window.location.href;
  const result = [];
  result.push(title);
  result.push(url);
  self.port.emit('copyToClipboard', result.join(' '));
});
