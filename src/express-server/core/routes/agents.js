import express from "express";
import { validateAgentReq } from "../middleware/validators/agents";
const router = express.Router();
import handler from "../handlers/agentsHandler";
import miscFunctions from "../helpers/miscFunctions";
router.get("/", validateAgentReq, async function (req, res, next) {
    //get query param
    const orgID = req.query?.orgID;

    //pass params to handler and fetch data from mongodb or return error
    const result = await handler.fetchAgentsHandler(orgID);

    //if error present log it with time stamp and send a status 500 for internal server error
    if (result?.isError) {
        res.sendStatus(500);
        const dateTimeStamp = miscFunctions.currentTime();
        console.log(dateTimeStamp + ":", result.error);
    } else {
        //if no error present send status 200 and data from mongodb
        res.status(200).send(result);
    }
});

export default router;
