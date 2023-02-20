import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const flagApi = createApi({
    reducerPath: 'flagApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://flagcdn.com/de' }),
    endpoints: (builder) => ({
        getCountryList: builder.query({
            query: () => `/codes.json`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCountryListQuery } = flagApi;

//const baseCountry = {
//         id: 23,
//         code: 'be',
//         name: 'Belgien',
//         link: 'https://flagcdn.com/48x36/be.png',
//         size: '48x36',
//         width: '48',
//         height: '36',
//         groupId: 6,
//         groupListId: 3,
//         gamesPlayed: 0,
//         won: 0,
//         lost: 0,
//         drawn: 0,
//         goals: 0,
//         conceeded: 0,
//         goalDiff: 0,
//         points: 0,
//         rank: 1,
//         qualified: false,
//     };
