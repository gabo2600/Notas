const jwt = require('jsonwebtoken');
const query = require('../db');

const secret = "SECREETT";

function jwtGen(param){
    return jwt.sign(param, secret, { expiresIn: '72h'});
}

function jwtDec(param){
    try{
        return jwt.verify(param,secret);}
    catch(e){
        console.log("Error : "+e.message);
        return undefined;
    }
}


class Ses{

    async Crear(email,pass){
        let token = undefined;        
        let sql = "SELECT * FROM user WHERE email=? AND pass=?"; //Comprueba datos
        var usr = await query(sql,[email,pass]);
        
        if (usr[0].length > 0){ //usuario y contraseña correctos            
            token = {
                "idUser":usr[0][0].idUser,
                "email":usr[0][0].email,
                "username":usr[0][0].user_name,
            };

            token = jwtGen(token,secret);
        }
        return token;
    }

    async Modificar(hash){ //Renovar
        hash = jwtDec(hash,secret);
        if (hash != undefined){
            let sql = "SELECT * FROM user WHERE idUser=?"; //Comprueba datos
            var usr = await query(sql,[hash.idUser]);
            if (usr[0].length > 0){ //usuario y contraseña correctos            
                hash = {
                    "hash":usr[0].idUser,
                    "email":usr[0].email,
                    "username":usr[0].email,
                };

                hash = jwtGen(hash,secret);
            }
            else
                hash = undefined;
            return hash;
        }else
            return undefined;
    }

    async Consultar(hash){
        return jwtDec(hash,secret);
    }
};




module.exports = Ses;





