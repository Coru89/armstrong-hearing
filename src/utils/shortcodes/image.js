const config = require("../../../eleventy.config")
const Image = require("@11ty/eleventy-img");

exports.imageShortCode = (src, alt, cls, loading, sizes, widths) => {
    let options = {
      widths: widths,
      formats: ['webp', 'jpeg'],
      outputDir: "./src/images-processed",
      urlPath: "/images-processed",
      useCache: true
    };

    // generate images, while this is async we don’t wait
    Image(`./src/images/${src}`, options);

    let imageAttributes = {
      alt,
      sizes,
      loading,
      widths
    };

    cls === '' || null ? '' : imageAttributes.class = cls;

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
    eleventyConfig.addShortcode("image", (src, alt, cls, loading, sizes, widths) => exports.imageShortCode(src, alt, cls, loading, sizes, widths))
  }
