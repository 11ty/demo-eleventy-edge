const { EleventyServerlessBundlerPlugin, EleventyEdgePlugin } = require("@11ty/eleventy");
const EleventySyntaxHighlighterPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));

  eleventyConfig.addPlugin(EleventyEdgePlugin);

  // Probably won’t use this (e.g. `{% edge2 %}`), but future proofing just in case
  // eleventyConfig.addPlugin(EdgePlugin, {
    //   name: "edge2"
    // });

  eleventyConfig.addPlugin(EleventySyntaxHighlighterPlugin);

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "possum", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
    copy: [
      "11ty"
    ]
  });
};
