'use strict';

module.exports = Object.freeze({
  channel: Object.freeze({
    identifier: Object.freeze({
      YOUTUBE: 'youtube',
      FACEBOOK: 'facebook',
      FACEBOOK_PAGE: 'facebook_page',
      TWITCH: 'twitch',
      RTMP: 'rtmp',
    }),
  }),
  streamStatus: Object.freeze({
    ERROR: 'error',
    READY: 'ready',
    LIVE: 'live',
    COMPLETE: 'complete',
  }),
  providerMessage: Object.freeze({
    type: Object.freeze({
      ERROR: 'error',
      WARNING: 'warning',
    }),
  }),
});
