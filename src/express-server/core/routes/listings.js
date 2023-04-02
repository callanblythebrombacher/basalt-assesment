import express from "express";
import { validateListingReq } from "../middleware/validators/listing";
const router = express.Router();
import handlers from "../handlers/listingsHandler";

router.get("/", validateListingReq, async function (req, res, next) {
    const orgID = req.query?.orgID;
    const agentID = req.query?.agentID;

    if (orgID) {
        const result = await handlers.listingsHandler(orgID);
        res.status(200).send(result);
    }
});

export default router;
