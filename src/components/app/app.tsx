import Main from '../../pages/main/main';

type AppScreenProps = {
  foundPlacesCount: number;
}

function App({ foundPlacesCount }: AppScreenProps): JSX.Element {
  return (
    <Main foundPlacesCount={foundPlacesCount} />
  );
}

export default App;
