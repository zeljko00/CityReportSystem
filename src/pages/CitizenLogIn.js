import React from "react";
import { AppHeader } from "../layouts/AppHeader";
import { AppFooter } from "../layouts/AppFooter";
import { LanguageSelector } from "../components/LanguageSelector";
import { SignInForm } from "../components/SignInForm";
import "../assets/style/Login.css";

export function CitizenLogIn() {
  const citizen = true;

  return (
    <div className="login-page">
      <AppHeader></AppHeader>
      <SignInForm citizenLogin={citizen}></SignInForm>
      <div className="lang-selector">
        <LanguageSelector></LanguageSelector>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
