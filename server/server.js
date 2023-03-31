import ServerlessHttp from "serverless-http";
import express from 'express';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV

switch (environment){
    case environment === 'Production':
        dotenv.config({path:process.cwd() + '/.env.production'})
        break
    case environment === 'Development':
        dotenv.config({path:process.cwd()+'/.env.development'})
        break
}

const app = express()


app.get('/', function (req, res) {
    res.send('Hello World!')
})

module.exports.handler = ServerlessHttp(app);