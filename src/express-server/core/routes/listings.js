import express from "express";
import { validateListingReq } from "../middleware/validators/listing";
const router = express.Router();
import handlers from "../handlers/listingsHandler";
import miscFunctions from "../helpers/miscFunctions";
router.get("/", validateListingReq, async function (req, res, next) {
    //get query params
    const orgID = req.query?.orgID;
    const agentID = req.query?.agentID;

    //pass params to handler and fetch data from mongodb or return error
    const result = await handlers.listingsHandler(orgID, agentID);

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
