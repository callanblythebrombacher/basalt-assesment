import fs from 'fs'
import MongoCrud from "../crud";

class Seed{
    async fileReader(filePath) {
        console.log(filePath)
        let bufferData = fs.readFileSync(filePath)
        let stData = bufferData.toString()
        return JSON.parse(stData)
    }

    /**
     *
     * @param preDef {{databaseName:string, collectionName:string, filePath:string}}
     * @returns {Promise<void>}
     */
    async seedData(preDef){
        const {databaseName, collectionName, filePath} = preDef
        const crud = new MongoCrud(collectionName, databaseName)
        const data = await this.fileReader(filePath)

        const config = {
            type:'insertMany',
            data:data,
            options:{}
        }
        console.log(config)
        const result = await crud.write(config).then(result=>result).catch(error=>{return error})
        console.log(result)
    }
}


new Seed().seedData({databaseName:'test', collectionName:'agents', filePath:__dirname + '/data/agents.json'})
new Seed().seedData({databaseName:'test', collectionName:'organisations', filePath:__dirname + '/data/organisations.json'})
new Seed().seedData({databaseName:'test', collectionName:'listings', filePath:__dirname + '/data/listings.json'})
