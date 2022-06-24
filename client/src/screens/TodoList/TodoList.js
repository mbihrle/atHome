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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    solid,
    // regular,
    // brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');

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
        addTodo({ title: newTodo });
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

            <button className={styles.submit}>
                <i className='fa-solid fa-arrow-up-from-bracket'></i>
                <FontAwesomeIcon icon={solid('arrow-up-from-bracket')} />
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
                    <div className={styles.todo}>
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
                        <button
                            className={styles.trash}
                            onClick={() => deleteTodo({ id: todo.todo_id })}
                        >
                            <i className='fa-solid fa-trash-can'></i>
                            <FontAwesomeIcon icon={solid('trash-can')} />
                        </button>
                        <label htmlFor={todo.todo_id}>{todo.title}</label>
                    </div>
                </article>
            );
        });
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <Screen>
            <div className={styles.todoScreen}>
                <h1>Todo Liste</h1>
                {newItemSection}
                {/* {JSON.stringify(todos)} */}
                {content}
            </div>
        </Screen>
    );
};

export default TodoList;
