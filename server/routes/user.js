const express = require('express');
const r = express.Router();
const usr = require("../controller/user.ctrl")

class pkg{
    code = 0;
    msg = '';
    data = undefined;

    constructor(code,msg='',data=undefined){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    getData(){
        return {code:this.code,msg:this.msg,data:this.data}
    }
}

/* GET users listing. */
r.get('/',async(req,res)=>{

});

r.get('/:idUsr',async(req,res)=>{

});

r.post('/:idUsr',async(req,res)=>{

});

r.put('/:idUsr',async(req,res)=>{

});

//Sesion

r.post('/login',async(req,res)=>{
  let {user,pass} = req.body;
  let token = await usuarioC.login(user,pass);
  if (token === undefined)
    res.render('user/login',{err:["usuario o contraseña incorrectos"]});
  else{
    res.cookie('data', token, {signed: true});
    res.redirect('/');
  }
});

r.get('/exit',async(req,res)=>{

});







  
module.exports = r;
