'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const constants = require('../constants');

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const Channel = new Schema({
  name: {type: String, trim: true, required: true},
  identifier: {type: String, enum: _.values(constants.channel.identifier), required: true, unique: true},
  image_url: {type: String, required: true},
  presentation_order: {type: Number, required: true},
  required_scopes: {type: [String], required: true},
  registration_date: {type: Date, required: true},
}, {collection: 'channels'});

const Credentials = new Schema({
  access_token: {type: String, required: true},
  refresh_token: {type: String},
  expiry_date: {type: Date},
}, {_id: false});

const ConnectedChannel = new Schema({
  user: {type: ObjectId, ref: 'User', required: true, index: true},
  channel: {type: ObjectId, ref: 'Channel', required: true, index: true},
  target_id: {type: String, required: true},
  credentials: {type: Credentials, required: true},
  registration_date: {type: Date, required: true},
}, {collection: 'connected_channels'});
ConnectedChannel.index({user: 1, channel: 1}, {unique: true});

exports.Channel = Channel;
exports.ConnectedChannel = ConnectedChannel;
