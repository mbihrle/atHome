import { api } from '../atHomeApi';

const extendedApiSlice = api.injectEndpoints({
    tagTypes:['User'],
    endpoints: (builder) => ({
        login: builder.query({
            query: (credentials) => ({
                url: `/users/login`,
                method: 'POST',
                body: credentials,
            }),
            providesTags: ['Users'],
        }),
        getUserEmails: builder.query({
            query: () => `/users`,
            // providesTags: ['Users'],
        }),
        getUserProfile: builder.query({
            query: () => `/profile`,
            // providesTags: ['Users'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginQuery, useGetUserEmailsQuery, useGetUserProfileQuery } =
    extendedApiSlice;
