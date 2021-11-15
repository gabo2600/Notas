const note = require('../models/note.model');
const sesion = require('../models/sesion.model');
const Controller = require("./controller");

class NC extends Controller {
    constructor(){
        super();
        this.note = new note();
        this.sesion = new sesion();
    }

    Crear()
    {
        date = date.toJSON().slice(0,10);
    }

    Consultar()
    {

    }

    Modificar()
    {

    }

    Borrar()
    {

    }
} 

module.exports = NC;