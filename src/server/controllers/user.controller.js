const user = require('../models/user.model');
const sesion = require('../models/sesion.model');
const Controller = require("./controller");

class UC extends Controller{

	constructor(){
		super();
		this.user = new user();
		this.sesion = new sesion();
	}
	
	async Crear(email,user_name,pass,pub){
		let err = [];
		if (email!=undefined && pass!=undefined && user_name!=undefined && pub!= undefined)
		{
			email = this.cleanStr(email);
			user_name = this.cleanStr(user_name);
			pass = this.cleanStr(pass);
			pass = this.enc(pass);
			
			if (pub == 1)
				pub = true;
			else
				pub=false;
			
			err = await this.user.Crear(email,user_name,pass,pub);
		}
		else
			err.push("Datos incorrectos");
		
		if (err.length>0){
			return err;
		}
		else{
			return [];
		}
	}

	async Modificar(nemail,email,user_name,pass,npass,pub){
		let err = [];
		if (nemail!=undefined && email!=undefined && user_name!=undefined && pass!=undefined && npass!=undefined && pub!=undefined)
		{
			email = this.cleanStr(email);
			user_name = this.cleanStr(user_name);
			pass = this.cleanStr(pass);
			pass = this.enc(pass);
			if (npass == undefined || npass == '')
			{
				npass = pass;
			}
			else
			{
				npass = this.cleanStr(npass);
				npass = this.enc(npass);
			}

			err = await this.user.Modificar(nemail,email,user_name,pass,npass,pub);
		}
		else
			err.push("Datos incorrectos");
		if (err.length>0){
			return err;
		}
		else{
			return [];
		}
	}

	async Consultar(email,hash=undefined){
		let data = undefined;
		hash = await this.sesion.Consultar(hash);

		if (hash!=undefined){
			if (hash.email == email)
				data = await this.user.Consultar(email,hash);
		}
		else
			data = await this.user.Consultar(email);
		return data;
	}



	async Borrar(email,pass){
		let err = [];
		if (email!=undefined && pass != undefined){
		email = this.cleanStr(email);
		pass = this.cleanStr(pass);
		pass = this.enc(pass);
		
		err = await this.user.Borrar(email,pass);
		}
		else{
			err.push("Datos incorrectos");
		}
		return err;
	}

	async login(email,pass){
		email = this.cleanStr(email);
		pass = this.cleanStr(pass);
		pass = this.enc(pass);

		return await this.sesion.Crear(email,pass);
	}

} 

module.exports = UC;

