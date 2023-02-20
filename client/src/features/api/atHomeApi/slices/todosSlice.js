import { api } from '../atHomeApi';

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            query: () => '/todos',
            transformResponse: (res) =>
                res.sort((a, b) => b.todo_id - a.todo_id),
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.todo_id}`,
                method: 'PATCH',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = extendedApiSlice;
