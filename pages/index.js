import { useDispatch, useSelector } from 'react-redux'
import store from '../store';
import Clock from '../components/clock'
import Counter from '../components/counter'
import { tick } from '../lib/slices/clockSlice'
import useInterval from '../lib/useInterval'
import { selectClock } from '../lib/slices/clockSlice';

const IndexPage = (props) => {
  console.log(props)
  const clock = useSelector(selectClock);
  console.log(clock);
  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: clock.lastUpdate + 1000 }))
  }, 1000)

  return (
    <>
      <Clock />
      <Counter />
    </>
  )
}

export function getServerSideProps(ctx) {
  const { dispatch } = store;
  dispatch(tick({ light: false, lastUpdate: Date.now() + 10000000}));

  return {
    props: {
      preloadedState: store.getState()
    }
  }
}

export default IndexPage
