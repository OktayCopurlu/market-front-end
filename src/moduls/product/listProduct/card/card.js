import React from "react";
import ProductCard from "../../../../components/cards/productCard";

export default function Card(filterAndSearch) {
  const searched = filterAndSearch.elements;
  const { state, searchItem } = searched;

  return (
    <div className="col-9 productList-main">
      <div className="row">
        {state === 0 ? (
          <h3>Category is empty</h3>
        ) : (
          state
            .filter((element) => {
              if (
                element.title.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return element;
              } else if (
                element.canton.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return element;
              } else if (
                element.detail.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return element;
              }
              return null;
            })
            .map((element,index) => {
              return <ProductCard element={element} key={index} />;
            })
        )}
      </div>
    </div>
  );
}
