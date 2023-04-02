import services from "../services/organisationService";

/**
 * intended for manipulation of request data to be passed on to organisation service
 * @returns {Promise<{isError}|MongoClient|*[]>}
 */
const organisationHandler = async () => {
    /*
        no data manipulation needed so data is sent directly to service.
        function remains for future updates, if manipulation is needed down the road
        and to mantain design pattern.
    */
    return await services.getAllOrganisationsService();
};

export default {
    organisationHandler,
};
