// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import {Route, Routes} from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Header from './components/Header/Header';

const tg = window.Telegram.WebApp;


function App() {

    const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  },[])


  return (
    <div className="App"> 
    <Header />
    <Routes>
      <Route index elemen={<ProductList />}/>
      <Route path={form}   elemen={<Form />}/>
    </Routes>

    </div>
  );
}

export default App;
