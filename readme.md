# Bassalt Assesment App

## 1. &nbsp;About The App

### 1.1. &nbsp;Hosting
- the app is hosted on a aws lambda function:  <a href="https://x71l6czapd.execute-api.us-east-1.amazonaws.com/dev/">click to view</a> <br/> https://x71l6czapd.execute-api.us-east-1.amazonaws.com/dev/
- the db is hosted with atlas and linked to aws
- the app is a express monolith, which serves a react build through express 

### 1.2. &nbsp;Architecture and Design

#### 1.2.1. &nbsp;Folder Structure
     -src
        |-express-app
        |   |-core
        |   |   |-handlers
        |   |   |-helpers
        |   |   |-middleware
        |   |   |   |-validators
        |   |   |-mongo
        |   |   |   |-seed
        |   |   |       |-data
        |   |   |-routes
        |   |   |-services
        |   |-react-build
        |       |-static
        |-react-app
            |-public
            |-src
               |-components
               |   |-atoms
               |   |-molecules
               |   |-organisms
               |   |-templates
               |-redux
               |   |-store
               |   |-reducers
               |   |-thunk
               |-context
               |-assets
                   |-style
                   |-fonts

#### 1.2.2 Backend Architecture and Design
- Expressjs Rest Api with router -> handler -> service design pattern

### 1.2.3 Front End Architecture and Design
- ReactJs and Redux Architecture with a Atomic Design pattern 

### 1.2.4 Build and Deployment Process
- The app will execute the following during a build:
  - 1: &nbsp;Clean react build-file
  - 2: &nbsp;Run a react build
  - 3: copy react build files into `./exrpress-server/react-build` directory
  - 4: use webpack to bundle the express-server
- The app will execute the following during a deployment:
  - 1:execute a build
  - 2: if in development mode, the serverless framework will bundle the webpack bundle and serve it as a lambda function via localhost
  - 2: if in production mode, the serverless framework will bundle the webpack bundle and deploy a serverless zip to aws

## 2. Installation

- <h3 style="color:red"> important !! use node version 16.18.1 and npm verion 8.19.2 </h3>
### 2.1 Install serverless

run the following commands inside the root directory in your cli

1. ```npm install -g serverless```
2. ```npm run installl:all```
3. ```npm run dev``` to run on localhost
4. ```
   serverless config credentials \
   --provider aws \
   --key < Your Acces Key > \
   --secret <Your Access Secret >
   ```
5. ```npm run prod``` to deploy to aws

## 3. Postman Collection

- <a href="https://www.postman.com/callanblythebrom/workspace/bassalt-assesment"><h3 style="text-decoration:underline"> click here to view collection</h1></a><br/>
    https://www.postman.com/callanblythebrom/workspace/bassalt-assesment