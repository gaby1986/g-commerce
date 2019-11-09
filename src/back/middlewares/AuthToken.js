const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    if(req.path != '/signin'){
        const bearerheader = req.headers['authorization'];
        console.log(bearerheader)
        if(typeof bearerheader !== 'undefined'){
            const bearerToken = bearerheader.split(" ")[1]
            req.token = bearerToken;
            jwt.verify(req.token,'my_secret_key', function(error,data){
                console.log(data)
                //if(error) return res.status(403).send({message: 'No tiene los permisos para estar aqui'})
                if(req.method != 'GET'){
                    if(data.role === 'admin') next();
                    else res.status(403).send({message: 'No sos admin'})
                }else{
                    next()
                }
            });
        }else{
            res.sendStatus(403)
        }
        

    }else next()
}