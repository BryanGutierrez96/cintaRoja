const mongoose = require("mongoose")
const DB_URL = "mongodb+srv://bryangutierrez:hola@cluster0-n8yrz.mongodb.net/productos?retryWrites=true"
mongoose.connect(DB_URL, {useNewUrlParser: true},(err)=>{
    !err?console.log("Db conexion exitosa"):console.log(err);
});
const Schema=mongoose.Schema

const articuloShema = new Schema ({
    nombre:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    precio:{
        type:Number,
        required:true
    },
    categoria:{
        type:String,
        enum:["Hogar","Jugueteria","Fantasia","Ropa"]
    },
    actividad:{
        type:Boolean,
        default:true
    }
    
});

const Articulo = mongoose.model("Articulo", articuloShema)

module.exports={
    Articulo
}