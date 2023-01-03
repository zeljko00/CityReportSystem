import React from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import agreement from "../data/Agreement.docx";
import { createCitizen } from "../services/citizenService";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 9 },
  },
  wrapperCol: {
    sm: { span: 15 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 15,
      offset: 9,
    },
  },
};

export function SignUpForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createCitizen({
      firstName: values.firstname,
      lastName: values.lastname,
      passwordHash: values.password,
      phone: values.prefix + " " + values.phone,
      idCard: values.idCard,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        messageApi.open({
          type: "error",
          content: t("error"),
          duration: 0,
          style: { fontSize: "large" },
        });
        setTimeout(messageApi.destroy, 4000);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 90 }}>
        <Option value="+387">+387</Option>
        <Option value="+381">+381</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "+387",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          label={t("firstname")}
          rules={[
            {
              message: t("required"),
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label={t("lastname")}
          rules={[
            {
              message: t("required"),
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("password")}
          rules={[
            {
              required: true,
              message: t("required"),
            },
            {
              min: 8,
              message: t("passwordRule"),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={t("confirmPassword")}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("required"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("notMatchingPasswords")));
              },
            }),
          ]}
        >
          <Input.Password className="password-input" />
        </Form.Item>

        <Form.Item
          name="idCard"
          label={t("idCard")}
          tooltip={t("idCardExp")}
          rules={[
            {
              required: true,
              message: t("required"),
            },
          ]}
          style={{ fontSize: "18px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("phone")}
          rules={[{ required: true, message: t("required") }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("mustAcceptAgreement"))),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            {t("read")} <a href={agreement}>{t("agreement")}</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" id="submit-btn">
            {t("register")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpForm;
