import React from 'react';
// import styles from './JsonServerTest.module.css';
import { useState } from 'react';
import {
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from '../../features/api/jsonServerApiDev/jsonServerApiDev';

import Screen from '../../components/Screen/Screen';

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
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo('');
    };

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter a new todo item</label>
            <div className='new-todo'>
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
                <article key={todo.id}>
                    <div className='todo'>
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodo({
                                    ...todo,
                                    completed: !todo.completed,
                                })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                        <button
                            className='trash'
                            onClick={() => deleteTodo({ id: todo.id })}
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
        <Screen>
            <h1>Todo Liste</h1>
            {newItemSection}
            {JSON.stringify(todos)}
            {content}
        </Screen>
    );
};

export default TodoList;

// import React from 'react';
// import { useGetTodolistQuery } from '../../services/atHome';
// import { InputGroup, Form, Button } from 'react-bootstrap';
// import { useState, useEffect } from 'react';

// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

// // import './Pokemon.module.css';

// const TodoList = () => {
//     const [pokemonName, setPokemonName] = useState('1');
//     // Using a query hook automatically fetches data and returns query values
//     // const { data, error, isLoading } = useGetPokemonByNameQuery('charizard');
//     const { data, error, isLoading } = useGetTodolistQuery();
//     // Individual hooks are also accessible under the generated endpoints:
//     // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

//     useEffect(() => {
//         console.log('useEffect- pokemonName: ', pokemonName);
//     });

//     return (
//         <>
//             <Header />
//             <main>
//                 <h1>Hello</h1>
//             </main>
//             <Footer />
//         </>
//     );
// };

// export default TodoList;
