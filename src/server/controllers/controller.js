
class Controller{
    constructor(){
        this.salt = 'ReRT45e578vByOI76s4Evb';
    }


    encode(text){
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(this.salt).reduce((a, b) => a ^ b, code);
      
        return text
          .split("")
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join("");
    };
      
    decode(encoded){
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(this.salt).reduce((a, b) => a ^ b, code);
        return encoded
          .match(/.{1,2}/g)
          .map((hex) => parseInt(hex, 16))
          .map(applySaltToChar)
          .map((charCode) => String.fromCharCode(charCode))
          .join("");
      };
      

    cleanStr(str = undefined){
		if (str != undefined){
			let s = str.replace(/'/g,"");
			s = s.replace(/"/g,"");
			s = s.replace(/´/g,"");
			return s;
		}
		else
			return undefined;
	}

    enc(txt){
        let tmp = this.encode(txt);
        tmp = this.encode(tmp);
        tmp = this.encode(tmp);
        return this.encode(tmp);

    }

    dec(hash){
        let tmp = this.decode(hash);
        tmp = this.decode(tmp);
        tmp = this.decode(tmp);
        return this.decode(tmp);
    }
}


module.exports = Controller;