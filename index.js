const express = require('express')
const app = express()
const {Sequelize, DataTypes} = require('sequelize')
const task = require('./models/task')
const TaskModel = require('./models/task')

app.use(express.json())

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my-database.db'
})

const tasks = TaskModel(sequelize, DataTypes)

app.set('view engine', 'ejs')


app.get('/tasks', async (req, res) =>{
    const allTasks = await tasks.findAll({})

    res.json({allTasks})
})

app.post('/tasks', async (req, res) => {
   const newTask = await tasks.create({
    description: req.body.description,
    done: req.body.done
   })
   
   res.json(newTask)
})

app.get('/tasks/:id', async(req, res) => {
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)

    res.json(task)
})

app.put('/tasks/:id', async(req, res) => {
    const taskId = req.params.id
    const body = req.body
    const task = await tasks.findByPk(taskId)
    task.update({description: body.description, done: body.done})

    res.json(task)
})

app.delete('/tasks/:id', async(req, res) => {
    const taskId = req.params.id
    const task = await tasks.destroy({where: { id: taskId}})
   
    res.send('Deleted')
})

app.listen(8080, () =>{
    console.log('Iniciando o servidor express')
})