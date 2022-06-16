// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            query: () => '/household/todolist',
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/household/todolist',
                method: 'POST',
                body: todo,
            }),
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/household/todolist/${todo.id}`,
                method: 'PATCH',
                body: todo,
            }),
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/household/todolist/${id}`,
                method: 'DELETE',
                body: id,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = api;
