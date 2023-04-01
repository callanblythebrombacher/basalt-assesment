import MongoClient from "./client";

export default class MongoCrud{

    collectionName;
    databaseName;
    client;
    connection;

    constructor( collection, databaseName) {
        this.collection = collection;
        this.databaseName = databaseName;
        this.client = new MongoClient(this.databaseName, this.collectionName);
    }

    async init(){
        this.connection = await this.client.mongoCreateConnection().catch(error=>throw new Error(error))
    }

    async read(preDef){

        await this.init()
        const {type, data, options={}} = preDef
        let result;

        switch (type) {
            case  'find':
                result = await this.connection.find(data, options)
                    .then(this.connection.mongoCloseConnection())
                    .catch(error=>throw new Error(error));
                break;
            case  'findDistinct':
                result = await this.connection.distinct(data,options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw new Error(error));
                break;
            case  'aggregate':
                result = await this.connection.aggregate(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw new Error(error));
                break;
        }
        return result
    }

    async write(preDef){

        await this.init()
        const {type, data, options={}} = preDef;
        let result;

        switch (type) {
            case  'insertOne':
                result = await this.connection.insertOne(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw new Error(error));
                break;
            case  'insertMany':
                result = await this.connection.insertMany(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw new Error(error));
                break;
        }
        return result
    }

    async delete(preDef) {

        await this.init()
        const {type, data, options={}} = predef;
        let result;

        switch (type) {
            case  'deleteOne':
                result = await this.connection.deleteOne(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw new Error(error));
                break
            case  'deleteMany':
                result = await this.connection.deleteMany(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw new Error(error));
                break;
        }
        return result
    }

    async update(preDef){

        await this.init()
        const {filter, data, type, options={}} = preDef
        let result;

        switch (type) {
            case  'upDateOne':
                result = this.connection.updateOne(filter, data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw new Error(error));
                break;
            case  'replaceOne':
                result = this.connection.replaceOne(filter, data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw new Error(error));
                break;
        }
    }

}
