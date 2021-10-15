const ex = require("express");
const ctrl = require("../controllers/model.controller");
const R = ex.Router();

R.get("/",(req,res)=>{
    
    res.json({"res":ctrl.index()});
});

module.exports =R;

/* DB
const model = require("./Server/models/model");
++++++++++++++++++CREACION+++++++++++++++++++

const Dato = new model({ name: 'Zildjian' });
Dato.save().then(() => console.log('Dato guardado exitosamente'));

+++++++++++++++++++READ++++++++++++++++++++++

Person.find((err, people) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(people);
});

Kitten.findOne(
    {color: "white", name: "Dr. Miffles", age: 1},
    {name: true, owner: true}, //Devuelve solo los campos "name" y "owner"
    (err, kitten) => {
        if (err) return res.status(200).send(err)
        return res.status(200).send(kitten)
    }
);
Kitten.findById(req.params.kittenId, (err, kitten) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(kitten)
});
Kitten.where("age").gte(1).lte(4).exec((err, kittens) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(kittens)
});

+++++++++++++++++++UPDATE++++++++++++++++++++
Todo.findByIdAndUpdate(
    // the id of the item to find
    req.params.todoId,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},
    
    // the callback function
    (err, todo) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
    }
)

+++++++++++++++++++DELETE++++++++++++++++++++

Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});


*/
