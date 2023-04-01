import ServerlessHttp from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import listingsRoute from "./core/routes/listings";
import agentsRoute from "./core/routes/agents";
import * as path from "path";

const environment = process.env.NODE_ENV;

switch (environment) {
    case "Production":
        dotenv.config({ path: process.cwd() + "/.env.production" });
        break;
    case "Development":
        dotenv.config({ path: process.cwd() + "/.env.development" });
        break;
}

const app = express();

app.use(bodyParser.json());

const defaultURL = `/api/v_${process.env.API_VERSION}`;

app.use(defaultURL + "/listings", listingsRoute);
app.use(defaultURL + "/agents", agentsRoute);

app.use("/client-app", express.static(path.join(__dirname, "react-build")));
app.use(
    "/static",
    express.static(path.join(__dirname, "react-build", "static"))
);

const port = process.env.PORT || 8000;
const url = process.env.URL || "";

app.listen(port, () => {
    console.log(`listening on ${url}:${port}/client-app`);
});

module.exports.handler = ServerlessHttp(app);
