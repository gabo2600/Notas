const user = require('./user');

var a = new user();

async function x(){
    //console.log(await a.Crear("qqq","sss","123",false));
    //console.log(await a.Modificar('aaa','ggg','qqqq','ttt',false));
    console.log(await a.Borrar('aaa'));
    console.log(await a.Consultar());
}

x();
