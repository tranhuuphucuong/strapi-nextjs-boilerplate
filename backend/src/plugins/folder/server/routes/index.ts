export default {
  "content-api": {
    type: "content-api",
    routes: [
      {
        method: "GET",
        path: "/docs/:folderName",
        handler: "folder.getOne",
        config: {
          policies: [],
        },
      },
    ],
  },
};
