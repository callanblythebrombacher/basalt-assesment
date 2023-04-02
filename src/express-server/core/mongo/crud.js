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
        this.connection = await client.mongoCreateConnection();
        return client;
    }

    async read(preDef) {
        //init connection
        const client = await this.init();
        //if connection error
        if (client?.isError) {
            return client;
        } else {
            //else if no error run read opperation
            const { type, data, options = {} } = preDef;
            let result;
            let cursor;
            switch (type) {
                case "find":
                    result = [];
                    cursor = await this.connection.find(data, options);
                    await cursor
                        .forEach((myDoc) => result.push(myDoc))
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
                case "findDistinct":
                    result = [];
                    cursor = await this.connection.distinct(data, options);
                    await cursor
                        .forEach((myDoc) => result.push(myDoc))
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
                case "aggregate":
                    cursor = await this.connection.aggregate(data, options);
                    result = [];
                    await cursor
                        .forEach((myDoc) => result.push(myDoc))
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
            }
            return result;
        }
    }

    /**
     *
     * @param preDef {{type:string, data:object, options:object}}
     * @returns {Promise<InsertManyResult<Document>>}
     */
    async write(preDef) {
        const client = await this.init();
        if (client?.isError) {
            return client;
        } else {
            console.log(this.connection);
            const { type, data, options = {} } = preDef;
            let result;

            switch (type) {
                case "insertOne":
                    result = await this.connection
                        .insertOne(data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
                case "insertMany":
                    result = await this.connection
                        .insertMany(data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
            }
            return result;
        }
    }

    async delete(preDef) {
        const client = await this.init();
        if (client?.isError) {
            return client;
        } else {
            const { type, data, options = {} } = predef;
            let result;

            switch (type) {
                case "deleteOne":
                    result = await this.connection
                        .deleteOne(data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
                case "deleteMany":
                    result = await this.connection
                        .deleteMany(data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
            }
            return result;
        }
    }

    async update(preDef) {
        const client = await this.init();
        if (client?.isError) {
            return client;
        } else {
            const { filter, data, type, options = {} } = preDef;
            let result;

            switch (type) {
                case "upDateOne":
                    result = this.connection
                        .updateOne(filter, data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
                case "replaceOne":
                    result = this.connection
                        .replaceOne(filter, data, options)
                        .catch((error) => {
                            client.mongoCloseConnection();
                            return { isError: true, error: error };
                        });
                    await client.mongoCloseConnection();
                    break;
            }
            return result;
        }
    }
}
