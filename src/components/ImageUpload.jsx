import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = (props) => {
  const { t } = useTranslation();
  const ident = props.identificator;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const customUploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    fmData.append("identificator", ident);
    try {
      const res = axios
        .post("/CityReportSystem/reports/images/upload", fmData, config)
        .then(() => {
          onSuccess("Ok");
          console.log("server res: ", res);
        });
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const propss = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/jpeg";
      if (!isPNG) {
        message.error(t("invalidFormat"));
      }
      return isPNG || Upload.LIST_IGNORE;
    },
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t("upload")}</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        {...propss}
        maxCount={4}
        customRequest={customUploadImage}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
ImageUpload.propTypes = {
  identificator: PropTypes.number,
};

export default ImageUpload;
