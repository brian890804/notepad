const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const dev = {
    // apiUrl: "https://staging.bliav-1.com/",
    apiUrl: "https://hub2bcy.com",
    // apiUrl: "https://staging.bili01.com",
  };
  app.use(
    "/api",
    createProxyMiddleware({
      target: dev.apiUrl,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
