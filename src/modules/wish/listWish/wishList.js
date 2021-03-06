import React, { useState, useEffect, useContext } from "react";
import "./wishList.css";
import * as wishAction from "../../../services/wishes-service";
import Card from "./card";
import SearchButton from "../../../components/search/searchButton";
import ProductContext from "../../../context/productContext";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
export default function WishList() {
  const location = useLocation()
  localStorage.setItem('path', location.pathname);
  const productContext = useContext(ProductContext);

  const searchItem = productContext.search;
  const [state, setState] = useState([]);
  const { t } = useTranslation();
  async function showWishList() {

    const list = await wishAction.getAll();
    return setState(list);
  }
  useEffect(() => {
    showWishList();
  }, []);

  return (
    <div className="wishContainer">
      <div className="wishList">
        {state.length === 0 ? (
          <h3 key="header">{t("ThereIsNoWish")}</h3>
        ) : (
          <>
            <h2 className="d-flex justify-content-center mb-3">
              {t("WishList")}
            </h2>
            <SearchButton />
            <div className="d-flex justify-content-between row m-0">
              <Card element={{ state, searchItem }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
