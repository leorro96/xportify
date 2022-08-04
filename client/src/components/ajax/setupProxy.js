module.exports = function(app) {
    app.use(
      createProxyMiddleware(["/track"], { target: "http://localhost:3001" })
    );
  };