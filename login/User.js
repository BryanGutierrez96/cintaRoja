const mongoose = require('mongoose')
const DB_URL='mongodb+srv://bryangutierrez:hola@cluster0-n8yrz.mongodb.net/login?retryWrites=true'
mongoose.connect(DB_URL, {useNewUrlParser:true},(err)=>{
    !err?console.log('DB conexion exitosa'):console.log(err);
})
const Schema = mongoose.Schema

const userSchema= new Schema ({
    nombre : {
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    contraseña:{
        type:Number,
        required:true,
    },
    actividad:{
        type:Boolean,
        default:true,
    },
})
const User=mongoose.model('User',userSchema)
module.exports={
    User
}