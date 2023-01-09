import React, { useEffect, useState } from "react";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";
import CityMap from "../../components/CityMap";
import { useTranslation } from "react-i18next";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { LanguageSelector } from "../../components/LanguageSelector";
import HistoryIcon from "@mui/icons-material/History";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import "../../assets/style/CitizenHomePage.css";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CitizenInfo } from "../../components/CitizenInfo";
import { Tab, Box } from "@mui/material";
import { Button, Form, Input, Select, message } from "antd";
import LocationPicker from "../../components/LocationPicker";
import ImageUpload from "../../components/ImageUpload";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getReportTypes,
  postReport,
  getMyReports,
} from "../../services/report.service";
export function CitizenHomePage() {
  let rand = Math.floor(Math.random() * 1000000) + 1;
  const [reportTypes, changeTypes] = useState([]);
  const [myReports, changeMyReports] = useState([]);
  // let user;
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    // user = JSON.parse(sessionStorage.getItem("user"));
    getReportTypes()
      .then((response) => {
        const types = response.data.map((type) => {
          return {
            value: type,
            label: type,
          };
        });
        console.log(response.data);
        changeTypes(types);
      })
      .catch();
    getMyReports(JSON.parse(sessionStorage.getItem("user")).id)
      .then((response) => {
        sessionStorage.setItem("myReports", JSON.stringify(response.data));
        changeMyReports(response.data);
      })
      .catch();
  }, []);

  const { TextArea } = Input;

  const [form] = Form.useForm();
  const [value, setValue] = React.useState("0");

  const { t } = useTranslation();
  const navigate = useNavigate();
  // to enable collecting data from child component we use callback function
  let position = null;
  const changePosition = (pos) => {
    position = pos;
    console.log("Position changed: " + position);
  };

  const handleChange = (event, newValue) => {
    if (newValue === "-1") {
      sessionStorage.removeItem("user");
      navigate("/CityReportSystem/login");
    } else setValue(newValue);
  };

  const u = JSON.parse(sessionStorage.getItem("user"));
  console.log(u);

  const submit = () => {
    messageApi.open({
      type: "success",
      content: "clicked submit",
      duration: 0,
      style: { fontSize: "large" },
    });
    setTimeout(messageApi.destroy, 2000);
    form.validateFields().then((values) => {
      if (position === null) {
        messageApi.open({
          type: "error",
          content: t("coordinatesMissing"),
          duration: 0,
          style: { fontSize: "large" },
        });
        setTimeout(messageApi.destroy, 4000);
      } else {
        let user;
        if (sessionStorage.getItem("user") !== null) {
          user = JSON.parse(sessionStorage.getItem("user")).id;
          console.log(user);
        } else user = -1;
        const reportRequest = {
          id: rand,
          title: values.title,
          note: values.note,
          content: values.content,
          type: values.type,
          x: position[0],
          y: position[1],
          creator: user,
        };
        postReport(reportRequest)
          .then(() => {
            form.resetFields();
            rand = Math.floor(Math.random() * 1000000) + 1;
            messageApi.open({
              type: "success",
              content: t("reportSent"),
              duration: 0,
              style: { fontSize: "large" },
            });
            setTimeout(messageApi.destroy, 4000);
          })
          .catch((error) => {
            messageApi.open({
              type: "error",
              content: error,
              duration: 0,
              style: { fontSize: "large" },
            });
            setTimeout(messageApi.destroy, 4000);
          });
      }
    });
  };

  return (
    <div className="citizen-home-page">
      {contextHolder}
      <AppHeader></AppHeader>

      {u && (
        <CitizenInfo
          firstname={u.firstName}
          lastname={u.lastName}
        ></CitizenInfo>
      )}
      <div id="tab-menu">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab label={t("cityMap")} value="1" icon={<MapIcon />} />
              <Tab label={t("newReport")} value="2" icon={<PostAddIcon />} />
              <Tab
                label={t("reportHistory")}
                value="3"
                icon={<HistoryIcon />}
              />
              <Tab label={t("logout")} icon={<LogoutIcon />} value="-1"></Tab>
            </TabList>
          </Box>
          <TabPanel value="0">
            <Card sx={{ maxWidth: 845 }}>
              <CardMedia
                sx={{ height: 340 }}
                image={require("../../assets/images/bl.jpg")}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t("intro")}
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="1">
            <CityMap></CityMap>
          </TabPanel>
          <TabPanel value="2">
            <div className="report-container">
              <Form
                form={form}
                name="reportForm"
                initialValues={{ remember: true }}
                onSubmit={() => submit()}
                autoComplete="off"
              >
                <Form.Item
                  name="type"
                  rules={[{ required: true, message: t("requiredSelect") }]}
                >
                  <Select
                    showSearch
                    placeholder={t("type")}
                    optionFilterProp="children"
                    style={{ fontSize: "18px" }}
                    size="large"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={reportTypes}
                  />
                </Form.Item>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: t("required") }]}
                >
                  <Input
                    placeholder={t("title")}
                    style={{ fontSize: "18px" }}
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="content">
                  <TextArea
                    placeholder={t("content")}
                    style={{ fontSize: "18px" }}
                    size="large"
                    rows={5}
                  />
                </Form.Item>
                <Form.Item name="note">
                  <TextArea
                    placeholder={t("note")}
                    style={{ fontSize: "18px" }}
                    size="large"
                    rows={3}
                  />
                </Form.Item>
                <Form.Item>
                  <LocationPicker callback={changePosition}></LocationPicker>
                </Form.Item>
                <Form.Item>
                  <ImageUpload identificator={rand}></ImageUpload>
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
                    {t("send")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPanel>
          <TabPanel value="3">
            {myReports &&
              myReports.map((report) => {
                console.log("hit");
                return (
                  <Accordion key={report.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Vrijeme&nbspTip</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>report.title</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </TabPanel>
        </TabContext>
      </div>
      <div id="lng-select">
        <LanguageSelector></LanguageSelector>
      </div>

      <div id="bottom-menu">
        <Box centered>
          <BottomNavigation showLabels value={value} onChange={handleChange}>
            <BottomNavigationAction
              label={t("cityMap")}
              value="1"
              icon={<MapIcon />}
            />
            <BottomNavigationAction
              label={t("newReportMobile")}
              value="2"
              icon={<PostAddIcon />}
            />
            <BottomNavigationAction
              label={t("reportHistoryMobile")}
              value="3"
              icon={<HistoryIcon />}
            />
            <BottomNavigationAction
              label={t("logoutMobile")}
              value="-1"
              icon={<LogoutIcon />}
            />
          </BottomNavigation>
        </Box>
      </div>
      <div id="footer">
        <AppFooter></AppFooter>
      </div>
    </div>
  );
}
