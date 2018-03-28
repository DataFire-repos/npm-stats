"use strict";
let datafire = require('datafire');
let stats = require('download-stats');


var http = require('@datafire/http').actions;
module.exports = new datafire.Action({
  inputs: [{
    title: "package_name",
    type: "string",
    maxLength: 214,
    minLength: 1
  }],
  handler: (input, context) => {
    let downloads = {};
    function retrieveStats(period, label) {
      return new Promise((resolve, reject) => {
        stats.get[period](input.package_name, (err, results) => {
          if (err) return reject(err);
          downloads[label] = results.downloads;
          resolve();
        });
      });
    }
    let prom = retrieveStats('lastDay', 'daily')
        .then(_ => retrieveStats('lastWeek', 'weekly'))
        .then(_ => retrieveStats('lastMonth', 'monthly'))
        .then(_ => {
           return {downloads, name: input.package_name}
        })
    return prom
  },
});
