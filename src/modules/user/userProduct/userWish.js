import React, { useState, useEffect, useContext } from "react";
import "../userPage/personalPage.css";
import * as wishActions from "../../../services/wishes-service";
import { useAuth0 } from "@auth0/auth0-react";
import UserWishCard from "./userWishCard";
import productContext from "../../../context/productContext";
import { useTranslation } from "react-i18next";
export default function UserWish() {
  const productsContext = useContext(productContext);
  const [wishes, setWishes] = useState([]);
  const { user } = useAuth0();
  const {t}= useTranslation()
  useEffect(() => {
    productsContext.wishIdHandler(wishes);
    async function showList() {
      try {
        const userId = await user.sub;
        const wishes = await wishActions.filterUserWishes(userId);
        await setWishes(wishes);
      } catch (error) {
        console.log(error);
      }
    }
    showList();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <h3 className="d-flex justify-content-center mt-3">{t('MyWishList')}</h3>
      <div className="user-wishes-container m-0 p-1">
        <UserWishCard wishes={wishes} />
      </div>
    </>
  );
}