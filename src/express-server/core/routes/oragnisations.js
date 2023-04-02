import express from "express";
const router = express.Router();
import handlers from "../handlers/organisationHandler";
import miscFunctions from "../helpers/miscFunctions";
router.get("/", async function (req, res, next) {
    //pass params to handler and fetch data from mongodb or return error
    const result = await handlers.organisationHandler();

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
