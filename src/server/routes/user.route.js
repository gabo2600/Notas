const ex = require("express");
const userCtrl = require("../controllers/user.controller");
const noteCtrl = require("../controllers/note.controller");
const usr = new userCtrl();
const note = new noteCtrl();
const R = ex.Router();

R.get("/perfil/:email/:hash?",async (req,res)=>{ //consultar
    let email = req.params.email;
    let hash = req.params.hash;

    let data = await usr.Consultar(email,hash);
    if (data!= undefined)
        res.json({"code":200,"data":data});
    else
        res.json({"code":400});
});

R.post("/",async (req,res)=>{ //crear 
    let email = req.body.email;
    let user_name = req.body.user_name;
    let pass = req.body.pass;
    let Rpass = req.body.Rpass;
    let pub = req.body.pub;
    let err = [];
    if (email!=undefined && user_name!= undefined && pass!=undefined && pub!= undefined)
    {
        if (Rpass === pass)
            err = await usr.Crear(email,user_name,pass,pub);
        else
            err.push("Las contraseñas no coinciden");
    }
    else
        err.push("Datos incompletos");
    if (err.length>0){
        res.json({"code":400,"msg":err});
    }
    else
        res.json({"code":200,"msg": ["El usuario fue registrado exitosamente"]});
});

R.put("/",async (req,res)=>{ //modificar
    let email = req.body.email;
    let nemail = req.body.nemail;
    let pass = req.body.pass;
    let npass = req.body.npass;
    let npassR = req.body.npassR;
    let user_name = req.body.user_name;
    let pub = req.body.pub;
    let err = [];

    if (npass != npassR){
        err.push("La nueva contraseña no coincide con la comprobacion");
        res.json({"code":401,msg:err});
    }else{
        err = await usr.Modificar(nemail,email,user_name,pass,npass,pub);
        if (err.length>0)
            res.json({"code":402,msg:err});
        else
            res.json({"code":200,msg:['Datos modificados satisfactoriamente']});


    }
});

R.delete("/",async(req,res)=>{ //eliminar
    let email = req.body.email;
    let pass = req.body.pass;
    let err = await usr.Borrar(email,pass);
    if (err.length>0)
        res.json({"code":400,msg:err});
    else 
        res.json({"code":200,msg:["Usuario eliminado exitosamente"]});
});

//Extern

R.post("/login",async (req,res)=>{
    let email = req.body.email;
    let pass = req.body.pass;
    let hash = await usr.login(email,pass);

    if (hash == undefined)
        res.json({"code":400,msg:"El usuario o la contraseña son incorrectos"});
    else
        res.json({"code":200,msg:hash});
});

//Papelera de reciclaje

R.get("/papelera/:hash", async (req,res)=>{ //Ver todas las notas en papelera
    let hash = req.params.hash;
    let Data = await note.consultar_Papelera(hash);
    res.json({"code":200,"data": Data });

});

R.post("/papelera", async (req,res)=>{ // Restaurar/eliminar una
    // idNota, token,   rest( si es true que la restaure si no  que la elimine)
    let {idNote,hash,rest} = req.body;
    let err = await note.Borrar_Restaurar_Papelera(idNote,hash,rest);

    if (err.length >0)
        res.json({"code":400,"msg":err });
    else
        if (rest == true)
            res.json({"code":200,"msg":"Nota restaurada exitosamente"});
        else
            res.json({"code":200,"msg":"Nota eliminada exitosamente"});
});

R.delete("/papelera/:hash", async (req,res)=>{ //Borrarlo todo
    let hash = req.params.hash;
    let err = await note.Vaciar_Papelera(hash);
    if (err.length>0)
        res.json({"code":400,"msg":err });
    else
        res.json({"code":200,"msg":"Papelera vaciada exitosamente"});
});

module.exports =R;
