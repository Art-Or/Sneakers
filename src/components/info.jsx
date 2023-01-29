import React from "react";
import AppContext from "../context";

const Info = ({image, title, description}) => {
    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className="cartEmpty">
            <img src={image} alt="emptyCart" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenBtn">
                <img src="/img/arrow.svg" alt="Arrow"/>
                    Вернуться назад
            </button>
        </div>
    )
}

export default Info;