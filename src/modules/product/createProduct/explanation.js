import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./create.css";
import { useTranslation } from "react-i18next";

export default function Explanation() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  return (
    <section className="explanation-container">
      <h1>FreeMarket</h1>
      <p className="mt-2 information-text">{t("FreeMarket")}</p>
      <p className="mt-2 information-text">{t("WhatIsFreeMarketText.1")}</p>
      <p className="mt-2 information-text">{t("WhatIsFreeMarketText.2")}</p>
      <p className="mt-2 information-text">{t("WhatIsFreeMarketText.3")}</p>
      <h3>{t("Donors")}</h3>
      <p className="mt-2 information-text">{t("DonorsText")}</p>
      <h3>{t("Recipients")}</h3>
      <p className="mt-2 information-text">{t("RecipientsText")}</p>
      {!isAuthenticated ? (
        <button
          className="btn btn-primary mt-5 px-5 py-2"
          onClick={loginWithRedirect}
        >
          SignUp
        </button>
      ) : (
        <a href="/create" className="btn btn-primary mt-5 px-5 py-2">
          Create a new product
        </a>
      )}
    </section>
  );
}