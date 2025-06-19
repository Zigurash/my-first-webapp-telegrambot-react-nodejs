import React from "react";      
import { useTelegram } from "../../hooks/useTelegram";


const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
      <div calssName={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>

    );
}

export default Header;