// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  },[]);


  const onClose = () => { 
    tg.close();
  }
  return (
    <div className="App">
      <p>hyi pizda</p>
      <button> Click me!</button>
      <button onClick={onClose}>Close.</button>
    </div>
  );
}

export default App;
