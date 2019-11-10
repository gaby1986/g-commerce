const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


router.post('/', (req,res)=>{
    let {email} = req.body
    let {password} = req.body
    //console.log(email)
    
    Users.findOne({email}).then(user =>{
        //console.log(user)
        if(!user) return res.status(404).send({message:'El usario no existe'})
        bcrypt.compare(password, user.pass)
        .then(match =>{
            console.log("esta es la pass " + password)
            console.log(match)
            if(match){
                payload = {
                    email: user.email,
                    role: user.role
                }
               // console.log(payload)
                jwt.sign(payload, 'my_secret_key', function(error,token){
                    console.log(token)
                    if(error){
                        res.status(500).send({error})
                    }else{
                        res.status(200).send({message: 'ACCESO', token})
                    }
                })
            }else{
                const tokenVacio = ''
                res.status(200).send({message: 'PASS INCORRECTA', tokenVacio})
            }
        }).catch(error =>{
            console.log(error);
            res.status(500).send({error})
        });
    })
        
        
})

module.exports = router;