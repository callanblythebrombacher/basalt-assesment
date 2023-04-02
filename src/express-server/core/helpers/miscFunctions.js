import moment from "moment-timezone";
import MongoCrud from "../mongo/crud";
import { re } from "@babel/core/lib/vendor/import-meta-resolve";
const currentTime = () => {
    return moment().tz("Africa/Johannesburg").format("YYYY-MM-DD HH:mm:ss");
};

const createMongoReadQuery = async (
    query,
    operationType,
    options,
    collection
) => {
    //the class is initialised
    const mongoCrud = new MongoCrud(collection, process.env.DB_NAME);
    //the predef is defined
    const predef = {
        type: operationType,
        data: query,
        options: options,
    };

    //the query is executed
    return await mongoCrud.read(predef);
};

export default {
    currentTime,
    createMongoReadQuery,
};
