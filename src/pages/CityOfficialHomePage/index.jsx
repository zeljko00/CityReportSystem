import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { TabPanel, TabList, TabContext } from "@mui/lab";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tab, Box } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import userImg from "../../assets/images/user.png";
// import Badge from "@mui/material/Badge";
// import MailIcon from "@mui/icons-material/Mail";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import { Button, Form, Input, Select, message, Collapse, Carousel } from "antd";

import { LanguageSelector } from "../../components/LanguageSelector";
import CityMap from "../../components/CityMap";
// import { CitizenInfo } from "../../components/CitizenInfo";
// import LocationPicker from "../../components/LocationPicker";
// import ImageUpload from "../../components/ImageUpload";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";

import "../../assets/style/CitizenHomePage.css";
import "../../assets/style/CityOfficialHomePage.css";
import // getReportTypes,
// // postReport,
// getMyReports,
// getReportStates,
"../../services/report.service";
import EventTable from "../../components/EventTable";
// import obj from "../../../package.json";
// import { ReportAdditionalInfoForm } from "../../components/ReportAdditionalInfoForm";

// const { Panel } = Collapse;
export function CityOfficialHomePage() {
  // let ident = Math.floor(Math.random() * 1000000 + 1); // used add key when uploading report images
  // const [reportTypes, changeTypes] = useState([]);
  // const [reportFilterTypes, changeFilterTypes] = useState([]); // used for filtering my reports
  // const [reportStates, changeStates] = useState([]);
  // const [myReports, changeMyReports] = useState([]);
  // const [myFilteredReports, changeMyFilteredReports] = useState([]);
  // const [messageApi, contextHolder] = message.useMessage();
  // eslint-disable-next-line no-unused-vars
  const [changed, changeChanged] = useState(false);

  // const [typeFilterValue, changeTypeFilterValue] = useState("");
  // const [stateFilterValue, changeStateFilterValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [guest, changeGuest] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [user, changeUser] = useState(null);

  // let counter = 1;

  const { t } = useTranslation();

  // const sortCriteria = [
  //   { value: "date", label: t("date") },
  //   { value: "state", label: t("state") },
  //   { value: "type", label: t("type") },
  // ];

  // const sortByDate = {
  //   method: (r1, r2) => {
  //     const tokens1 = r1.date.split(" ");
  //     const date1 = tokens1[0].split(".");
  //     const time1 = tokens1[1].split(":");

  //     const tokens2 = r2.date.split(" ");
  //     const date2 = tokens2[0].split(".");
  //     const time2 = tokens2[1].split(":");

  //     const d1 = new Date(
  //       date1[2],
  //       date1[1] - 1,
  //       date1[0],
  //       time1[0],
  //       time1[1],
  //       time1[2]
  //     );

  //     const d2 = new Date(
  //       date2[2],
  //       date2[1] - 1,
  //       date2[0],
  //       time2[0],
  //       time2[1],
  //       time2[2]
  //     );
  //     console.log(d1.getTime() < d2.getTime());

  //     return d1.getTime() < d2.getTime();
  //   },
  // };
  // const sortByType = {
  //   method: (r1, r2) => {
  //     return r1.type.localeCompare(r2.type);
  //   },
  // };
  // const sortByState = {
  //   method: (r1, r2) => {
  //     return r1.state.localeCompare(r2.state);
  //   },
  // };
  // const sortDefault = {
  //   method: (r1, r2) => {
  //     return true;
  //   },
  // };
  // const [sortFunction, changeSortFunction] = useState(sortDefault);

  // const filterFunc = (state, type) => {
  //   console.log("state: " + state + "   " + "type: " + type);
  //   let t = myReports;
  //   if (state !== "all" && state !== "") {
  //     t = t.filter((r) => {
  //       return r.state === state;
  //     });
  //   } else console.log("all");
  //   if (type !== "all" && type !== "") {
  //     t = t.filter((r) => {
  //       return r.type === type;
  //     });
  //   } else console.log("all");
  //   changeMyFilteredReports(t);
  // };
  // const stateFilter = (value) => {
  //   console.log(value);
  //   changeStateFilterValue(value);
  //   filterFunc(value, typeFilterValue);
  // };
  // const typeFilter = (value) => {
  //   console.log(value);
  //   changeTypeFilterValue(value);
  //   filterFunc(stateFilterValue, value);
  // };

  // const sortFunc = (value) => {
  //   if (value === "date") {
  //     console.log("sort by date");
  //     changeSortFunction(sortByDate);
  //   } else if (value === "type") {
  //     console.log("sort by type");
  //     changeSortFunction(sortByType);
  //   } else {
  //     console.log("sort by state");
  //     changeSortFunction(sortByState);
  //   }
  // };
  useEffect(() => {
    if (sessionStorage.getItem("tab") !== null) {
      console.log("saved tab: " + sessionStorage.getItem("tab"));
      handleChange(null, sessionStorage.getItem("tab"));
    }
    // // counter = 1;
    if (JSON.parse(sessionStorage.getItem("user")) !== null) {
      changeGuest(false);
      const temp = JSON.parse(sessionStorage.getItem("user"));
      changeUser(temp);
      console.log("switched user to ");
      console.log(temp);
      //   getReportTypes()
      //     .then((response) => {
      //       const types = response.data.map((type) => {
      //         return {
      //           value: type,
      //           label: t(type),
      //         };
      //       });
      //       changeTypes(types);
      //       // report types for filtering (added 'all')
      //       const temp = [];
      //       types.forEach((t) => {
      //         temp.push(t);
      //       });
      //       temp.push({ value: "all", label: t("all") });
      //       changeFilterTypes(temp);
      //     })
      //     .catch();
      //   getReportStates()
      //     .then((response) => {
      //       const states = response.data.map((type) => {
      //         return {
      //           value: type,
      //           label: t(type),
      //         };
      //       });
      //       states.push({ value: "all", label: t("all") });
      //       changeStates(states);
      //     })
      //     .catch();
      //   console.log("fetching my reports");
      //   getMyReports(temp.user.id)
      //     .then((response) => {
      //       sessionStorage.setItem("myReports", JSON.stringify(response.data));
      //       changeMyReports(response.data);
      //       changeMyFilteredReports(response.data);
      //     })
      //     .catch();
    } else {
      console.log("no user found");
      navigate("/");
    }
  }, []);

  // const { TextArea } = Input;

  // const [form] = Form.useForm();
  const [value, setValue] = useState("1");

  const navigate = useNavigate();
  // to enable collecting data from child component we use callback function
  // let position = null;
  // const changePosition = (pos) => {
  //   position = pos;
  // };

  const handleChange = (event, newValue) => {
    console.log("handling " + newValue);
    if (newValue === "-1") {
      sessionStorage.clear();
      navigate("/CityReportSystem/login");
    } else if (newValue !== undefined) {
      console.log("saving tab: " + newValue);
      sessionStorage.setItem("tab", newValue);
      setValue(newValue);
    }
  };

  // const submit = () => {
  //   form.validateFields().then((values) => {
  //     if (position === null) {
  //       messageApi.open({
  //         type: "error",
  //         content: t("coordinatesMissing"),
  //         duration: 0,
  //       });
  //       setTimeout(messageApi.destroy, 3000);
  //     } else {
  //       let user;
  //       if (sessionStorage.getItem("user") !== null) {
  //         console.log("not guest");
  //         user = JSON.parse(sessionStorage.getItem("user")).user.id;
  //         console.log(user);
  //       } else {
  //         console.log("guest");
  //         user = -1;
  //       }
  //       const reportRequest = {
  //         id: ident,
  //         title: values.title,
  //         note: values.note,
  //         content: values.content,
  //         type: values.type,
  //         x: position[0],
  //         y: position[1],
  //         creator: user,
  //       };
  //       postReport(reportRequest)
  //         .then((response) => {
  //           ident = Math.floor(Math.random() * 1000000 + 1);
  //           form.resetFields();
  //           myReports.push(response.data);
  //           messageApi.open({
  //             type: "success",
  //             content: t("reportSent"),
  //             duration: 0,
  //           });
  //           setTimeout(messageApi.destroy, 4000);
  //         })
  //         .catch((error) => {
  //           messageApi.open({
  //             type: "error",
  //             content: error,
  //             duration: 0,
  //           });
  //           setTimeout(messageApi.destroy, 3000);
  //         });
  //     }
  //   });
  // };
  // const signal = () => {
  //   console.log("changing!");
  //   messageApi.open({
  //     type: "success",
  //     content: t("successfulProvidingInfo"),
  //     duration: 0,
  //   });
  //   setTimeout(messageApi.destroy, 3000);
  // };
  // const contentStyle = {
  //   margin: "auto",
  //   height: "370px",
  //   color: "#fff",
  //   lineHeight: "260px",
  //   textAlign: "center",
  //   background: "#364d79",
  //   maxWidth: "100%",
  // };
  // const onChange = (currentSlide) => {};

  return (
    user !== null &&
    user !== undefined && (
      <div className="citizen-home-page">
        {/* {contextHolder} */}
        <AppHeader></AppHeader>

        {/* {u && (
        <CitizenInfo
          firstname={u.firstName}
          lastname={u.lastName}
        ></CitizenInfo>
      )} */}
        <div id="tab-menu">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} value={value} centered>
                <Tab
                  label={t("cityMap")}
                  value="1"
                  icon={<MapIcon />}
                  initial="1"
                />
                <Tab
                  label={t("arrivedReports")}
                  value="2"
                  icon={<PostAddIcon />}
                />
                <Tab label={t("events")} value="3" icon={<HistoryIcon />} />
                <Tab label={t("profile")} value="4" icon={<AccountBoxIcon />} />
                <Tab label={t("logout")} icon={<LogoutIcon />} value="-1"></Tab>
              </TabList>
            </Box>
            <TabPanel value="1">
              <CityMap></CityMap>
            </TabPanel>
            <TabPanel value="2"></TabPanel>
            <TabPanel value="3">
              <EventTable></EventTable>
              <div className="placeholder-div"></div>
            </TabPanel>
            <TabPanel value="4">
              <div className="placeholder-div">
                <div id="acc-info-div">
                  <div id="profile-info-div" className="rounded-edges-div">
                    <img src={userImg} alt="profile-img" id="user-img"></img>
                    <div className="label-div bolded-text">
                      {user.user.firstName} {user.user.lastName}
                    </div>
                    <div className="label-div gray-font">
                      {user.user.education}
                    </div>
                    <div className="label-div gray-font">
                      {user.user.position}
                    </div>
                  </div>
                  <div className="two-row-container">
                    <div id="department-info-div" className="rounded-edges-div">
                      <div className="label-div gray-font">
                        {t("department")}:
                      </div>
                      <div className="label-div bolded-text">
                        {user.user.department.name}
                      </div>
                      <div className="label-div gray-font">
                        {user.user.department.mail}
                      </div>
                      <div className="label-div gray-font">
                        {user.user.department.phone}
                      </div>
                    </div>
                    <div id="data-div" className="rounded-edges-div">
                      <div className="label-div gray-font">
                        {t("createdEvents")}:
                        <span className="count">
                          {" " + user.user.createdEventsNum}
                        </span>
                      </div>
                      <div className="label-div gray-font">
                        {t("activeEvents")}:
                        <span className="count">
                          {" " + user.user.activeEventsNum}
                        </span>
                      </div>
                      <div className="label-div gray-font">
                        {t("solvedReports")}:
                        <span className="count">
                          {" " + user.user.solvedReportsNum}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </div>
        <div id="lng-select">
          <LanguageSelector></LanguageSelector>
        </div>

        <div id="bottom-menu">
          <Box sx={{ centered: true }}>
            <BottomNavigation showLabels value={value} onChange={handleChange}>
              <BottomNavigationAction
                label={t("map")}
                value="1"
                icon={<MapIcon />}
              />
              <BottomNavigationAction
                label={t("arrivedReportsMobile")}
                value="2"
                icon={<PostAddIcon />}
              />
              <BottomNavigationAction
                label={t("eventsMobile")}
                value="3"
                icon={<HistoryIcon />}
              />
              <BottomNavigationAction
                label={t("profileMobile")}
                value="4"
                icon={<AccountBoxIcon />}
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
    )
  );
}
