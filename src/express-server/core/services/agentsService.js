import { constants } from "../helpers/constants";
import miscFunctions from "../helpers/miscFunctions";

/**
 * fetches all agents associated with an organisation
 * @param orgID {string} organisation id
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const agentsService = async (orgID) => {
    //the object for mongo is declared
    const mongoQuery = [
        {
            $lookup: {
                from: "agents",
                localField: "agent",
                foreignField: "_id",
                as: "agentData",
            },
        },
        { $match: { organisation: orgID } },
        { $project: { agentData: 1 } },
    ];

    //the type of operation is declared
    const type = "aggregate";

    //the options for the operation are declared
    const options = {};

    return await miscFunctions.createMongoReadQuery(
        mongoQuery,
        type,
        options,
        constants.databaseConstants.collections.listings
    );
};

export default {
    agentsService,
};
