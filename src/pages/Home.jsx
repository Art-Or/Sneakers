import React from "react";
import Card from "../components/Card/Card.js";

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading}) {
  
    const renderItems = () => {
      const filtredItems = items.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
          <Card 
            key={index}
            onPlus={(obj) => onAddToCart(obj)}
            onFavorite={(obj) => onAddToFavorite(obj)}
            {...item}
            loading={isLoading}
          />
        ))
    }
  
    return (
      <div className="content">
        <div className="contentTop">
          <h1 className="all">{searchValue ? `Поиск по запросу: "${searchValue}"` : `All sneakers`}</h1>
          <div className="search-block">
            {searchValue && <img onClick={() => setSearchValue("")} className="clear removeBtn" src="/img/btnRemove.svg" alt="Clear" />}
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>

        <div className="sneakers">
          {renderItems()}
        </div>
      </div>
    )
}

export default Home;