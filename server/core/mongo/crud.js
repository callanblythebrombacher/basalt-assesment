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
        this.connection = await this.client.mongoCreateConnection().catch(error=>throw error)
    }

    async read(preDef){

        await this.init()
        const {type, data, options={}} = preDef
        let result;

        switch (type) {
            case type === 'find':
                result = await this.connection.find(data, options)
                    .then(this.connection.mongoCloseConnection())
                    .catch(error=>throw error);
                break;
            case type === 'findDistinct':
                result = await this.connection.distinct(data,options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw error);
                break;
            case type === 'aggregate':
                result = await this.connection.aggregate(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw error);
                break;
        }
        return result
    }

    async write(preDef){

        await this.init()
        const {type, data, options={}} = preDef;
        let result;

        switch (type) {
            case type === 'insertOne':
                result = await this.connection.insertOne(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw error);
                break;
            case type === 'insertMany':
                result = await this.connection.insertMany(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error=>throw error);
                break;
        }
        return result
    }

    async delete(preDef) {

        await this.init()
        const {type, data, options={}} = predef;
        let result;

        switch (type) {
            case type === 'deleteOne':
                result = await this.connection.deleteOne(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw error);
                break
            case type === 'deleteMany':
                result = await this.connection.deleteMany(data, options)
                    .then(this.client.mongoCloseConnection())
                    .catch(error => throw error);
                break;
        }
        return result
    }

    async update(preDef){

        await this.init()
        const {filter, data, type, options={}} = preDef
        let result;

        switch (type) {
            case type === 'upDateOne':
                result = this.connection.updateOne(filter, data, options).then(this.client.mongoCloseConnection());
                break;
            case type === 'replaceOne':
                result = this.connection.replaceOne(filter, data, options).then(this.client.mongoCloseConnection());
                break;
        }
    }

}
