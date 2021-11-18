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
        let sql1 = "select idNote,nameN,cont,f_crea,f_mod from note NATURAL JOIN user WHERE email = ? AND nameN = ? AND NOT del=true AND pub=true";
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

    

    async Modificar(token,idNote,nameN,cont,pub,date){
        let sql1 = "UPDATE "+this.tab+" SET nameN=? ,cont=?,pub=?, f_mod=? WHERE idNote=?";
        let param = [nameN,cont,pub,date,idNote];
        let sql2 = "select note.idUser,idNote from note INNER JOIN user ON note.idUser=user.idUser where del=false AND user.idUser=? AND idNote=?";
        let param2 = [token.idUser,idNote];
        let tmp = undefined;

        tmp = await query(sql2,param2);
        if (tmp[0].length>0){
            await query(sql1,param);
            return [];
        }
        else
            return ["Nota no encontrada"];
    }

    async Borrar(idNote,token){ //Papelera de reciclaje
        let sql1 = "UPDATE "+this.tab+" SET del=true WHERE idNote=?";
        let sql2 = "select note.idUser,idNote from note INNER JOIN user ON note.idUser=user.idUser where del=false AND user.idUser=? AND idNote=?";
        let param = [idNote];
        let param2 = [token.idUser,idNote];
        let tmp=undefined;

        tmp = await query(sql2,param2);

        if (tmp[0].length>0){
            await query(sql1,param);
            return [];
        }
        else
            return ["Nota no encontrada"];

    }

    //Papelera

    async Consultar_Papelera(token){
        let sql = "SELECT * FROM note WHERE del=true AND idUser=?";
        let data = await query(sql,[token.idUser]);

        if (data[0].length>0)
            return data[0];
        else
            return undefined;
    }

    async Eliminar(idNote,token){ //Eliminacion individual
        let sql = "DELETE FROM note WHERE idNote=? AND idUser=?  AND del=true";
        let param = [idNote,token.idUser];
        let sql2 = "SELECT * FROM note WHERE idNote=? AND idUser=? AND del=true";

        let tmp = await query(sql2,param);

        if (tmp[0].length>0){
            await query(sql,param);
            return [];
        }else
            return ["Nota no encontrada"];
    }

    async Restaurar(idNote,token){ //Restaura notas individuales
        let sql = "UPDATE note SET del=false WHERE idNote=? AND idUser=? AND del=true";
        let param = [idNote,token.idUser];
        let sql2 = "SELECT * FROM note WHERE idNote=? AND idUser=? AND del=true";

        let tmp = await query(sql2,param);

        if (tmp[0].length>0){
            await query(sql,param);
            return [];
        }else
            return ["Nota no encontrada"];
    }

    async EliminarTodas(token){ //Eliminacion total
        let sql = "DELETE FROM note WHERE idUser=? AND del=true";
        let param = [token.idUser];

        await query(sql,param);
        return [];
    }

      
};
module.exports = Note;


