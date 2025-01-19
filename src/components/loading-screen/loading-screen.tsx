function LoadingScreen(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      background: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
    }}
    >
      <img src="../../../../img/spinner.gif" alt="" />
    </div>
  );
}

export default LoadingScreen;
