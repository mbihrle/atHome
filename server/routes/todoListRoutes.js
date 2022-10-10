import express from 'express';
import asyncHandler from 'express-async-handler';
import colors from 'colors';
import db from '../config/db.js';
const router = express.Router();

// @desc fetch all items from todo list
// @route GET /api/todos
// @access Public
router.get(
    '/',
    asyncHandler(async (req, res) => {
        db.select('*')
            .from('todos')
            .then((todos) => {
                res.json(todos);
            });
    })
);

// @desc post item to todo list
// @route POST /api/todos
// @access Public
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { title, date_create } = req.body;
        db.insert(req.body)
            .into('todos')
            .returning('*')
            .then(res.send('success'));
        // .then(function (data) {
        //     res.send(data);
        // });
        // INSERT INTO table_name(column1, column2) VALUES(value_1, value_2)
        // SELECT * FROM table WHERE id = inserted_row
    })
);

//@desc get one item of todo list
// @route get /api/todos/:id
// @access Public
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        console.log('params: ', req.params);
        const todo_id = req.params.id;
        const todo = await db.select('*').from('todos').where({ todo_id });
        if (todo.length > 0) {
            res.json(todo);
        } else {
            // res.status(404).json({ message: 'Todo not found' });
            res.status(404)
            throw new Error('Todo not found')
        }
    })
);
//alternativ:
// router.get('/:id', asyncHandler(async (req, res) => {
//     console.log('params: ', req.params);
//     const todo_id = req.params.id;
//     db.select('*')
//         .from('todos')
//         .where({ todo_id })
//         .then((todos) => {
//             res.json(todos);
//         });
// }));

// @desc patch existing item of todo list
// @route PATCH /api/todos/:id
// @access Public
router.patch(
    '/:id',
    asyncHandler(async (req, res) => {
        // console.log('params: ', req.params);
        const todo_id = req.params.id;
        const changes = req.body;
        console.log('todoid: ', todo_id);
        try {
            const count = await db('todos').where({ todo_id }).update(changes);
            if (count) {
                res.status(200).json({ updated: count });
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        } catch (err) {
            res.status(500).json({
                message: 'Error updating todo',
                error: err,
            });
        }
    })
);

// @desc delete existing item of todo list
// @route DELETE /api/todos/:id
// @access Public
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const todo_id = req.params.id;
        try {
            const count = await db('todos').where({ todo_id }).delete();
            if (count) {
                res.status(200).json({ deleted: count });
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        } catch (err) {
            res.status(500).json({
                message: 'Error deleting todo',
                error: err,
            });
        }
    })
);

export default router;
