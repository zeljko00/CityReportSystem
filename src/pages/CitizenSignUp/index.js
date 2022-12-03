import React from "react";
import { SignUpForm } from "../../components/SignUpForm";
import styled from "styled-components";
import { LanguageSelector } from "../../components/LanguageSelector";
import { AppFooter } from "../../layouts/AppFooter";
import { AppHeader } from "../../layouts/AppHeader";
import "../../assets/style/CitizenSignUp.css";
const Page = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
const FormContainer = styled.div`
  margin: auto;
  padding: 50px 20px 50px 20px;
  margin-top: 5vh;
  margin-bottom: 20vh;
  border-radius: 16px;
  box-shadow: 10 40px 30px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(4px);
`;

export function CitizenSignUp() {
  return (
    <Page id="signup-page">
      {" "}
      <AppHeader></AppHeader>
      <FormContainer id="form-container">
        <SignUpForm />
      </FormContainer>
      <div className="lang-selector">
        <LanguageSelector></LanguageSelector>
      </div>
      <AppFooter></AppFooter>
    </Page>
  );
}
