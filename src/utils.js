const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

const styleString = (str, color, useBold = false, useItalic = false) => {
  const colors = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  };

  const colorCode = colors[color] || '';
  const brightCode = useBold ? "\x1b[1m" : '';
  const italicCode = useItalic ? "\x1b[3m" : '';
  return `${brightCode}${italicCode}${colorCode}${str}\x1b[0m`;
};

const getDebugMessage = (eventInfo, showTimestamp) => {
  let eventMessage = `${styleString('Event:', 'green', true)} ${styleString(eventInfo.name, 'yellow')}`;

  for (const [key, value] of Object.entries(eventInfo.params || {})) {
    const keyString = styleString(`${key}:`, 'cyan');
    eventMessage += `, ${keyString} ${value}`;
  }

  if (showTimestamp) {
    const timestamp = styleString(`[${getTimestamp()}]`, 'magenta');
    eventMessage = `${timestamp} ${eventMessage}`;
  }

  return eventMessage;
};

module.exports = {
  styleString,
  getDebugMessage
};
