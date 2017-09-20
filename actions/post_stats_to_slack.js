"use strict";
let datafire = require('datafire');


var get_npm_stats = require('./get_npm_stats.js');
var slack = require('@datafire/slack').actions;
module.exports = new datafire.Action({
  inputs: [{
    title: "package_name",
    type: "string"
  }],
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => get_npm_stats.run({
        package_name: 'datafire',
      }, context))
      .then(stats => slack.chatPostMessage({
        channel: 'general',
        text: JSON.stringify(stats, null, 2),
      }, context))
  },
});
