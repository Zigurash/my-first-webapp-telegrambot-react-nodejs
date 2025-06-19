// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';


const tg = window.Telegram.WebApp;


function App() {

    const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  },[])


  return (
    <div className="App"> 
    <header></header>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
