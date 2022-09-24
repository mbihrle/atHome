// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Todos', 'BankAccountsChildren'],
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
        getAllLastTransactionsForEachAccount: builder.query({
            query: () => `/bank-transactions/children/all_last_transactions`,
            providesTags: ['BankAccountsChildren'],
        }),
        getAllTransactionsByAccount: builder.query({
            query: (account_id) =>
                `/bank-transactions/children/all_transactions/${account_id}`,
            providesTags: ['BankAccountsChildren'],
        }),
        getLastTransactionByAccount: builder.query({
            query: (account_id) =>
                `/bank-transactions/children/last_transactions/${account_id}`,
            providesTags: ['BankAccountsChildren'],
        }),
        addTransaction: builder.mutation({
            query: (transaction) => ({
                url: `/bank-transactions/children/add-tran`,
                method: 'POST',
                body: transaction,
            }),
            invalidatesTags: ['BankAccountsChildren'],
        }),
        // payOffByAmount: builder.mutation({
        //     query: ({transaction}) => ({
        //         url: `/bank-accounts-children/${transaction.account.id}`,
        //         method: 'UPDATE',
        //         body: {transaction.transaction_value, transaction.tansaction_text }
        //     })
        // })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useGetAllLastTransactionsForEachAccountQuery,
    useGetAllTransactionsByAccountQuery,
    useGetLastTransactionByAccountQuery,
    useAddTransactionMutation,
} = api;
