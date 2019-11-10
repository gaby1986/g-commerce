const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path != '/signin'){
        if( req.headers.authorization){
            console.log(req.headers)
            console.log('este es el token '+req.headers.authorization)
            let token = req.headers.authorization.split(" ")[1]
            jwt.verify(token,CONFIG.SECRET_TOKEN, function(error,decoded){
                let promiseback = new Promise((result, reject) =>{
                //console.log(decoded)
                    if(error) return reject(res.status(500).send({error}))
                    if(req.method != 'GET'){
                        if(decoded.role === 'admin') next();
                        else res.status(403).send({message: 'No sos admin'})
                    }else{
                        return result(next())
                    }     
                })
                return promiseback
               
            });
        }else{
            res.sendStatus(403)
        }
        

    }else next()
}