import MongoCrud from "../mongo/crud";
import { constants } from "../helpers/constants";
const listingsService = async (orgID) => {
    const mongoQuery = [{ $match: { organisation: orgID } }];
    const type = "aggregate";
    const options = {};

    const mongoCrud = new MongoCrud(
        constants.databaseConstants.collections.listings,
        process.env.DB_NAME
    );

    const predef = {
        type: type,
        data: mongoQuery,
        options: options,
    };
    return await mongoCrud.read(predef);
};

export default {
    listingsService,
};
