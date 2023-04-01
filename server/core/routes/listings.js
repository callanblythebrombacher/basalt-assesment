import express from "express";
import { validateListingReq } from "../middleware/validators/listing";
const router = express.Router();

router.get("/", validateListingReq, async function (req, res, next) {
    const orgID = req.query?.orgID;
    const agentID = req.query?.agentID;
    res.status(200).send({ orgID: orgID, agentID: agentID });
});

export default router;
