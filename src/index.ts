import express from 'express';
import cors from 'cors';
import {userRouter} from './routes/user.routes';
import {taskRouter} from './routes/task.routes';
import {tokenGuard} from './middlewares/token-guard';

const app = express();

const port = 4001;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())
app.use('/',userRouter)
app.get('/hello', (req: express.Request, res: express.Response) => {
    res.json("Hello world")
});

app.use(tokenGuard())
app.use('/',taskRouter)
app.get('/hello-restricted', (req: express.Request, res: express.Response) => {
    res.json("Hello world restricted")
});

app.listen(port,()=>{
    console.log(`App is listening in  http://localhost:${port}`)
})