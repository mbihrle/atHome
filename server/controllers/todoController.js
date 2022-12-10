import asyncHandler from 'express-async-handler';
import db from '../config/db.js';

// @desc Fetch all items from todo list
// @route GET /api/todos
// @access Public
const getTodos = asyncHandler(async (req, res) => {
    const todos = await db.select('*').from('todos');
    if (todos.length > 0) {
        res.json(todos);
    } else {
        res.status(404);
        throw new Error('No Todos found');
    }
});

//@desc Get todo by id
// @route get /api/todos/:id
// @access Public
const getTodosById = asyncHandler(async (req, res) => {
    const todo_id = req.params.id;
    const todo = await db.select('*').from('todos').where({ todo_id });
    if (todo.length > 0) {
        res.json(todo);
    } else {
        // res.status(404).json({ message: 'Todo not found' });
        res.status(404);
        throw new Error('Todo not found');
    }
});

// @desc post item to todo list
// @route POST /api/todos
// @access Public
const postTodo = asyncHandler(async (req, res) => {
    const { title, date_create } = req.body;
    console.log('req_body: ', req.body);
    const todo = await db.insert(req.body).into('todos').returning('*');
    if (todo) {
        res.json({
            inserted: `Todo #:${todo[0].todo_id}`,
        });
        // res.json(todo[0].todo_id);
    } else {
        res.status(500);
        throw new Error('Could not insert Todo');
    }
});

// @desc patch existing item of todo list
// @route PATCH /api/todos/:id
// @access Public
const patchTodo = asyncHandler(async (req, res) => {
    // console.log('params: ', req.params);
    const todo_id = req.params.id;
    const changes = req.body;
    console.log('todoid: ', todo_id);
    const count = await db('todos')
        .where({ todo_id })
        .update(changes)
    if (count) {
        res.json({
            updated: `Todo #:${todo_id}`,
        });
    } else {
        res.status(404);
        throw new Error(`Todo ${todo_id} not found`);
    }
});

// @desc delete existing item of todo list
// @route DELETE /api/todos/:id
// @access Public
const deleteTodo = asyncHandler(async (req, res) => {
    const todo_id = req.params.id;
    const count = await db('todos').where({ todo_id }).delete();
    if (count) {
        res.json({ deleted: `todo #:${todo_id}` });
    } else {
        res.status(404);
        res.json({ message: 'Todo not found' });
    }
});

export { getTodos, getTodosById, postTodo, patchTodo, deleteTodo };
