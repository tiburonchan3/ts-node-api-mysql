create database expressapp;

use expressapp;

create table users(
    id int auto_increment primary key,
    email text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);

create table tasks(
    id int auto_increment primary key,
    nombre text not null,
    status text not null,
    userID int not null,
    createdAt datetime,
    updatedAt datetime,
    constraint foreign key  userID references user(id)
)