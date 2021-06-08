const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { startDatabase } = require('./database/mongo');
const { insertTodo, getTodos, deleteTodo, updateTodo } = require('./database/todos');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

const users = [
    {
        username: 'steve',
        password: 'wonder321',
        role: 'admin'
    },
    {
        username: 'arnold',
        password: 'Abc123',
        role: 'member'
    }
];

const accessTokenSecret = 'youraccesstokensecret';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password});

    if(user) {
        const accessToken = jwt.sign({username: user.username, role: user.role }, accessTokenSecret);
         
        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            console.log(err);
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


app.post('/valid', authenticateJWT, async (req, res) => {
    res.send({ message: 'Valid Token'});
})

app.get('/', authenticateJWT, async (req, res) => {
    res.send(await getTodos());
});

app.post('/', authenticateJWT, async (req, res) => {
    const newTodo = req.body;
    await insertTodo(newTodo);
    res.send({ message: 'New todo inserted.'});
})

app.delete('/:id', authenticateJWT, async (req,res) => {
    const { role } = req.user;

    if(role !== 'admin') {
        return res.sendStatus(403);
    }
    await deleteTodo(req.params.id);
    res.send({ message: 'Todo Removed.'});
})

app.put('/:id', authenticateJWT, async (req, res) => {
    const updatedTodo = req.body;
    await updateTodo(req.params.id, updatedTodo);
    res.send({ message: 'Todo Updated.'});
})

startDatabase().then(async () => {
    await insertTodo({
        title: "Create a express todo.",
        status: "unchecked"
    });

    app.listen(3001, () => {
        console.log('listening on port 3001');
    });
});