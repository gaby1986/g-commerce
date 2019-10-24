const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const path = require('path')



router.post('/', async (req,res) =>{
    const {name, email, pass, confirm_pass} =  req.body;
    const newUser =  new Users({name, email, pass})
    if(pass != confirm_pass){
        console.log('Password dont match')
    }else{
        const emailUser = await Users.findOne({email: email}) 
        if(emailUser){
            console.log('ese email ya existe');
        }else{
            newUser.pass = await newUser.encryptPassword(pass)
            await newUser.save()
            console.log("estas registrado")
            res.json({})
        }
    }
})
/**router.post('/', async(req,res)=>{
    const {name, email, pass, confirm_pass} =  req.body
    const errors = []
    console.log(req.body)
    if(name.length <= 0){
        errors.push({text: 'Please insert your name'})
    }
    if(pass != confirm_pass){
        errors.push({text: 'Password dont match'})
    }
    if(pass.length < 4){
        errors.push({text: 'Password must be at least 4 characters'})
    }
    if(errors.length > 0){
        res.render('/signup', {name, email, pass, confirm_pass})
    }else{
       const emailUser = await Users.findOne({email:email})
       if(emailUser){
           req.flash('El email ya está en uso')
           res.redirect('/')
       }
       const newUser =  new Users({name, email, pass})
       newUser.pass = await newUser.encryptPassword(pass)
       await newUser.save()
       req.flash('success_msg', 'Estas registrado')
       res.redirect('/')
    }
})**/

module.exports = router;