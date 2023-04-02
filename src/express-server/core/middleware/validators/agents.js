import { query, validationResult } from "express-validator";

/**
 * validates request data entering the agent route api/v_1/agent/?orgID=[id]
 * @type {(ValidationChain[]|(function(*, *, *): (*|undefined))|*)[]}
 */
export const validateAgentReq = [
    [query("orgID", "invalid url param orgID").exists().isString()],
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
