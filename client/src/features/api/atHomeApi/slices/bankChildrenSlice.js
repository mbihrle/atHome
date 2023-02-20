import { api } from '../atHomeApi';

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
    overrideExisting: false,
});

export const {
    useGetAllLastTransactionsForEachAccountQuery,
    useGetAllTransactionsByAccountQuery,
    useGetLastTransactionByAccountQuery,
    useAddTransactionMutation,
} = extendedApiSlice;
