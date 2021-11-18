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

    async Modificar(token,nameN,cont,pub,idNote)
    {
        token = await this.sesion.Consultar(token)|| undefined;
        nameN = this.cleanStr(nameN);
        cont = this.cleanStr(cont);
        let date = new Date();
        let err = undefined;
        date = date.toJSON().slice(0,10);
        if (token!=undefined)
            err = await this.note.Modificar(token,idNote,nameN,cont,pub,date);
        else
            err = ["Usuario invalido"];
        
        return err;

    }

    async Borrar(idNote,token)
    {
        token = await this.sesion.Consultar(token)|| undefined;
        if (idNote!= undefined && token!=undefined)
            return await this.note.Borrar(idNote,token);
        else
            return ["datos incorrectos"];
    }



    //papelera

	async consultar_Papelera(token){
        token = await this.sesion.Consultar(token)|| undefined;
        if (token!= undefined)
            return await this.note.Consultar_Papelera(token);
        else
            return [];
	}


	async Borrar_Restaurar_Papelera(idNote,token,rest){
        token = await this.sesion.Consultar(token)|| undefined;

        if (token!= undefined && idNote!=undefined && rest!=undefined)
            if (rest == true)
                return await this.note.Restaurar(idNote,token);
            else
                return await this.note.Eliminar(idNote,token);
        else
            return ["Datos invalidos"];
	}

	async Vaciar_Papelera(token){
        token = await this.sesion.Consultar(token)|| undefined;

        if (token!=undefined){
            return await this.note.EliminarTodas(token);
        }
        else return ["Token invalido"];
	}
} 

module.exports = NC;