import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { api } from '../features/api/atHomeApi/atHomeApi';
import { jsonApi as jsonApiDev } from '../features/api/jsonServerApiDev/jsonServerApiDev';
import { pokemonApi } from '../features/api/pokemonApi/pokemonApi';
import counterReducer from '../features/Counter/counterSlice';
import worldCupReducer from '../screens/WorldCup/worldCupSlice';
import { flagApi } from '../screens/WorldCup/flagApi';
import testReducer from '../screens/WorldCup/testSlice';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        counter: counterReducer,
        worldCup: worldCupReducer,
        zahl1: testReducer,
        [api.reducerPath]: api.reducer,
        [jsonApiDev.reducerPath]: jsonApiDev.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [flagApi.reducerPath]: flagApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
            jsonApiDev.middleware,
            pokemonApi.middleware,
            flagApi.middleware
        ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
