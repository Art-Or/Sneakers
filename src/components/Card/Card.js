import cardStyles from "./Card.module.scss";
import ContentLoader from "react-content-loader"
import React from "react";
import AppContext from "../../context.js";

function Card({
    id,
    title, 
    price, 
    imageUrl, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    added = false,
    loading = false
}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, price, imageUrl};

    const onClickPlus = () => {
        onPlus(obj);
        // setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={cardStyles.card}>
            {loading ? 
                <ContentLoader 
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" /> 
                    <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                </ContentLoader>
            :
                <>
                {onFavorite && (
                    <div className={cardStyles.favorite} onClick={onClickFavorite}>
                        <img 
                            src={isFavorite ? "/img/likeOn.svg" : "/img/likeOff.svg"} 
                            alt="Unliked"    
                        />
                    </div>
                )}
                <img width={133} height={112} src={imageUrl} alt="Sneakers" />
                <h5>{title}</h5>
                <div className={cardStyles.cardBottom}>
                    <div className={cardStyles.cardPrice}>
                        <span>Price:</span>
                        <b>{price}</b>
                    </div>
                    
                    {onPlus && (
                        <img 
                            className={cardStyles.plus} 
                            onClick={onClickPlus} 
                            src={isItemAdded(id) ? "/img/btnOk.svg" : "/img/btnAdd.svg"} 
                            alt="Plus" 
                        />
                    )}  
                </div>
                </>
            }   
        </div>
    );
}

export default Card;
