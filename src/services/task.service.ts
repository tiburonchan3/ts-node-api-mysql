import * as BlueBird from 'bluebird';
import { json } from 'sequelize';
import { Task, TaskAddModel, TaskViewModel } from '../models/task';
import { User } from '../models/user';

export class TaskService {
    private static _task: any

    static get taskAttributes() {
        return ['id']
    }

    static get user() {
        return TaskService._task()
    }

    createTask({ nombre, status, userID }: TaskAddModel) {
        return Task.create({ nombre, status, userID }).then(u => {
            this.getTaskById(u!.id)
        });
    }
    getTaskById(id: number) {
        return Task.findByPk(id, {
            attributes: TaskService.taskAttributes
        }) as BlueBird<TaskViewModel>
    }
    getAllTask() {
        return Task.findAll({
            include: [{
                model: User, as: 'user',
                attributes: ['id', 'email']
            }], attributes: ['id', 'nombre', 'status']
        })
    }
    deleteTask(id: number) {
        return Task.destroy({ where: { id } })
    }
    updateTask(id: number, { nombre, status }: TaskAddModel) {
        return Task.update({
            nombre: nombre,
            status: status
        }, { where: { id } })
    }
}