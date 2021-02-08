import express, { Router } from "express";
import { validationResult } from "express-validator/check";
import { TaskService } from '../services/task.service';
import { TaskAddModel } from '../models/task';

export const taskRouter = Router()

const taskService = new TaskService()

taskRouter.post('/task', (req: express.Request, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty)
        return res.status(422).json(errors.array())
    const data = req.body as TaskAddModel
    const task = taskService.createTask(data)

    return task.then(t => { res.json(t) })
})

taskRouter.get('/tasks', (_, res: express.Response) => {
    const tasks = taskService.getAllTask()
    return tasks.then(t => { res.json(t) })
})

taskRouter.delete('/task/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id)
    const deleteTask = taskService.deleteTask(id)
    return deleteTask.then(() => {
        res.status(200).send()
    })
})

taskRouter.put('/task/:id', (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id)
    const data = req.body as TaskAddModel
    const updateTask = taskService.updateTask(id, data)
    return updateTask.then(() => res.status(201).send({ message: "Updated" }))
})