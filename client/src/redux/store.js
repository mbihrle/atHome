import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import bankAccountsChildrenReducer from '../features/bankAccountsChildrenSlice';
import { api } from '../features/api/atHomeApi';
import {jsonApi} from '../features/api/jsonServerApi'
import { pokemonApi } from '../features/api/pokemonApi';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        bankAccountsChildren: bankAccountsChildrenReducer,
        [api.reducerPath]: api.reducer,
        [jsonApi.reducerPath]: jsonApi.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
            jsonApi.middleware,
            pokemonApi.middleware
        ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
