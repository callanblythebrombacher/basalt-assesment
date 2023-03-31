import ServerlessHttp from "serverless-http";
import express from 'express';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV


const app = express()


app.get('/', function (req, res) {
    res.send('Hello World!')
})

switch (environment){
    case environment === 'Production':
        dotenv.config({path:process.cwd() + '/.env.production'})
        break
    case environment === 'Development':
        dotenv.config({path:process.cwd()+'/.env.development'});

        const port = process.env.PORT
        const url = process.env.URL
        app.listen(port, ()=>{
            `listening on ${url}:${port}`
        })
        break
}

module.exports.handler = ServerlessHttp(app);