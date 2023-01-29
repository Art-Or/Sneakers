import React from "react";
import {Link} from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
    const {totalPrice} = useCart();

    return (
        <header>
            <Link to="/"> 
            <div className="headerLeft"> 
                <img width={40} height={40} src="/img/logo.png" alt="Logo"/>
                <div className="headerInfo">
                    <h3>React Sneakers</h3>
                    <p>The best sneakers shop</p>
                </div>
            </div>
            </Link> 
            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img width={18} height={17} src="/img/cart.svg" alt="Cart" />
                        <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} height={17} src="/img/heart.png" alt="Favorites" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={17} src="/img/user.svg" alt="User" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;