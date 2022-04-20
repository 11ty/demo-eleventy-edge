import { EleventyEdge } from "eleventy:edge";
import precompiled from "./_generated/eleventy-edge-app-data.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ["appearance", "username", "repeat"],
    });

    edge.config(eleventyConfig => {
      // Fancier json output
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch(e) {
    // Skip the favicon
    if(e.message.includes("favicon.ico")) {
      return context.next(e);
    }

    // TODO Fancy error page
    console.log( "ERROR", { e } );
    return context.next(e);
  }
};
