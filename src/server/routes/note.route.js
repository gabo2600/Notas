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


R.get("/:email/:nota/:hash?",async(req,res)=>{ //Read
    let email,nota,hash,data;
    email = req.params.email;
    nota = req.params.nota;
    hash = req.params.hash|| undefined;

    data = await note.Consultar(email,nota,hash);

    if (data!= undefined){
        res.json({"code":200,msg:data});
    }else{
        res.json({"code":400,msg:"Nota no encontrada"});
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

R.delete("/:idNote/:hash",async(req,res)=>{ //Delete
    let {idNote,hash} = req.params;
    let err = await note.Borrar(idNote,hash);
    if (err.length>0)
        res.json({"code":400,msg:"Error al borrar nota"});
    else
        res.json({"code":200,msg:"Nota eliminada con exito"});
});

module.exports =R;