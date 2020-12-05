import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// import clockReducer from '../lib/slices/clockSlice'
// import counterReducer from '../lib/slices/counterSlice'
// import notesReducer from '../lib/slices/notesSlice'

import initStore from '../store'

const MyApp = ({ Component, pageProps }) => {

  const reduxStore = initStore(pageProps.preloadedState)

  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
