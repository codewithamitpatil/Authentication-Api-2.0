


<br />
<p align="center">
  <a href="hhttps://amitfoundation.herokuapp.com/">
    <img src="logo2.png" alt="Logo" width="280" height="180">
  </a>

  <h1 align="center">Authentication Apis 2.0</h1>

  <p align="center">
    <br />
    Developed By : Amit Gujar Patil
    <br />  <br />  
    <a href="https://github.com/codewithamitpatil/Authentication-Rest-Apis-using-MEAN-Stack"><strong>Version 0.1 is here »</strong></a>
    <br />
    <br />

  </p>
</p>


## Data Flow

> Main Server  =>  Routes =>  Controllers =>  Services => Model    
> Main Server  <=  Routes <=  Controllers <=  Services <= Model    



## What I Did In This Repo ???

This is an Production Ready Authentication and Authorization System .<br/>
This project is built on REST Architecture on top of <br/>MVC AND 3 TIER ARCHITECTURE ,<br/> Along with all best practises.<br/>
<br>This project is hosted on Heroku

I created an creative 404 Error page <br/>
I took care of all security concerns <br/>
I implement Json Web Token Mechanisam <br/>
I implement Global Error Handler with exception email notifier <br/>
I implement Rate Limiter <br/>
I had do clean code with clean folder structure </br> 



## Folder Structure 

![authentication](https://user-images.githubusercontent.com/62344675/130203373-a5d7e00a-1c40-483f-9522-1caa3f56731f.png)



## API Documentation


[Postman api documentation](https://documenter.getpostman.com/view/11617094/TzY4fv9o)


## Features


 

> Authentication with JWT 
  - Login 
  - Register 
  - Logout
  - Reset Password
  - Forgot Password 
  - New Password
  
> Custom Error Logger

> Custom Server Monitior 

> Exception Email Notification

> Server Health Report

> Rate Limiter



## Technology

> Node Js

> Express Js

> MongoDb

> Redis

> JsonWebToken

> Winston Logger

> Express Status Monitor

## config File

{


    // for development
    const development = {
      env:'development',
      port: process.env.PORT || 3000,

      // for jwt
      private_access_key:"amit is the best",
      private_refresh_key:"amit is the best",

      // for otp
      optValidForTime : 5 ,// mins

      // for logger
      logLevel:'silly',
      logPath : './../logs/', 
      // for mongodb
      mongodb: 'mongodb://localhost:27017/Task_1',
      mongodbOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      // for redis
      redisDb:{
        port:6379,
        host:'127.0.0.1'
      },

      timeDelay:30,
      // for nodemailer
      nodemailerOptions:{
          service: "gmail",
          auth:{
                user: 'amitwebdev2019@gmail.com',
                pass: 'your password'
               } ,
          tls: {
                rejectUnauthorized: false
               }
      },
      adminMail:'amitwebdev2019@gmail.com',
      // static folder path
      publicFolder:'http://localhost:3001/'


    };

    // for production
    const production = {
      env:'production',
      // for jwt
      private_access_key:"amit is the best",
      private_refresh_key:"amit is the best",

      // for otp
      optValidForTime : 5 ,// mins

      logLevel:'silly',
      logPath : './logs/',
      port: process.env.PORT || 3001,
      mongodb:'connection url ',
      mongodbOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
        mongodbLogOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },

      timeDelay:30,

       // for redis
        redisDb:{
          port:,
          password:'',
          host:''
        },


      // for nodemailer
      nodemailerOptions:{
          service: "gmail",
          auth:{
                user: 'amitwebdev2019@gmail.com',
                pass: ''
               } ,
          tls: {
                rejectUnauthorized: false
               }
      },
      adminMail:'amitwebdev2019@gmail.com',
      // static folder path
      publicFolder:'https://apibuckets.herokuapp.com/'

    };


    const isProduction =true;

    if (isProduction){
       console.log('Production Env');
    }else{
       console.log('Development Env');
    }

    //loadtest -c 100 --rps 1000  https://apibuckets.herokuapp.com/1
    //heroku logs -t --app apibuckets

    // module exports
    module.exports = isProduction
      ? { ...production  }
      : { ...development };




}
