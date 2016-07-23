# koa2knex simplest api framework 

Based on [koa v2-boilerplate](https://github.com/geekplux/koa2-boilerplate).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Not recommended for serious projects, mostly written with educational goals. Uses ES6 syntax and async/await 

## Installation

Both ways you can start:

    git clone

#### Setup

    npm install

#### Database connection
    Edit ./config/db.json
    
#### Seed the Database with sample data    
    npm install knex -g
    knex migrate:latest
    OR
    node ./node_modules/knex/lib/bin/cli.js migrate:latest

#### Rollback the Database seeding
    knex migrate:rollback
    OR
    node ./node_modules/knex/lib/bin/cli.js migrate:rollback
    
#### Start

    npm start

#### Test

    npm test


#### Develop

##### Global objects
    _ - lodash
    knex - ORM for SQL queries
    models - object containing all models
    each model by its name (User, Sample, etc.)

##### MiddleWares

Custom middleware created in './api/middlewares/custom.js'

##### Models

###### All models should define in ./api/models
###### All models are globally defined

    import DefaultModel from '../defaults/DefaultModel';

    const _settings = {
        tableName: 'sample',
    };

    class Sample extends DefaultModel {
        constructor() {
            super(_settings.tableName);
        }
    }

    const sample = new Sample();
    
    export default sample;

###### For each model automatically will set default routes 

GET /sample/ - list all
GET /sample/:id - get one by id
POST /${pathName}/add - request body: json
POST /${pathName}/update/:id - request params: id, body: json
POST /${pathName}/delete/:id - request params: json

##### Controllers

Custom defined routes stored in ./api/config/routes.json

    {
      "get": {
        "/user/getByName": "UserController.getByFullName"
      }
    }

"get" - request type
"/user/getByName" - path name
"UserController.getByFullName" - controller.method path

    /user/getByName?first_name=John&last_name=Smith    

See "./api/models/Users.js" and "./api/controllers/UserController.js" For sample route "/user/getByName"