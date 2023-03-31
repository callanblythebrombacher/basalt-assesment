import { MongoClient as Client, ServerApiVersion } from 'mongodb';

export default class MongoClient {

    client;
    databaseName;
    collection;

    constructor(databaseName, collectionName) {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kl0uoxq.mongodb.net/?retryWrites=true&w=majority`;
        this.client = new Client(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1
            });
        this.databaseName = databaseName
        this.collectionName = collectionName
    }

    async mongoCreateConnection(){
        return await this.client.connect().then(
            ()=>{
                const db = this.client.db(this.databaseName)
                const collection  = db.collection(this.collectionName)
                return collection
            }
        ).catch(error=>throw error)

    }

    async mongoCloseConnection(){
        await this.client.close()
    }
}