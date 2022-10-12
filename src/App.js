import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Alert from './components/Alert';
import { Suspense } from 'react';

const CoinPage = React.lazy(() => import('./pages/CoinPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='app'>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/coin/:id' element={<CoinPage />} />
            </Routes>
          </Suspense>
        </div>
        <Alert />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
