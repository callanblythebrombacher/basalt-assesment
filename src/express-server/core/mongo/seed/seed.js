import fs from "fs";
import MongoCrud from "../crud";

/**
 * A seed script for loading mock data into mongodb, can be fired execute with < npm run seed > in cli
 */
class Seed {
    /**
     * gets the data to be seeded from a json file
     * @param filePath {string} the path to the json file
     * @returns {Promise<Object>}
     */
    async fileReader(filePath) {
        let bufferData = fs.readFileSync(filePath);
        let stData = bufferData.toString();
        return JSON.parse(stData);
    }

    /**
     * initiates the seeding of data into a mongo db
     * @param preDef {{databaseName:string, collectionName:string, filePath:string}}
     * @returns {Promise<void>}
     */
    async seedData(preDef) {
        const { databaseName, collectionName, filePath } = preDef;
        const crud = new MongoCrud(collectionName, databaseName);
        const data = await this.fileReader(filePath);

        const config = {
            type: "insertMany",
            data: data,
            options: {},
        };
        console.log(config);
        const result = await crud
            .write(config)
            .then((r) => r)
            .catch((error) => {
                return error;
            });
        console.log(result);
    }
}

//executes the seeds when < npm run seed > is called in the cli

new Seed().seedData({
    databaseName: "test",
    collectionName: "agents",
    filePath: __dirname + "/data/agents.json",
});
new Seed().seedData({
    databaseName: "test",
    collectionName: "organisations",
    filePath: __dirname + "/data/organisations.json",
});
new Seed().seedData({
    databaseName: "test",
    collectionName: "listings",
    filePath: __dirname + "/data/listings.json",
});
