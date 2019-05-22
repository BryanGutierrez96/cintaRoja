const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./User");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/v1/create/user", (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  const newUser = User({
    nombre,
    apellido,
    email,
    contraseña
  });
  newUser.save((err, user) => {
    !err ? res.status(201).send(user) : res.status(409).send(err);
  });
});
app.get("/api/v1/get/user/:userId", (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .exec()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(409).send(err);
    });
});
app.put("/api/v1/update/user/:userId", (req, res) => {
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
    .exec()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(409).send(err);
    });
});
app.delete("/api/v1/delete/user/:email", (req, res) => {
  const { email } = req.params;
  User.findOneAndUpdate(email, { $set: { actividad: false } }, { new: true })
    .exec()
    .then(user => {
      res
        .status(200)
        .send(`El usuario ${email} ha sido elimidado satisfactoriamente`);
    })
    .catch(err => {
      res.status(409).send(err);
    });
});

app.listen(PORT, () => {
  console.log("Server on");
});
