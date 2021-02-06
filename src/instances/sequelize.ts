import {Sequelize} from 'sequelize';

const db = 'expressapp';
const username = 'root';
const password = '';

export const sequelize = new Sequelize(db,username,password,{
    dialect:'mysql',
    port:3306
});

sequelize.authenticate();