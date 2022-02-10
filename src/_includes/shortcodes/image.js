const config = require("../../../eleventy.js")
const Image = require("@11ty/eleventy-img");

exports.imageShortCode = (cfg = config, src, alt, sizes, widths) => {
    let options = {
      widths: widths,
      formats: ['webp', 'jpeg'],
    };

    // generate images, while this is async we don’t wait
    Image(src, options);

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy'
    };
    // get metadata even the images are not fully generated
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
  }

/**
 * Add shortcode for reading SVG files.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
  exports.default = (eleventyConfig) => {
    eleventyConfig.addShortcode("image", (src, alt, sizes, widths) => exports.imageShortCode(src, alt, sizes, widths))
  }
