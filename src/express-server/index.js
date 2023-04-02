import serverless from 'serverless-http';
import express from "express";
import bodyParser from "body-parser";


import listingsRoute from "./core/routes/listings";
import agentsRoute from "./core/routes/agents";
import * as path from "path";

const app = express();

app.use(bodyParser.json());

const defaultURL = `/api/v_${process.env.API_VERSION}`;

app.use(defaultURL + "/listings", listingsRoute);
app.use(defaultURL + "/agents", agentsRoute);

app.use("/", express.static(path.join(__dirname, "react-build")));
app.use(
    "/static",
    express.static(path.join(__dirname, "react-build", "static"))
);


const lambda = serverless(app);

export async function handler(event, context) {
    return lambda(event, context)
}