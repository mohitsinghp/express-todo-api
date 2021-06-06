const {getDatabase} = require('./mongo');

const collectionName = 'todos';

async function insertTodo(todo) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(todo);
    return insertedId;
}

async function getTodos() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    insertTodo,
    getTodos
}