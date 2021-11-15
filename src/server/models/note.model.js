const query = require('../db');

class Note{
    constructor( ){
        this.tab = "note";
    }
    async Crear(token,nameN,cont,pub,f_crea,f_mod){
        let sql = "INSERT INTO "+this.tab+" VALUES(null,?,?,?,?,?,?,?)";
        let data = [nameN,cont,pub,f_crea,f_mod,false,token.idUser];
        let sql2 = "SELECT * FROM user WHERE idUser=?";
        let sql3 = "SELECT * FROM note WHERE nameN=? AND idUser=?";
        let data3 = [nameN,token.idUser];
        let tmp;
 
        try{    
            tmp = await query(sql2,[token.idUser]);
            if (tmp[0].length > 0  ){
                tmp = await query(sql3,data3);
                console.log(tmp[0].length);
                if (tmp[0].length == 0){
                    await query(sql,data);
                    return [];
                }
                else
                    return ["Ya existe una nota con ese nombre"];
            }
            else
                return ["Usuario no encontrado"];
        }
        catch(err){
            //console.log(err);
            return [err.message];
        }
    }

    async Consultar(email,nameN,hash=undefined){
        //Nota publica
        let sql1 = "select nameN,cont,pub,f_crea,f_mod from note NATURAL JOIN user WHERE email = ? AND nameN = ? AND NOT del=true AND pub=true";
        //Nota privada
        let sql2 = "select nameN,cont,pub,f_crea,f_mod from note WHERE idUser = ? AND nameN = ? AND NOT del=true";

        let data = undefined;

        if (hash!=undefined && email==hash.email){ //Si es el dueño comprobable de la nota
            data = await query(sql2,[hash.idUser,nameN]);
        }
        else //Si es publica
            data = await query(sql1,[email,nameN]);
        if (data[0].length>0)
            data = data[0][0];
        else
            data = undefined;
        return data;
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


