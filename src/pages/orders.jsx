import axios from "axios";
import React from "react";
import Card from "../components/Card/Card.js";
import AppContext from "../context.js";


function Orders() {
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get("https://63bc4726fa38d30d85c2e4cd.mockapi.io/orders");
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]));
                setIsLoading(false);
            } catch (error) {
                alert("Cant open orders!");
                console.error(error);
            };

        })();
    }, []);

    return (

    <div className="content">
        <div className="contentTop">
          <h1 className="all">My orders</h1>  
        </div>

        <div className="sneakers">
          {(isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card 
                key={index}
                loading={isLoading}
                {...item}
            />
          ))}
        </div>

    </div>
    )
}

export default Orders;