
CREATE DATABASE IF NOT EXISTS notesDb;

use notesDb;

CREATE TABLE IF NOT EXISTS note(
    idNote int not null  auto_increment,
    cont text  not null,
    nameN varchar(128) not null,
    public bool  not null,
    f_crea date  not null,
    f_mod date  not null,
    idUser int  not null,
    primary key (idNote)
);

CREATE TABLE IF NOT EXISTS user(
    idUser int  not null auto_increment,
    email varchar(30)  not null,
    user_name varchar(30)  not null,
    pass varchar(1024)  not null,
    public BOOL  not null,  
    user_nn int  not null,
    primary key (idUser)
);

CREATE TABLE IF NOT EXISTS sesion(
    idSes int  not null auto_increment,
    idUser int  not null,
    f_crea date  not null,
    f_ren date  not null,
    primary key (idSes)
);