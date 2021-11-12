const user = require('./user');
const note = require('./note');
const Ses = require('./sesion');


var u = new user();
var n = new note();
var s = new Ses();


/*
async function USER(){
    console.log(await u.Crear("k2k","w2w","566",false));
    //console.log(await u.Modificar('aaa','ggg','qqqq','ttt',false));
    //console.log(await u.Borrar('aaa'));
    console.log(await u.Consultar());
}

USER();


async function NOTE(){
    console.log(await n.Crear("qqq","sss","123",false));
    console.log(await n.Modificar('aaa','ggg','qqqq','ttt',false));
    console.log(await n.Borrar('aaa'));
    console.log(await n.Consultar());
}

//NOTE();

*/

async function S(){
    //console.log(await s.Crear("qqq","123"));
    //s.Crear("qqq","123");
    //s.BorrarTodas();
    console.log(await s.Modificar('78504467887'));
    console.log(await s.BorrarTodas());
    console.log(await s.Consultar('78504467887'));
}

S();
