'use strict';

module.exports = Object.freeze({
  channel: Object.freeze({
    identifier: Object.freeze({
      YOUTUBE: 'youtube',
      FACEBOOK: 'facebook',
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
