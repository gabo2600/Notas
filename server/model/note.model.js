const Factory = require("./model");

let mod = Factory.newModel('note',[
    'idNote INT NOT NULL AUTO_INCREMENT',
    'cont varchar(99) DEFAULT=""',
    'idUser INT NOT NULL'
],'idNote');

module.exports = mod;