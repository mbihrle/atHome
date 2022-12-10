import express from 'express';
const router = express.Router();
import {
    getTodos,
    getTodosById,
    postTodo,
    patchTodo,
    deleteTodo,
} from '../controllers/todoController.js';


router.route('/').get(getTodos)
router.route('/:id').get(getTodosById)
router.route('/').post(postTodo)
router.route('/:id').patch(patchTodo)
router.route('/:id').delete(deleteTodo)

export default router;
