// User-configurable settings
const userConfig = {
  HOST: 'localhost',
  PORT: 8030,
  SHOW_TIMESTAMP: true,

  URL_DEST: 'https://github.com/nachoaguirre/nodejs-vast-events-debug', // URL to open when the user clicks on the ad

  // Ad media file
  MEDIA_FILE: {
    // url: 'https://example.com/path/to/your/video.mp4', // Uncomment and set your own URL if needed
    duration: '00:00:15',
    width: '854',
    height: '480',
  },

  EVENT_PARAMS: {
    clickTracking: 'clickTracking', // Fires when the user clicks on the ad
    impression: 'impression', // Fires when the ad is shown
    viewableImpression: 'viewableImpression',
  },

  // Tracked events and their corresponding param to display in the debug
  // https://www.iab.com/wp-content/uploads/2016/04/VAST4.0_Updated_April_2016.pdf
  EVENTS: {
    mute: 'mute',
    unmute: 'unmute',
    pause: 'pause',
    resume: 'resume',
    rewind: 'rewind',
    skip: 'skip',
    playerExpand: 'playerExpand',
    playerCollapse: 'playerCollapse',
    start: 'start',
    firstQuartile: 'firstQuartile',
    midpoint: 'midpoint',
    thirdQuartile: 'thirdQuartile',
    complete: 'complete',
    acceptInvitationLinear: 'acceptInvitationLinear',
    otherAdInteraction: 'otherAdInteraction',
    creativeView: 'creativeView',
    acceptInvitation: 'acceptInvitation',
    adExpand: 'adExpand',
    adCollapse: 'adCollapse',
    minimize: 'minimize',
    close: 'close',
  },
};

/**
 * END OF USER CONFIGURATION
 * DO NOT EDIT BELOW THIS LINE
 */

function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const [key, value] = args[i].slice(2).split('=');
      result[key] = value || true;
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));

const config = {
  ...userConfig,
  HOST: args.host || userConfig.HOST,
  PORT: parseInt(args.port) || userConfig.PORT,
  SHOW_TIMESTAMP:
    args.showTimestamp !== undefined
      ? args.showTimestamp === 'true'
      : userConfig.SHOW_TIMESTAMP,
  URL_DEST: args.urlDest || userConfig.URL_DEST,
  MEDIA_FILE: {
    ...userConfig.MEDIA_FILE,
    get url() {
      return (
        userConfig.MEDIA_FILE.url ||
        `http://${config.HOST}:${config.PORT}/public/videoad.mp4`
      );
    },
  },
  EVENT_PARAMS: userConfig.EVENT_PARAMS,
  EVENTS: userConfig.EVENTS,
};

module.exports = config;
