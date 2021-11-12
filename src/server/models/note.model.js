const query = require('../db');

class Note{
    constructor( ){
        this.tab = "note";
    }

    async Crear(nameN,cont,pub,email){
        let sql = "INSERT INTO "+this.tab+" VALUES(null,?,?,?,?,?,false,?)";
        let sql2 = "SELECT * FROM "+this.tab+" WHERE email=? AND nameN=?";
        let err = [];
        let tmp = query(sql2,[email,nameN]);

        let date = new Date().toJSON().slice(0,10);

        if (tmp[0].length >=0){
            err.push("Ya existe una nota con el mismo nombre");
        }
        if (err.length==0){
            query(sql,[nameN,cont,pub,date,date,false]);
        }
        return err;
    }

    async Modificar(email,user_name,pass,pub){

    }

    async Borrar(email){ //Papelera de reciclaje

    }

    async Eliminar(email){ //Eliminacion individual

    }

    async EliminarTodas(email){ //Eliminacion total

    }

    async Consultar(idUser,nameN=undefined){
        let sql = "SELECT idNote,nameN,cont,note.pub,f_crea,f_mod,del,note.idUser FROM note inner join user ON note.idUser=user.idUser where note.del=false AND idUser=?";
        if (nameN == undefined){
            query(sql,[email]);
        }
        else {
            sql = sql+" AND nameN=?";
            query(sql,[idUser,nameN]);
        }
    }

    async ConsultarD(idUser){
        let sql = "SELECT idNote,nameN,cont,note.pub,f_crea,f_mod,del,note.idUser FROM note inner join user ON note.idUser=user.idUser where note.del=true AND idUser=?";
        query(sql,[idUser]);
    }
};
module.exports = Note;

/*
idNote int not null  auto_increment,
    nameN varchar(128) not null,
    cont text  not null,
    public bool  not null,
    f_crea date  not null,
    f_mod date  not null,
    del bool not null,
    idUser int  not null,*/
