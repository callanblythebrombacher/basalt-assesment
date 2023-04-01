import { query, validationResult, oneOf } from "express-validator";

export const validateListingReq = [
    oneOf([
        query("orgID", "invalid url param orgID")
            .exists()
            .customSanitizer((value) => {
                return decodeURIComponent(value);
            })
            .isString()
            .isNumeric(),
        query("agentID", "invalid url param agentID")
            .exists()
            .customSanitizer((value) => {
                return decodeURIComponent(value);
            })
            .isString()
            .isNumeric(),
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
