const ex = require("express");
const ctrl = require("../controllers/note.controller");
const R = ex.Router();
const note = new ctrl();

R.post("/",async (req,res)=>{ //Crear
    let token,nameN,cont,pub;
    token = req.body.token;
    nameN = req.body.nameN;
    cont = req.body.cont;
    pub = req.body.pub;
    let err;

    if (token!= undefined && nameN!=undefined && cont!=undefined && pub!=undefined){
        err = await note.Crear(token,nameN,cont,pub);
        //console.log(err);
        if (err.length>0)
            res.json({"code":200,msg:err[0]});
        else
        res.json({"code":200,msg:"Nota guardada con exito"});
    }
    else
        res.json({"code":400,msg:"Error: Datos incorrectos"});
});


R.get("/ver/:hash/:nota",async(req,res)=>{ //Read
    let nota,hash,data;
    hash = req.params.hash|| undefined;
    nota = req.params.nota;

    data = await note.Consultar(hash,nota);

    if (data!= undefined){
        res.json({"code":200,msg:data});
    }else{
        res.json({"code":400,msg:"Nota no encontrada"});
    }
});

R.get("/index/:hash/:email?",async(req,res)=>{ //Read
    let email,hash,data;
    email = req.params.email;
    hash = req.params.hash|| undefined;
    data = await note.ConsultarTodas(email,hash);

    if (data!= undefined){
        res.json({"code":200,msg:data});
    }else{
        res.json({"code":400,msg:"Este usuario no tiene notas o sus notas son privadas"});
    }
});

R.put("/",async (req,res)=>{ //Update
    let token,nameN,cont,pub,idNote;
    token = req.body.token;
    idNote = req.body.idNote;
    nameN = req.body.nameN;
    cont = req.body.cont;
    pub = req.body.pub;
    let err;
    if (token!=undefined && idNote!=undefined && nameN!=undefined && cont!=undefined && pub!=undefined){
        
        err = await note.Modificar(token,nameN,cont,pub,idNote);
        if (err.length>0)
            res.json({"code":200,msg:err[0]});
        else
        res.json({"code":200,msg:"Nota guardada con exito"});
    }
    else
        res.json({"code":400,msg:"Error: Datos incorrectos"});
});

R.delete("/:hash/:idNote",async(req,res)=>{ //Delete
    let {hash,idNote} = req.params;
    let err = await note.Borrar(idNote,hash);
    if (err.length>0)
        res.json({"code":400,msg:"Error al borrar nota"});
    else
        res.json({"code":200,msg:"Nota eliminada con exito"});
});

module.exports =R;
