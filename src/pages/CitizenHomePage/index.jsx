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
import { Button, Form, Input, Select, message, Collapse, Carousel } from "antd";
import LocationPicker from "../../components/LocationPicker";
import ImageUpload from "../../components/ImageUpload";
import {
  getReportTypes,
  postReport,
  getMyReports,
  getReportStates,
} from "../../services/report.service";
import obj from "../../../package.json";
const { Panel } = Collapse;
export function CitizenHomePage() {
  let ident = Math.floor(Math.random() * 1000000 + 1);
  const [reportTypes, changeTypes] = useState([]);
  const [reportFilterTypes, changeFilterTypes] = useState([]);
  const [reportStates, changeStates] = useState([]);
  const [myReports, changeMyReports] = useState([]);
  const [myFilteredReports, changeMyFilteredReports] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  // console.log(proxy);
  let typeFilterValue = "";
  let stateFilterValue = "";

  const { t } = useTranslation();
  const sortCriteria = [
    { value: "date", label: t("date") },
    { value: "state", label: t("state") },
    { value: "type", label: t("type") },
  ];
  const sortByDate = {
    method: (r1, r2) => {
      const tokens1 = r1.date.split(" ");
      const date1 = tokens1[0].split(".");
      const time1 = tokens1[1].split(":");

      const tokens2 = r2.date.split(" ");
      const date2 = tokens2[0].split(".");
      const time2 = tokens2[1].split(":");

      const d1 = new Date(
        date1[2],
        date1[1] - 1,
        date1[0],
        time1[0],
        time1[1],
        time1[2]
      );

      const d2 = new Date(
        date2[2],
        date2[1] - 1,
        date2[0],
        time2[0],
        time2[1],
        time2[2]
      );
      console.log(d1.getTime() < d2.getTime());

      return d1.getTime() < d2.getTime();
    },
  };
  const sortByType = {
    method: (r1, r2) => {
      return r1.type.localeCompare(r2.type);
    },
  };
  const sortByState = {
    method: (r1, r2) => {
      return r1.state.localeCompare(r2.state);
    },
  };
  const sortDefault = {
    method: (r1, r2) => {
      return true;
    },
  };
  const [sortFunction, changeSortFunction] = useState(sortDefault);
  const filterFunc = () => {
    let t = myReports;
    if (stateFilterValue !== "all" && stateFilterValue !== "") {
      t = t.filter((r) => {
        return r.state === stateFilterValue;
      });
    } else console.log("all");
    if (typeFilterValue !== "all" && typeFilterValue !== "") {
      t = t.filter((r) => {
        return r.type === typeFilterValue;
      });
    } else console.log("all");
    changeMyFilteredReports(t);
  };
  const stateFilter = (value) => {
    console.log(value);
    stateFilterValue = value;
    filterFunc();
  };
  const typeFilter = (value) => {
    console.log(value);
    typeFilterValue = value;
    filterFunc();
  };
  const sortFunc = (value) => {
    if (value === "date") {
      console.log("sort by date");
      changeSortFunction(sortByDate);
    } else if (value === "type") {
      console.log("sort by type");
      changeSortFunction(sortByType);
    } else {
      console.log("sort by state");
      changeSortFunction(sortByState);
    }
  };
  useEffect(() => {
    getReportTypes()
      .then((response) => {
        const types = response.data.map((type) => {
          return {
            value: type,
            label: t(type),
          };
        });
        changeTypes(types);
        const temp = types;
        temp.push({ value: "all", label: t("all") });
        changeFilterTypes(temp);
      })
      .catch();
    getReportStates()
      .then((response) => {
        const states = response.data.map((type) => {
          return {
            value: type,
            label: t(type),
          };
        });
        states.push({ value: "all", label: t("all") });
        changeStates(states);
      })
      .catch();
    getMyReports(JSON.parse(sessionStorage.getItem("user")).id)
      .then((response) => {
        sessionStorage.setItem("myReports", JSON.stringify(response.data));
        changeMyReports(response.data);
        changeMyFilteredReports(response.data);
      })
      .catch();
  }, []);

  const { TextArea } = Input;

  const [form] = Form.useForm();
  const [value, setValue] = React.useState("0");

  const navigate = useNavigate();
  // to enable collecting data from child component we use callback function
  let position = null;
  const changePosition = (pos) => {
    position = pos;
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
    form.validateFields().then((values) => {
      if (position === null) {
        messageApi.open({
          type: "error",
          content: t("coordinatesMissing"),
          duration: 0,
          style: { fontSize: "large" },
        });
      } else {
        let user;
        if (sessionStorage.getItem("user") !== null) {
          user = JSON.parse(sessionStorage.getItem("user")).id;
          console.log(user);
        } else user = -1;
        const reportRequest = {
          id: ident,
          title: values.title,
          note: values.note,
          content: values.content,
          type: values.type,
          x: position[0],
          y: position[1],
          creator: user,
        };
        postReport(reportRequest)
          .then((response) => {
            ident = Math.floor(Math.random() * 1000000 + 1);
            form.resetFields();
            myReports.push(response.data);
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

  const contentStyle = {
    margin: "auto",
    height: "370px",
    color: "#fff",
    lineHeight: "260px",
    textAlign: "center",
    background: "#364d79",
    maxWidth: "100%",
  };
  const onChange = (currentSlide) => {};

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
                  <ImageUpload identificator={ident}></ImageUpload>
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
            <div className="wrapper">
              <div className="filter-sort-div">
                <Select
                  onChange={typeFilter}
                  placeholder={t("typeFilter")}
                  optionFilterProp="children"
                  style={{ fontSize: "18px" }}
                  size="large"
                  options={reportFilterTypes}
                  className="filter-sort-select"
                />
                <Select
                  onChange={stateFilter}
                  placeholder={t("stateFilter")}
                  optionFilterProp="children"
                  style={{ fontSize: "18px" }}
                  size="large"
                  options={reportStates}
                  className="filter-sort-select"
                />
                <Select
                  onChange={sortFunc}
                  placeholder={t("sort")}
                  optionFilterProp="children"
                  style={{ fontSize: "18px" }}
                  size="large"
                  options={sortCriteria}
                  className="filter-sort-select"
                />
              </div>
              <div className="report-history-container">
                <Collapse accordion>
                  {console.log(sortFunction.method)}
                  {myFilteredReports &&
                    myFilteredReports
                      .sort(sortFunction.method)
                      .map((report) => {
                        return (
                          <Panel
                            header={
                              <span className="reportHeader">
                                <span className="left-span header-span">
                                  {report.title}
                                </span>
                                <span className="center-span header-span">
                                  {t("reportType")}&nbsp;&nbsp;&nbsp;
                                  {t(report.type)}
                                </span>
                                <span className="header-span">
                                  {t("reportCreationTime")}&nbsp;&nbsp;&nbsp;
                                  {report.date}
                                </span>
                                <span className="right-span header-span">
                                  {t(report.state)}
                                </span>
                              </span>
                            }
                            key={report.id}
                            className="reportInfo"
                          >
                            <p>
                              {t("content") + ": "}
                              <br />
                              {report.content}
                            </p>
                            <p>
                              {t("note") + ": "}
                              <br />
                              {report.note}
                            </p>
                            <div className="galery-container">
                              <Carousel afterChange={onChange}>
                                {report.images &&
                                  report.images.map((img) => {
                                    return (
                                      <div key={img.id}>
                                        <img
                                          src={
                                            obj.proxy +
                                            "/CityReportSystem/reports/images/" +
                                            img.id
                                          }
                                          style={contentStyle}
                                        ></img>
                                      </div>
                                    );
                                  })}
                              </Carousel>
                            </div>
                          </Panel>
                        );
                      })}
                </Collapse>
              </div>
            </div>
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
