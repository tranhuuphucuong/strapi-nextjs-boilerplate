"use strict";

import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  getOne: async (ctx, next) => {
    try {
      const { folderName } = ctx.params;
      console.log("Query: ", ctx.request.query);
      strapi.entityService?.findOne;

      // const folder = await strapi.entityService?.findOne("plugin::upload.folder",1,
      // ctx.request.query
      const folder = await strapi.query("plugin::upload.folder").findOne({
        where: {
          name: {
            $eqi: folderName,
          },
        },
        populate: ["files"],
        // populate: {
        //   files: true,
        //   repeatableComponent: {
        //     fields: ["hash"],
        //   },
        // },
      });
      if (folder) {
        ctx.body = folder;
      } else {
        ctx.assert({}, 404);
      }
    } catch (err) {
      console.log(err);
    }
  },
});
