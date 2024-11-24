import Main from '../../pages/main/main';

type AppProps = {
  foundPlacesCount: number;
}

function App({ foundPlacesCount }: AppProps): JSX.Element {
  return (
    <Main foundPlacesCount={foundPlacesCount} />
  );
}

export default App;
