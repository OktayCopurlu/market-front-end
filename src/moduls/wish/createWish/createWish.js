import React, { useState, useContext } from "react";
import "../../product/createProduct/create.css";
import { useAuth0 } from "@auth0/auth0-react";
import * as wishActions from "../../../services/wishes-service";
import Context from "../../../store/context";
import ProductContext from "../../../store/productContext";
import SuccessText from "./messages/successText";
import NotSuccessText from "./messages/notSuccessText";
import MainForm from "../form/mainForm";

export default function CreateWishList() {
  const context = useContext(Context);
  const productContext = useContext(ProductContext);
  const { getAccessTokenSilently, user } = useAuth0();
  const { sub } = user;
  const userId = sub;
  const [token, setToken] = useState();
  getAccessTokenSilently().then((token) => setToken(token));

  const name = context.name;
  const canton = productContext.canton;
  const title = productContext.title;
  const detail = productContext.information;
  const contactTel = productContext.contactTel;
  const city = productContext.city;
  const mainCategory = productContext.mainCategory;
  const contactEmail = productContext.contactEmail;

  const body = {
    mainCategory,
    userId,
    canton,
    title,
    detail,
    name,
    contactTel,
    city,
    contactEmail,
  };

  function onSubmit(event) {
    event.preventDefault();
    wishActions.createWish(body, context.handlerSuccess, token);
  }

  return (
    <div className="container">
      <h3 className="d-flex justify-content-center mb-4"> Create Your Wish </h3>
      {context.isSuccess === null ? (
        <div className="row createWish-row">
          <div className="col d-flex justify-content-center">
            <form className="form-create" onSubmit={onSubmit}>
              <MainForm />
            </form>
          </div>
        </div>
      ) : context.isSuccess ? (
        <SuccessText />
      ) : (
        <NotSuccessText />
      )}
    </div>
  );
}