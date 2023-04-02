import { constants } from "../helpers/constants";
import miscFunctions from "../helpers/miscFunctions";

/**
 * Fetches all database entries for organisations from mongodb
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const getAllOrganisationsService = async () => {
    //the object for mongo is declared
    const mongoQuery = {};

    //the type of operation is declared
    const type = "find";

    //the options for the operation are declared
    const options = {};

    return await miscFunctions.createMongoReadQuery(
        mongoQuery,
        type,
        options,
        constants.databaseConstants.collections.organizations
    );
};

export default {
    getAllOrganisationsService,
};
