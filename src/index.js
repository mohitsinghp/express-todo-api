const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const todos = [
    {title: 'Code the todo in express'}
];

app.use(helmet());
app.use(express());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send(todos);
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});