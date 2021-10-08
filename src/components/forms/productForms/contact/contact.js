import React, { useContext } from "react";
import ProductContext from "../../../../context/productContext";
import { useTranslation } from "react-i18next";
export default function Contact() {
  const productContext = useContext(ProductContext);
  const { t } = useTranslation();
  return (
    <div className="input-field">
      <label htmlFor="contact"> Contact Tel</label>
      <input
        defaultValue={
          productContext.product.contactTel
            ? productContext.product.contactTel
            : ""
        }
        className="form-control "
        type="tel"
        name="contact"
        placeholder="088 888 88 88"
        required
        onChange={(event) =>
          productContext.contactTelHandler(event.target.value)
        }
      />

      <label htmlFor="contact">{t("ContactEmail")}</label>
      <input
       defaultValue={
        productContext.product.contactEmail
          ? productContext.product.contactEmail
          : ""
      }
        className="form-control"
        type="email"
        name="contact"
        placeholder="example@example.com"
        required
        onChange={(event) =>
          productContext.contactEmailHandler(event.target.value)
        }
      />
    </div>
  );
}
