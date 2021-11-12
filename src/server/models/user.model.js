const query = require('../db');

class User{
    constructor(){
        this.tab = "user";
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
        if (err.length<1){
            query(sql,[email,user_name,pass,pub]);
            return [];
        }
        else
            return err;        
    }

    async Modificar(nemail,email,user_name,pass,npass,pub){
        let sql = "UPDATE "+this.tab+" SET email=?, user_name=?,pass=?,pub=? WHERE email = ? AND pass=?";
        let sql2 = "SELECT * FROM "+this.tab+" WHERE email = ? ";
        let sql3 = "SELECT * FROM "+this.tab+" WHERE user_name = ? AND NOT email=? ";
        let sql4 = "SELECT * FROM "+this.tab+" WHERE email=? AND pass=?";
        var err = [];


        let tmp = await query(sql2,[nemail]);
        //Si no hay alguien con un email igual ya registrado
        if (tmp[0].length!=0 && nemail!=email){
            err.push("Correo ya registrado");
        }

        tmp = await query(sql3,[user_name,email]);
        //Si no hay alguien con el mismo nombre de usuario que no sea el mismo usuario
        if (tmp[0].length != 0){
            //Se guarda el usuario
            err.push("Nombre de usuario ya registrado");
        }

        tmp = await query(sql4,[email,pass]);
        // Si el usuario y contraseña son correctos para el usuario a modificar
        if (tmp[0].length<1){
            err.push("Contraseña incorrecta");
        }

        //Si no hat errores
        if (err.length==0){
            query(sql,[nemail,user_name,npass,pub,email,pass]);
        }
        return err;
    }
    async Borrar(email,pass){

        let sql1 = "SELECT * FROM "+this.tab+" WHERE email=? AND pass=?";
        let sql2 = "DELETE FROM note WHERE idUser=?";
        let sql3 = "DELETE FROM sesion WHERE idUser=?";
        let sql4 = "DELETE FROM "+this.tab+" WHERE idUser=?";
        let tmp;
        let err = [];
        let idUser =0;
        //Obtiene el idUsuario y de pasada ve si existe
        tmp = await query(sql1,[email,pass]);
        if (tmp[0][0]!= undefined){
            idUser = tmp[0][0].idUser;
            await query(sql2,[idUser]);
            await query(sql3,[idUser]);
            await query(sql4,[idUser]);
        }
        else{
            err.push("Usuario no encontrado o contraseña incorrecta");
        }
        return err;
    }

    async Consultar(email,hash= undefined){

        let sql = "select email,user_name,pub,h4sh from "+this.tab+" natural join sesion where email=? and h4sh=?";
        let sqlAlt =  "select email,user_name,pub from "+this.tab+" where email=? AND pub=true";
        var res;

        if (hash!= undefined)
            res = await query(sql,[email,hash]);
        else
            res = await query(sqlAlt,[email]);
        return res[0];
    }
};
module.exports = User;