import express from "express";
import { validateAgentReq } from "../middleware/validators/agents";
const router = express.Router();

router.get("/", validateAgentReq, async function (req, res, next) {
    const orgID = req.query?.orgID;

    res.status(200).send({ orgID: orgID });
});

export default router;
