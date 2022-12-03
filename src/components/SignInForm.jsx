import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { login } from "../services/citizenService.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function SignInForm(props) {
  const { citizenLogin } = props;
  const [form] = Form.useForm();
  const [user, changeUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const register = () => {
    navigate("/CityReportSystem/citizen/signup");
  };

  const submit = () => {
    form.validateFields().then((values) => {
      login(values.username, values.password)
        .then((result) => {
          console.log(result.data);
          changeUser(result.data);
          console.log(user);
        })
        .catch(() => {
          messageApi.open({
            type: "error",
            content: t("invalidCredentials"),
            duration: 0,
            style: { fontSize: "large" },
          });
          setTimeout(messageApi.destroy, 4000);
        });
    });
  };

  return (
    <div className="login-form-container">
      {contextHolder}
      <Form
        form={form}
        name="loginform"
        initialValues={{ remember: true }}
        onSubmit={() => submit()}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t("usernameMissing") }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("username")}
            style={{ fontSize: "18px" }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t("passwordMissing") }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("password")}
            style={{ fontSize: "18px" }}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox style={{ fontSize: "17px" }}>{t("remember")}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => submit()}
            id="login-btn"
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              margin: "0 0 10px 0",
            }}
          >
            {t("loginBtn")}
          </Button>
          {citizenLogin ? (
            <a onClick={register}>{t("register")}</a>
          ) : (
            <div></div>
          )}
          {citizenLogin ? <a id="right-a">{t("guest")}</a> : <div></div>}
        </Form.Item>
      </Form>
    </div>
  );
}

SignInForm.propTypes = {
  citizenLogin: PropTypes.bool,
};
