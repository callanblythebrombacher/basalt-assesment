import { query, validationResult, oneOf } from "express-validator";

/**
 * validates request data entering the listing route api/v_1/listing/?orgID=[id]&agentID=[id]
 * @type {(ValidationChain[]|(function(*, *, *): (*|undefined))|*)[]}
 */
export const validateListingReq = [
    oneOf([
        query("orgID", "invalid url param orgID").exists().isString(),
        query("agentID", "invalid url param agentID").exists().isString(),
    ]),
    function (req, res, next) {
        const errorValidation = validationResult(req);
        if (errorValidation.errors.length > 0) {
            return res.status(500).json({
                title: "an error occured",
                error: errorValidation,
            });
        }
        next();
    },
];
