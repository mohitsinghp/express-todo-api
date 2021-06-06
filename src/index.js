const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');
const { insertTodo, getTodos, deleteTodo } = require('./database/todos');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send(await getTodos());
});

app.post('/', async (req, res) => {
    const newTodo = req.body;
    console.log("This is not good" + newTodo);
    await insertTodo(newTodo);
    res.send({ message: 'New todo inserted.'});
})

app.delete('/:id', async (req,res) => {
    await deleteTodo(req.params.id);
    res.send({ message: 'Todo Removed.'});
})

app.put('/:id', async (req, res) => {
    const updateTodo = req.body;
    await updateTodo(req.params.id, updateTodo);
    res.send({ message: 'Todo Updated.'});
})

startDatabase().then(async () => {
    await insertTodo({
        title: "use mongo for in-memory database."
    });

    app.listen(3001, () => {
        console.log('listening on port 3001');
    });
});