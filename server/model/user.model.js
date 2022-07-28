const Factory = require("./model");

let mod = Factory.newModel('user',[
    'idUser INT NOT NULL AUTO_INCREMENT',
    'nom varchar(99) NOT NULL',
    'pass varchar(99) NOT NULL',
],'idUser');

module.exports = mod;