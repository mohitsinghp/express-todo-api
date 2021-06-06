const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');
const { insertTodo, getTodos } = require('./database/todos');

const app = express();

const todos = [
    { title: 'Code the todo in express' }
];

app.use(helmet());
app.use(express());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send(await getTodos());
});

startDatabase().then(async () => {
    await insertTodo({
        title: "use mongo for in-memory database."
    })
    app.listen(3001, () => {
        console.log('listening on port 3001');
    })
});