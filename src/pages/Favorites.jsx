import React from "react";
import Card from "../components/Card/Card.js";
import AppContext from "../context.js";

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return (

    <div className="content">
        <div className="contentTop">
          <h1 className="all">My favorites</h1>  
        </div>

        <div className="sneakers">
          {favorites.map((item, index) => (
            <Card 
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      </div>
    )
}

export default Favorites;