import React from "react";
import "../assets/style/AppHeader.css";
import amblem from "../assets/images/amblem.png";
import { useTranslation } from "react-i18next";

export function AppHeader() {
  const { t } = useTranslation();
  return (
    <div className="header">
      <div className="amblem">
        <img className="amblem-image" src={amblem} alt="grb Banjaluke"></img>
      </div>
      <div className="title">
        <b>
          {t("appTitle")}
          <br />
          {t("city")}
        </b>
      </div>
    </div>
  );
}
