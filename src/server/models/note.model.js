const query = require('../db');

class Note{
    constructor( ){
        this.tab = "note";

    }
/*
idNote int not null  auto_increment,
    nameN varchar(128) not null,
    cont text  not null,
    public bool  not null,
    f_crea date  not null,
    f_mod date  not null,
    del bool not null,
    idUser int  not null,

    let date = new Date();
        date.setDate(date.getDate() + 3);
        date = date.toJSON().slice(0,10);

    */


    async Crear(nameN,cont,pub,f_crea,f_mod,idUser){
        sql = "INSERT INTO "+this.tab+" VALUES(null,?,?,?,?,?,?,?)";
        data = [nameN,cont,pub,f_crea,f_mod,false,idUser];
    }

    async Consultar(idUser,nameN=undefined){
        
    }

    

    async Modificar(email,user_name,pass,pub){

    }

    async Borrar(email){ //Papelera de reciclaje

    }

    async Eliminar(email){ //Eliminacion individual

    }

    async EliminarTodas(email){ //Eliminacion total

    }

      
};
module.exports = Note;


