import React from "react";      
import { useTelegram } from "../../hooks/useTelegram";
import './Header.css';
import Button from '../Button/Button'



const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
      <div calssName={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
                <p>Привет!</p>
            </span>
        </div>

    );
}

export default Header;