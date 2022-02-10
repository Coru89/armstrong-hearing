const config = require("../../../eleventy.config")
const Image = require("@11ty/eleventy-img");

exports.imageShortCode = (src, alt, loading, sizes, widths) => {
    let options = {
      widths: widths,
      formats: ['webp', 'jpeg'],
      outputDir: "./dist/img/"
    };

    // generate images, while this is async we don’t wait
    Image(`./src/images/${src}`, options);

    let imageAttributes = {
      alt,
      sizes,
      loading
    };
    // get metadata even the images are not fully generated
    let metadata = Image.statsSync(`./src/images/${src}`, options);
    return Image.generateHTML(metadata, imageAttributes);
  }

/**
 * Add shortcode for reading SVG files.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
  exports.default = (eleventyConfig) => {
    eleventyConfig.addShortcode("image", (src, alt, loading, sizes, widths) => exports.imageShortCode(src, alt, loading, sizes, widths))
  }
