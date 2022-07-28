const express = require('express');
const r = express.Router();
const noteC = require('../controller/note.ctrl');

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

r.get('/:idNote',async(req,res)=>{

});

r.post('/',async(req,res)=>{

});

r.put('/',async(req,res)=>{

});

r.delete('/',async(req,res)=>{

});



module.exports = r;
