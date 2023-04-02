import { MongoClient as Client, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

/**
 *  A connection client to connect, and disconnect to mongodb
 */
export default class MongoClient {
    uri;
    client;
    databaseName;
    collection;

    constructor(databaseName, collectionName) {
        const environment = process.env.NODE_ENV;

        switch (environment) {
            case "Production":
                dotenv.config({ path: process.cwd() + "/.env.production" });
                break;
            case "Development":
                dotenv.config({ path: process.cwd() + "/.env.development" });
                break;
        }

        this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kl0uoxq.mongodb.net/?retryWrites=true&w=majority`;
        this.databaseName = databaseName;
        this.collectionName = collectionName;
    }

    /**
     * initializes the client for connection
     * @returns {MongoClient}
     */
    init() {
        return new Client(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
    }

    /**
     * creates a connection to mongo db
     * @returns {Promise<*>}
     */
    async mongoCreateConnection() {
        this.client = this.init();
        return await this.client
            .connect()
            .then(() => {
                const db = this.client.db(this.databaseName);
                const collection = db.collection(this.collectionName);
                return collection;
            })
            .catch((error) => ({ isError: true, error: error }));
    }

    /**
     * closes the connection with mongodb
     * @returns {Promise<void>}
     */
    async mongoCloseConnection() {
        console.log("closed");
        await this.client.close();
    }
}
