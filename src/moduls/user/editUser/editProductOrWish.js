import React, { useState, useContext, useEffect } from "react";
import Context from "../../../store/context";
import EditProduct from "../../product/editProduct/editProduct";
import EditWish from "../../wish/editWish/editWish";
import * as productActions from "../../../services/products-service";
import * as wishActions from "../../../services/wishes-service";

export default function EditProductOrWish() {
  const editContext = useContext(Context);
  const productId = editContext.productId;
  const [products, setProducts] = useState({});
  const [wish, setWish] = useState({});

  useEffect(() => {
    async function showList() {
      const product = await productActions.filterAndGet(productId);
      const wish = await wishActions.filterAndGet(productId);

      if (product) {
        return await setProducts(product);
      }
      if (wish) {
        return await setWish(wish);
      }
    }

    showList();
  }, [productId]);

  return (
    <div>
      {products._id === productId ? (
        <EditProduct products={products} />
      ) : null}
      {wish._id === productId ? <EditWish wish={wish} /> : null}
    </div>
  );
}
