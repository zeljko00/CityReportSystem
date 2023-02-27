import * as React from "react";
import { Button, Form, Input } from "antd";
import ImageUpload from "../components/ImageUpload";
import LocationPicker from "../components/LocationPicker";
import { useTranslation } from "react-i18next";
import {
  updateEvent,
  uploadImage,
  deleteImage,
} from "../services/eventService";
import PropTypes from "prop-types";
export function UpdateEvent(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  let position = null;
  const changePosition = (pos) => {
    position = pos;
  };
  const submit = () => {
    form.validateFields().then((values) => {
      const event = props.event;
      if (values.desc !== undefined) event.description = values.desc;
      if (values.info !== undefined) event.info = values.info;
      if (position != null) {
        event.x = position[0];
        event.y = position[1];
      }
      console.log(event);
      updateEvent(JSON.parse(sessionStorage.getItem("user")).user.id, event)
        .then((response) => {
          form.resetFields();
          props.returnData(event);
        })
        .catch(() => {
          props.returnData("error");
        });
    });
  };

  return (
    <Form
      form={form}
      name="newEventForm"
      initialValues={{ remember: true }}
      onSubmit={() => submit()}
      autoComplete="off"
    >
      <Form.Item name="desc">
        <TextArea
          defaultValue={props.event.description}
          style={{ fontSize: "18px" }}
          size="large"
          rows={5}
        />
      </Form.Item>
      <Form.Item name="info">
        <TextArea
          defaultValue={props.event.info}
          style={{ fontSize: "18px" }}
          size="large"
          rows={5}
        />
      </Form.Item>
      <Form.Item>
        <LocationPicker
          callback={changePosition}
          deviceLocation={false}
        ></LocationPicker>
      </Form.Item>
      <Form.Item>
        {/* // izmijeniti */}
        <ImageUpload
          identificator={event.id}
          uploadImage={uploadImage}
          deleteImage={deleteImage}
        ></ImageUpload>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => submit()}
          id="send-btn"
          style={{
            fontSize: "20px",
            lineHeight: "20px",
            margin: "0 0 10px 0",
          }}
        >
          {t("save")}
        </Button>
      </Form.Item>
    </Form>
  );
}
UpdateEvent.propTypes = {
  returnData: PropTypes.func,
  event: PropTypes.object,
};
