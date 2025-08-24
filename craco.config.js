const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // devServer: {
  //   proxy: {
  //     "^/estudent/api": {
  //       target: "http://localhost:8081",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
};
