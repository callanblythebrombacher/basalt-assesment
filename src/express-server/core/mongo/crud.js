import MongoClient from "./client";

export default class MongoCrud {
    collectionName;
    databaseName;
    connection;

    constructor(collection, databaseName) {
        this.collectionName = collection;
        this.databaseName = databaseName;
    }

    async init() {
        const client = new MongoClient(this.databaseName, this.collectionName);
        this.connection = await client
            .mongoCreateConnection()
            .catch((error) => {
                return error;
            });
        return client;
    }

    async read(preDef) {
        const client = await this.init();
        const { type, data, options = {} } = preDef;
        let result;

        switch (type) {
            case "find":
                result = await this.connection
                    .find(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
            case "findDistinct":
                result = await this.connection
                    .distinct(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
            case "aggregate":
                const cursor = await this.connection.aggregate(data, options);
                result = [];
                await cursor.forEach((myDoc) => result.push(myDoc));
                await client.mongoCloseConnection();
                break;
        }
        return result;
    }

    /**
     *
     * @param preDef {{type:string, data:object, options:object}}
     * @returns {Promise<InsertManyResult<Document>>}
     */
    async write(preDef) {
        const client = await this.init();
        console.log(this.connection);
        const { type, data, options = {} } = preDef;
        let result;

        switch (type) {
            case "insertOne":
                result = await this.connection
                    .insertOne(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
            case "insertMany":
                result = await this.connection
                    .insertMany(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
        }
        return result;
    }

    async delete(preDef) {
        const client = await this.init();
        const { type, data, options = {} } = predef;
        let result;

        switch (type) {
            case "deleteOne":
                result = await this.connection
                    .deleteOne(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
            case "deleteMany":
                result = await this.connection
                    .deleteMany(data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
        }
        return result;
    }

    async update(preDef) {
        const client = await this.init();
        const { filter, data, type, options = {} } = preDef;
        let result;

        switch (type) {
            case "upDateOne":
                result = this.connection
                    .updateOne(filter, data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
            case "replaceOne":
                result = this.connection
                    .replaceOne(filter, data, options)
                    .catch((error) => {
                        client.mongoCloseConnection();
                        return error;
                    });
                await client.mongoCloseConnection();
                break;
        }
    }
}
