const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UsersSchema = new Schema({
    name:{type: String, require: true},
    email:{type: String, require: true},
    pass:{type: String, require:true},
    date:{type: Date, default: Date.now}
})

//este metodo me devuelve la contraseña sifrada
UsersSchema.methods.encryptPassword = async (pass)=>{
    //genSalt es para saber cuantas veces voy a aplicar el logaritmo
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(pass,salt);
    return hash;
}

UsersSchema.method.matchPassword = async function(pass){
    //comparo la contraseña que me da el usuario con la que tengo en la base de datos
    return await bcrypt.compare(pass,this.pass)
}

module.exports = mongoose.model('Users',UsersSchema)