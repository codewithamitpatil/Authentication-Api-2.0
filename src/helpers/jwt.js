
const jwt           = require('jsonwebtoken');
const httpErrors    = require('http-errors');
const redisClient   = require('./../db/init_redis');

// importing config
const { private_access_key, private_refresh_key  } = require('./../config/index');

// jwt middlewares
module.exports =
{
//  genrate access token
    SignAccessToken  : async function(data) {
        
        const { _id ,email ,username } = data;
        const uid = _id.toString();
        const mail = email;
        const  uname = username;

        return new Promise((resolve,reject)=>{
        
        const payload = { username:uname ,email:mail } ;

        const key     = private_access_key ;

        const options = {
                            issuer:'amit patil',
                            expiresIn:'1h',
                            audience:uid 
                        }
        
        //genrate jwt token                 
        jwt.sign(payload,key,options,(err,token)=>{
            if(err)
            {    
                console.log(err);        
            return reject(new httpErrors.InternalServerError());
            }
            return resolve(token);
        });

        });

    }
,
//  genrate and store refresh token in redis
    SignRefreshToken : async function(data) {
        

        const { _id ,email ,username } = data;
        
        const uid     =  _id.toString();
        const mail    =  email;
        const uname   =  username;

        return new Promise((resolve,reject)=>{
        
        const payload = { username:uname ,email:mail  } ;

        const key     = private_refresh_key ;

        const options = {
                            issuer:'amit patil',
                            expiresIn:'1y',
                            audience:uid 
                        }
                        

        //genrate jwt token                 
        jwt.sign(payload,key,options,(err,token)=>{
            
            if(err)
            {            
            return reject(new httpErrors.InternalServerError());
            }
            
            redisClient.set(uid,token,'EX',365*24*60*60,(errs,replay)=>{
                
                if(errs)
                {
                return reject(new httpErrors.InternalServerError());
                } 
                return resolve(token);

            });

            
            
        });

        });

    }
,
//  verify access token and send uid back (auth gard middleware)
    VerifyAccessToken : async (req,res,next)=>{
     
        const token = req.headers["authorization"];
        
        const key   = private_access_key;
        
        // verify token
        jwt.verify(token,key,(err,payload)=>{
            if(err)
            {
                return next(new httpErrors.Unauthorized());
            }
            req.payload = payload;
             next();
             return;
        });



    }
,
//  verify refresh token and send uid back 
    VerifyRefreshToken : async function(token)
   {

    return new Promise((resolve,reject)=>{
    
       const key =  private_refresh_key ;

       jwt.verify(token,key,(err,payload)=>{
          
           if(err)
           {
      
              return reject(new httpErrors.Unauthorized());
           }
         
           const uid   =  payload.aud;
           const data  =  payload;

           redisClient.get(uid,(errs,value)=>{
               
              if(errs)
              {
                return reject(new httpErrors.Unauthorized());
              }

              if(token !== value)
              {
                return reject(new httpErrors.Unauthorized());
              } 
              
              return resolve(data);


           });

       })

    });

    }


}


























