import React from "react";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";

import { LogInForm } from "../../components/LogInForm";
import "../../assets/style/CitizenLogin.css";

export function LogIn() {
  return (
    <div className="login-page">
      <AppHeader></AppHeader>
      <LogInForm></LogInForm>
      <AppFooter></AppFooter>
    </div>
  );
}
