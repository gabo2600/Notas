drop database IF EXISTS notesDb;
CREATE DATABASE IF NOT EXISTS notesDb;

use notesDb;

CREATE TABLE IF NOT EXISTS note(
    idNote int not null  auto_increment,
    nameN varchar(128) not null,
    cont text  not null,
    pub bool  not null,
    f_crea date  not null,
    f_mod date  not null,
    del bool not null,
    idUser int  not null,
    primary key (idNote)
);

CREATE TABLE IF NOT EXISTS user(
    idUser int  not null auto_increment,
    email varchar(30)  not null,
    user_name varchar(30)  not null,
    pass varchar(1024)  not null,
    pub BOOL  not null,  
    primary key (idUser)
);
