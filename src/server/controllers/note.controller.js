const note = require('../models/note.model');
const sesion = require('../models/sesion.model');
const Controller = require("./controller");

class NC extends Controller {
    constructor(){
        super();
        this.note = new note();
        this.sesion = new sesion();
    }

    async Crear(token,nameN,cont,pub)
    {
        token = await this.sesion.Consultar(token)|| undefined;
        nameN = this.cleanStr(nameN);
        cont = this.cleanStr(cont);
        let date = new Date();
        let err = [];
        date = date.toJSON().slice(0,10);
        if (token!=undefined)
            err = await this.note.Crear(token,nameN,cont,pub,date,date);
        else
            err.push("Token incorrecto");
        return err;
    }

    async Consultar(email,nameN,hash)
    {
        email = this.cleanStr(email);
        nameN = this.cleanStr(nameN);
        hash = await this.sesion.Consultar(hash)||undefined;

        let data = await this.note.Consultar(email,nameN,hash);
        return data;
    }

    Modificar()
    {

    }

    Borrar()
    {

    }
} 

module.exports = NC;