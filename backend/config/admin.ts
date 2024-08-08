export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", env("NODE_ENV") !== "production" ? true : false),
    promoteEE: env.bool(
      "FLAG_PROMOTE_EE",
      env("NODE_ENV") !== "production" ? true : false
    ),
  },
});
