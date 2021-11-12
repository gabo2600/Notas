const query = require('../db');

class Ses{
    constructor( ){
        this.tab = "sesion";
    }

    async Crear(email,pass){
        console.log(email+"  pass :   "+ pass)
        let hash = undefined;
        let tmp;
        var date = new Date();
        var exp = new Date();
        exp.setDate(exp.getDate()+3);

        date = date.toJSON().slice(0,10);
        exp = exp.toJSON().slice(0,10);
        
        let sql = "SELECT * FROM user WHERE email=? AND pass=?"; //Comprueba datos
        let sql2 = "INSERT INTO "+this.tab+" VALUES(null,?,?,?,?)";
        let sql3 = "SELECT * FROM sesion WHERE h4sh=?"; //checa si hay otra sesion con el mismo hash


        var usr = await query(sql,[email,pass]);
        
        if (usr[0].length > 0){ //usuario y contraseña correctos
            do{
                hash = Math.floor(Math.random()*99999999999).toString();
                tmp = await query(sql3,[hash]);
            }while(tmp[0].length>0); //Mientras haya otro hash repetido este while no para
            await query(sql2,[usr[0][0].idUser,hash,date,exp]);
            return hash;
        }
        else {
            return hash;
        }
    }

    async Modificar(hash){ //Renovar
        let sql = 'UPDATE sesion SET f_ren=? WHERE h4sh=? ';
        let date = new Date();
        date.setDate(date.getDate() + 3);
        date = date.toJSON().slice(0,10);
        await query(sql,[date,hash]);
    }

    async Borrar(hash){ //Logout
        let sql = 'DELETE FROM sesion WHERE h4sh=?';
        await query(sql,[hash]);
    }

    async Consultar(hash){ //Eliminacion individual
        let sql = 'select user.idUser,email,user_name,idSes from user NATURAL JOIN sesion WHERE h4sh=? ';
        let res = await query(sql,[hash]);
        if (res[0].length > 0)
            return res[0][0];
        else
            return undefined;
            
    }

    async BorrarTodas(){ //Eliminacion total
        let sql = "DELETE FROM sesion WHERE f_ren<?";
        let date = new Date();
        date = date.toJSON().slice(0,10);
        query(sql,[date]);
    }
};




module.exports = Ses;





