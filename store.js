import { configureStore } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import clockReducer from './lib/slices/clockSlice'
import counterReducer from './lib/slices/counterSlice'

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//     clock: clockReducer,
//     notes: notesReducer,
//   },
//   devTools: true,
// })

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi


export default function initStore(state = []) {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      clock: clockReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    devTools: true,
    preloadedState: state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  })

  return store;
}