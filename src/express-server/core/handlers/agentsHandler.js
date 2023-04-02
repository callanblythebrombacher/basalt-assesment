import services from "../services/agentsService";

/**
 * intended for manipulation of request data to be passed on to agent service
 * @param orgID {string} organisatio id
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const fetchAgentsHandler = async (orgID) => {
    /*
        no data manipulation needed so data is sent directly to service.
        function remains for future updates, if manipulation is needed down the road
        and to mantain design pattern.
     */
    return await services.agentsService(orgID);
};

export default {
    fetchAgentsHandler,
};
