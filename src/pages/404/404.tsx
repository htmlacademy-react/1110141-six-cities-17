import { Link } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <div style={{ height: '100vh' }} className="page">
      <div className="page__main">
        <div className="page__main-container container">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', paddingTop: '100px' }} className="page__main-flex-box flex-box">
            <h1 style={{ textAlign: 'center', margin: '0', fontSize: '100px' }}>404</h1>
            <h3 style={{ textAlign: 'center', margin: '0' }}>Страницу мы не нашли, зато у нас есть танцующий помидор!</h3>
            <img style={{ margin: '0 auto', display: 'block' }} src="../../img/tomato.gif" alt="Page not found :(" />
            <Link style={{ textAlign: 'center', margin: '0', fontSize: '20px' }} to="/">Вернуться на главную</Link>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Page404;
