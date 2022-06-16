import React from 'react';
import styles from './TodoList.module.css';
import { useState } from 'react';
import {
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from '../../features/api/atHomeApi';

import Screen from '../../components/Screen/Screen';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');
    console.log(Date.now());

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllTodosQuery();

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ title: newTodo, date_create: '2022-01-01' });
        setNewTodo('');
    };

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter a new todo item</label>
            <div className={styles.newTodo}>
                <input
                    type='text'
                    id='new-todo'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
            </div>

            <button className='submit'>
                <i className='fa-solid fa-arrow-up-from-bracket'></i>
            </button>
        </form>
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = todos.map((todo) => {
            return (
                <article key={todo.todo_id}>
                    <div className='todo'>
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodo({
                                    ...todo,
                                    completed: !todo.completed,
                                    date_change: '2099-01-01',
                                })
                            }
                        />
                        <label htmlFor={todo.todo_id}>{todo.title}</label>
                        <button
                            className='trash'
                            onClick={() => deleteTodo({ id: todo.todo_id })}
                        >
                            <i className='fa-solid fa-trash-can'></i>
                        </button>
                    </div>
                </article>
            );
        });
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <Screen className={styles.todoFont}>
            <h1>Todo Liste</h1>
            {newItemSection}
            {/* {JSON.stringify(todos)} */}
            {content}
        </Screen>
    );
};

export default TodoList;
