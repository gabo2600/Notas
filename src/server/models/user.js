const query = require('../db');

class User{
    constructor(){
        this.tab = " user ";
    }

    async Crear(email,user_name,pass,pub){
        let sql = "INSERT INTO "+this.tab+" VALUES(null, ? , ? , ? , ? )"
        var err = [];
        let tmp = await query("SELECT * FROM "+this.tab+" WHERE email = ?",[email]);
        //Si no hay alguien con un email igual ya registrado
        if (tmp[0].length!=0){
            //Si no hay alguien con el mismo nombre de usuario
            err.push("Correo ya registrado");
        }
        tmp = await query("SELECT * FROM "+this.tab+" WHERE user_name = ?",[user_name]);
        if (tmp[0].length != 0){
            //Se guarda el usuario
            err.push("Nombre de usuario ya registrado");
        }
        if (err.length==0){
            query(sql,[email,user_name,pass,pub]);
        }
        return err;        
    }

    async Modificar(nemail,email,user_name,pass,pub){
        let sql = "UPDATE "+this.tab+" SET email=?, user_name=?,pass=?,public=? WHERE email = ?"
        var err = [];
        let tmp = await query("SELECT * FROM "+this.tab+" WHERE email = ?",[nemail]);
        //Si no hay alguien con un email igual ya registrado
        if (tmp[0].length!=0){
            //Si no hay alguien con el mismo nombre de usuario
            err.push("Correo ya registrado");
        }
        tmp = await query("SELECT * FROM "+this.tab+" WHERE user_name = ? AND NOT email=? ",[user_name,email]);
        if (tmp[0].length != 0){
            //Se guarda el usuario
            err.push("Nombre de usuario ya registrado");
        }
        if (err.length==0){
            query(sql,[nemail,user_name,pass,pub,email]);
        }
        return err;
    }
    async Borrar(email){
        let sql = "DELETE FROM "+this.tab+" WHERE email=?";
        query(sql,[email]);
    }

    async Consultar(email=undefined){
        let sql = "SELECT * FROM "+this.tab;
        if (email != undefined){
            sql = sql+" WHERE email= ? ";
        }
        var res = await query(sql,[email]); 
        return res[0];
    }
};
module.exports = User;