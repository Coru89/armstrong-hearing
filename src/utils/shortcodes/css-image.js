const config = require("../../../eleventy.config")
const Image = require("@11ty/eleventy-img");

// .eleventy.js
function generateImages(src, widths){
  let source = `./src/images/${src}`;

  let options = {
    widths: widths,
    formats: ['jpeg'],
    outputDir: "./src/images/processed",
    urlPath: "/images/processed",
    useCache: true
  };
  // genrate images, ! dont wait
  Image(`./src/images/${src}`, options);
  // get metadata even the image are not fully generated
  return Image.statsSync(source, options);
}

exports.imageCssBackground = (src, selector, widths) =>{
  const metadata = generateImages(src, widths);
  console.log(metadata);

  let markup = [`${selector} { background-image: url(${metadata.jpeg[0].url});} `];

  metadata.jpeg.slice(1).forEach((image, idx) => {
    markup.push(`@media (min-width: ${metadata.jpeg[idx].width}px) { ${selector} {background-image: url(${image.url});}}`);
  });

  return markup.join("");
}

exports.default = (eleventyConfig) => {
  eleventyConfig.addShortcode("cssBackground", (src, selector, widths) => exports.imageCssBackground(src, selector, widths))
}