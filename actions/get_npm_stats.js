"use strict";
let datafire = require('datafire');

var http = require('@datafire/http').actions;
module.exports = new datafire.Action({
  inputs: [{
    title: "package_name",
    type: "string",
    maxLength: 214,
    minLength: 1
  }],
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => http.get({
        url: "https://www.npmjs.com/package/" + input.package_name,
      }, context))
      .then(response => {
        let $ = require('cheerio').load(response.body);
        return {
          name: input.package_name,
          downloads: {
            daily: +$('.daily-downloads').text(),
            weekly: +$('.weekly-downloads').text(),
            monthly: +$('.monthly-downloads').text(),
          } 
        }
      })
  },
});
