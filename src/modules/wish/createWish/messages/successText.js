import React, { useContext } from "react";
import Context from "../../../../context/context";
import { Link } from "react-router-dom";
import ProductContext from "../../../../context/productContext";
import {useTranslation} from "react-i18next";
export default function SuccessText() {
  const context = useContext(Context);
  const productContext = useContext(ProductContext);
const {t}= useTranslation()
  function onClick() {
    context.pageFormHandler(1)
    context.handlerSuccess(null);
    productContext.cantonHandler(null);
  }
  return (
    <div className="alert alert-success text-center" role="alert">
        <p>{t('CreateWishMessage.success')}</p>
      <p>
        <Link onClick={onClick} to="/wishForm" className="btn btn-success mt-4">
          {t('CreateWishMessage.newWish')}
        </Link>
      </p>
    </div>
  );
}
