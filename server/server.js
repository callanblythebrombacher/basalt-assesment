import ServerlessHttp from "serverless-http";
import express from 'express';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV

console.log(environment)
const app = express()


app.get('/', function (req, res) {
    res.send('Hello World!')
})

switch (environment){
    case 'Production':
        dotenv.config({path:process.cwd() + '/.env.production'})
        break
    case 'Development':
        dotenv.config({path:process.cwd()+ '/.env.development'});
        const port = process.env.PORT || 8000
        const url = process.env.URL || ''

        app.listen(port, ()=>{
            console.log(`listening on ${url}:${port}`)
        })
        break
}


module.exports.handler = ServerlessHttp(app);