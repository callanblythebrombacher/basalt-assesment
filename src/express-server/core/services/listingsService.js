import MongoCrud from "../mongo/crud";
import { constants } from "../helpers/constants";
import miscFunctions from "../helpers/miscFunctions";

/**
 * fetches listings associated with either an organisation id or agent id
 * @param orgID {string} organisation id
 * @param agentID {string} agent id
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const listingsService = async (orgID, agentID) => {
    if (orgID && !agentID) {
        //the object for mongo is declared
        const mongoQuery = [{ $match: { organisation: orgID } }];

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
    } else if (agentID && !orgID) {
        //the object for mongo is declared
        const mongoQuery = [{ $match: { agent: agentID } }];
        //the type of operation is declared
        const type = "aggregate";

        //the options for the operation are declared
        const options = {};

        return await miscFunctions.createMongoQuery(
            mongoQuery,
            type,
            options,
            constants.databaseConstants.collections.listings
        );
    } else if (agentID && orgID) {
        //the object for mongo is declared
        const mongoQuery = [
            { $match: { organisation: orgID, agent: agentID } },
        ];
        //the type of operation is declared
        //the type of operation is declared
        const type = "aggregate";

        //the options for the operation are declared
        const options = {};

        return await miscFunctions.createMongoQuery(
            mongoQuery,
            type,
            options,
            constants.databaseConstants.collections.listings
        );
    }
};

export default {
    listingsService,
};
