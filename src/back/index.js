const express = require('express')
const app = express()
var bodyParser = require('body-parser')
//Morgan: Es un modulo que me permite ver en consola las peticiones que llegan del navergador a mi servidor
const morgan = require('morgan')
const path = require('path')
const {mongoose} = require('./database')
const jwt = require('jsonwebtoken')


let Cors = require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(Cors())


//Settings
//toma el puerto que me da el servicio de la nube
//sino existe me da el 3000 por defecto
app.set('port', process.env.PORT || 3001)

//Middlewares: Funciones que se ejecutan antes de llegar a las rutas
app.use(morgan('dev'));

//va a comprobar si el dato que envia es un formato json
app.use(express.json())


//app.use('/signup', express.static(path.join(__dirname, 'public')))
app.use('/signup', require('./routes/users.routes'))
//app.use('/signin', require('./routes/users.routes'))
//app.use('/signin',  express.static(path.join(__dirname, 'public')))


app.post('/signin', (req,res)=>{
    const user = {name}= req.body;
    console.log(user)
    const token = jwt.sign({user}, 'my_secret_key');
    res.json({
        token
    })
})

app.get('/protected',ensureToken,(req,res)=>{
    jwt.verify(req.token, 'my_secret_key', (err,data) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text: 'protected',
                data
            })
        }
    })
    
})
function ensureToken(req,res,next){
   const bearerheader = req.headers['authorization'];
   console.log(bearerheader)
   if(typeof bearerheader !== 'undefined'){
       const bearer = bearerheader.split(" ")
       const bearerToken = bearer[1]
       req.token = bearerToken;
       next()
   }else{
       res.sendStatus(403)
   }
}



//Routes de nuestro servidor
app.use('/productos',require('./routes/products.routes'))

//Statics files que van en la carpeta "public"

//app.use('/',express.static(path.join(__dirname, 'public')))
//app.use('/admin',express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`)
})