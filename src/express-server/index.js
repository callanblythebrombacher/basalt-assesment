import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import * as path from "path";
import rateLimit from "express-rate-limit";

//------- Import Routes Start ----------//

import listingsRoute from "./core/routes/listings";
import agentsRoute from "./core/routes/agents";
import organisationRoute from "./core/routes/oragnisations";
import cors from "cors";

//------- Import Routes End -----------//

//Create express App
const app = express();

// configure rate limiter
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//default api url for backend
const defaultURL = `/api/v_${process.env.API_VERSION}`;

// cors configuration
const corsConfig = {
    origin: [
        "http://localhost:3000",
        "https://x71l6czapd.execute-api.us-east-1.amazonaws.com",
    ],
};

//apply app wide middleware
app.use(bodyParser.json());
app.use(defaultURL, apiLimiter);
app.use(cors(corsConfig));

//expose backed routes
app.use(defaultURL + "/listings", listingsRoute);
app.use(defaultURL + "/agents", agentsRoute);
app.use(defaultURL + "/organisation", organisationRoute);

//serve front end react build
app.use("/", express.static(path.join(__dirname, "react-build")));
app.use(
    "/static",
    express.static(path.join(__dirname, "react-build", "static"))
);

//initialize serverless for lambda creation
const lambda = serverless(app);

//export lambda handler
export async function handler(event, context) {
    return lambda(event, context);
}
