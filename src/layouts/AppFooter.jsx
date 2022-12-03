import React from "react";
import "../assets/style/AppFooter.css";
import { useTranslation } from "react-i18next";

export function AppFooter() {
  const { t } = useTranslation();
  return <div className="footer">{t("signature")}</div>;
}
