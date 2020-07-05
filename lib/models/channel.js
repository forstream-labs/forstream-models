'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const constants = require('../constants');

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const Channel = new Schema({
  identifier: {type: String, enum: _.values(constants.channel.identifier), required: true, unique: true},
  name: {type: String, trim: true, required: true},
  image_url: {type: String, required: true},
  presentation_order: {type: Number, required: true},
  required_scopes: {type: [String]},
  registration_date: {type: Date, required: true},
}, {collection: 'channels'});

const Credentials = new Schema({
  access_token: {type: String, required: true},
  refresh_token: {type: String},
  expiry_date: {type: Date},
  scopes: {type: [String]},
}, {_id: false});

const TargetMetadata = new Schema({
  rtmp_url: {type: String},
  stream_key: {type: String},
}, {_id: false});

const Target = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  url: {type: String},
  metadata: {type: TargetMetadata},
}, {_id: false});

const ConnectedChannel = new Schema({
  user: {type: ObjectId, ref: 'User', required: true, index: true},
  channel: {type: ObjectId, ref: 'Channel', required: true, index: true},
  target: {type: Target, required: true},
  credentials: {type: Credentials},
  registration_date: {type: Date, required: true},
}, {collection: 'connected_channels'});
ConnectedChannel.index({user: 1, channel: 1}, {unique: true});

exports.Channel = Channel;
exports.ConnectedChannel = ConnectedChannel;
