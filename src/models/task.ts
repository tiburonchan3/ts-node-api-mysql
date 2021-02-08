import * as Sequelize from 'sequelize';
import {sequelize} from '../instances/sequelize';
import {User} from './user';

export interface TaskAddModel{
    nombre:string
    status:boolean
    userID:number
}

export interface TaskModel extends Sequelize.Model<TaskModel,TaskAddModel>{
    id:number
    nombre:string
    status:boolean
    createdAt:string
    updatedAt:string
    userID:number
}

export interface TaskViewModel{
    id:number
}

export const Task = sequelize.define<TaskModel, TaskAddModel>('task',{
    nombre:Sequelize.STRING,
    status:Sequelize.BOOLEAN,
    userID:{
        type:Sequelize.UUID,
        references:{
            model:'user',
            key:'id'
        }
    },
});

User.hasMany(Task,{foreignKey:'userID', as:'task'})
Task.belongsTo(User,{as:'user',foreignKey:'userID'})


