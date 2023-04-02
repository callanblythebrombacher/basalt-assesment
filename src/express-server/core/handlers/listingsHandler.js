import services from "../services/listingsService";

/**
 * intended for manipulation of request data to be passed on to listing service
 * @param orgID organisation id
 * @param agentID agent id
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const listingsHandler = async (orgID, agentID) => {
    /*
        no data manipulation needed so data is sent directly to service.
        function remains for future updates, if manipulation is needed down the road
        and to mantain design pattern.
    */
    return await services.listingsService(orgID, agentID);
};

export default {
    listingsHandler,
};
