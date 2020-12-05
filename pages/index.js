import { useDispatch, useSelector } from 'react-redux'
import initStore, { useGetPokemonByNameQuery } from '../store';
import Clock from '../components/clock'
import Counter from '../components/counter'
import { tick } from '../lib/slices/clockSlice'
import useInterval from '../lib/useInterval'
import { selectClock } from '../lib/slices/clockSlice';

const IndexPage = (props) => {
  const clock = useSelector(selectClock);
  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: clock.lastUpdate + 1000 }))
  }, 1000);

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <>
      <Clock />
      <Counter />
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  )
}

export function getServerSideProps() {
  const store = initStore({
    counter: 0,
    clock: {
      lastUpdate: 0,
      light: false,
      pokemonApi: ""
    }
  });
  store.dispatch(tick({ light: false, lastUpdate: Date.now() + 10000000}));

  return {
    props: {
      preloadedState: store.getState()
    }
  }
}

export default IndexPage
