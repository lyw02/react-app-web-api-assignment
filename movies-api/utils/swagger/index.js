import { join } from "path";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// config swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie App API",
      version: "1.0.0",
      description: `Movie App API`,
    },
  },
  apis: [join(__dirname, "../../api/*/*.js")],
};

var swaggerJson = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};
const swaggerSpec = swaggerDoc(options);

var swaggerInstall = function (app) {
  if (!app) {
    app = express();
  }
  app.get("/swagger.json", swaggerJson);
  app.use("/swagger", serve, setup(swaggerSpec));
};

export default swaggerInstall;
