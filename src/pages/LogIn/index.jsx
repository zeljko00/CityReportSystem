import React from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";
import { AccountPicker } from "../../components/AccountPicker";
import { LogInForm } from "../../components/LogInForm";
import "../../assets/style/CitizenLogin.css";

export function LogIn() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("citizen");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    console.log(value);
    if (value === "citizen") navigate("/CityReportSystem/citizen/home");
    else {
      console.log("not implemented");
      if (sessionStorage.getItem("user") !== null) {
        if (
          JSON.parse(sessionStorage.getItem("user")).user.role ===
          "CITY_MANAGER"
        )
          navigate("/CityReportSystem/city/manager/home");
      } else if (
        JSON.parse(sessionStorage.getItem("user")).user.role === "CITY_OFFICIAL"
      )
        navigate("/CityReportSystem/city/official/home");
    }
  };

  return (
    <div className="login-page">
      <AppHeader></AppHeader>
      <LogInForm func={handleClickOpen}></LogInForm>
      <AccountPicker
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <footer>
        <AppFooter></AppFooter>
      </footer>
    </div>
  );
}
