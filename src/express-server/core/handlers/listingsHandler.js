import services from "../services/listingsService";
const listingsHandler = async (orgID) => {
    return await services.listingsService(orgID);
};

export default {
    listingsHandler,
};
