const { DateTime } = require('luxon');
const { eleventyConfig } = require('@11ty/eleventy');
const { PIXI } = require('pixi.js');
module.exports = (config) => {
  config.addPassthroughCopy('src/style.css');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/admin/config.yml');

  config.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('MMMM dd, yyyy');
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};

