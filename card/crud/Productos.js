const express = require("express");
const bodyParser = require("body-parser");
const { Articulo } = require("./models/Articulo");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Crud del articulo
app.post("/api/v1/create/articulo", (req, res) => {
  const { nombre, descripcion, precio, categoria } = req.body;
  const newArticulo = Articulo({
    nombre,
    descripcion,
    precio,
    categoria
  });
  newArticulo.save((err, articulo) => {
    !err ? res.status(200).send(articulo) : res.status(409).send(err);
  });
});

app.get("/api/v1/get/articulo/:articuloId", (req, res) => {
  const { articuloId } = req.params;
  Articulo.findById(articuloId)
    .exec()
    .then(articulo => {
      res.status(200).send(articulo);
    })
    .catch(err => {
      res.status(409).send(err)
    });
});

app.put("/api/v1/update/articulo/:articuloId",(req,res)=>{
    const {articuloId}=req.params
    Articulo.findByIdAndUpdate(articuloId,{$set:req.body},{new:true})
    .exec()
    .then(articulo=>{
        res.status(200).send(articulo)
    }).catch(err=>{
        res.status(409).send(err)
    })
})

app.delete("/api/v1/delete/articulo/:articuloId",(req,res)=>{
    const {articuloId}=req.params
    Articulo.findByIdAndUpdate(articuloId, {$set:{actividad : false}},{new:true})
    .exec()
    .then(articulo=>{
        res.status(200).send(`el articulo ${articuloId} ha sido eliminado con éxito`)
    }).catch(err =>{
        res.status(409).send(err)
    })
})

app.listen(PORT,() => {
  console.log("Server on");
});
