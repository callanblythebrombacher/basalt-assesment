import { MongoClient as Client, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";

export default class MongoClient {

    uri;
    client;
    databaseName;
    collection;

    constructor(databaseName, collectionName) {

        const environment = process.env.NODE_ENV

        switch (environment){
            case 'Production':
                dotenv.config({path:process.cwd() + '/.env.production'})
                break
            case 'Development':
                dotenv.config({path:process.cwd()+ '/.env.development'});
                break
        }

        this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kl0uoxq.mongodb.net/?retryWrites=true&w=majority`;
        this.databaseName = databaseName
        this.collectionName = collectionName
    }

    init(){
        console.log('opened')
        return new Client(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });
    }

    async mongoCreateConnection(){
        this.client = this.init()
        return await this.client.connect().then(
            ()=>{
                const db = this.client.db(this.databaseName)
                const collection  = db.collection(this.collectionName)
                return collection
            }
        ).catch(error=>{console.log(error)})

    }

    async mongoCloseConnection(){
        console.log('closed')
        await this.client.close().catch(error=>error)
    }
}