const note = require('../models/note.model');
const Controller = require("./controller");

class NC extends Controller {
    constructor(){
        super();
        this.note = new note();
    }

    Crear()
    {

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