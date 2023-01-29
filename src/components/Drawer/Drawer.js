import React from "react";
import axios from "axios";

import styles from "./Drawer.module.scss"

import Info from "../info.jsx";
import {useCart} from "../../hooks/useCart.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async() => {
        try {
            setIsLoading(true);
            const {data} = await axios.post("https://63bc4726fa38d30d85c2e4cd.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("/cart/" + item.id);
                await delay(1000);
            }

            setIsLoading(false);
        } catch (error) {
            alert("Cannot create an order!")
        }   
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : styles.overlayHidden}`}>
            <div className={styles.drawer}>
                <h2>Cart<img onClick={onClose} className="removeBtn" src="/img/btnRemove.svg" alt="Close" /></h2>

                {items.length > 0 ? (
                    <div className="cart">
                        <div className="items">
                            {items.map((obj) => {
                                return (
                                <div key ={obj.id} className="cartItem">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div>
                                        <p>{obj.title}</p>
                                        <b>{obj.price}</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btnRemove.svg" alt="Remove" />
                                </div>
                                )
                            })}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                <span>Total:</span>
                                <div></div>
                                <b>{totalPrice} rub</b>
                                </li>
                                <li>
                                <span>Tax 5%:</span>
                                <div></div>
                                <b>{(totalPrice * 0.05).toFixed(2)} rub</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenBtn">Buy<img src="/img/arrow.svg" alt="Arrow"/></button>
                        </div>
                    </div>   
                ) : (
                    <Info 
                        title={isOrderComplete ? "Заказ оформлен!" : "Cart is empty"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                        image={isOrderComplete ? "/img/complete-order.jpg" : "/img/emptyCart.png"}
                    />
                )}
            </div>
        </div>
    )
};

export default Drawer;

