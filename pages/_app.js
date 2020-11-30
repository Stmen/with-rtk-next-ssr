import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import clockReducer from '../lib/slices/clockSlice'
import counterReducer from '../lib/slices/counterSlice'
import notesReducer from '../lib/slices/notesSlice'

import store from '../store'

const MyApp = ({ Component, pageProps }) => {

    let n = configureStore({
      reducer: {
        counter: counterReducer,
        clock: clockReducer,
        notes: notesReducer,
      },
      devTools: true,
      preloadedState: pageProps.preloadedState
  })

  console.log(n)

  return (
    <Provider store={n}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
