import React, { useContext } from "react";
import Context from "../../../../context/context";
import { Link } from "react-router-dom";
import ProductContext from "../../../../context/productContext";
import { useTranslation } from "react-i18next";
export default function NotSuccessText() {
  const context = useContext(Context);
  const productContext = useContext(ProductContext);
const {t}= useTranslation()
  function onClick() {
    context.handlerSuccess(null);
    productContext.photosHandler([]);
    productContext.cantonHandler(null);
  }
  return (
    <div className="alert alert-danger text-center" role="alert">
      <p>{t('ProductUploadMessage.notSuccess')}</p>
      <p>
        <Link onClick={onClick} to="#"className="btn btn-success mt-5">
        {t('ProductUploadMessage.tryAgain')}
        </Link>
      </p>
    </div>
  );
}
