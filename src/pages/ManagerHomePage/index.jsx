/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tab, Box } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { LanguageSelector } from "../../components/LanguageSelector";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CityMap from "../../components/CityMap";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";
import "../../assets/style/CitizenHomePage.css";
import "../../assets/style/ManagerHomePage.css";
import { getStats } from "../../services/stats.service";
import { getReportTypes } from "../../services/report.service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LayersControl } from "react-leaflet";
export function ManagerHomePage() {
  const date = new Date();
  const [reportStates, changeStates] = useState([]);
  const [reports, changeReports] = useState([]);
  const [typeFilter, changeTypeFilter] = useState("all");
  const [reportTypes, setReportTypes] = useState(null);
  const [value, setValue] = React.useState("2");
  const [guest, changeGuest] = useState(true);
  const [firstDate, setFirstDate] = useState(
    date.getFullYear() +
      "-" +
      ((date.getMonth() + 1 > 9 ? "" : "0") + (date.getMonth() + 1)) +
      "-01"
  );
  const [lastDate, setLastDate] = useState(
    date.getFullYear() +
      "-" +
      ((date.getMonth() + 1 > 9 ? "" : "0") + (date.getMonth() + 1)) +
      "-" +
      ((date.getDate() + 1 > 9 ? "" : "0") + date.getDate())
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [totalReports, setTotalReports] = React.useState("");
  const [solvedReports, setSolvedReports] = React.useState("");
  const [avgTime, setAvgTime] = React.useState("");
  const [maxTime, setMaxTime] = React.useState("");
  const [differencePer, setDifferencePer] = React.useState("");
  const [solvedPer, setSolvedPer] = React.useState("");
  const [avgPer, setAvgPer] = React.useState("");
  useEffect(() => {
    if (sessionStorage.getItem("tab") !== null) {
      console.log("saved tab: " + sessionStorage.getItem("tab"));
      handleChange(null, sessionStorage.getItem("tab"));
    }
    const temp = JSON.parse(sessionStorage.getItem("user"));
    if (
      temp !== null &&
      temp !== undefined &&
      temp.user.role === "CITY_MANAGER"
    ) {
      changeGuest(false);
      fetchData(typeFilter, firstDate, lastDate);
    } else {
      navigate("/CityReportSystem/login");
    }
    getReportTypes().then((response) => {
      setReportTypes(response.data);
    });
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === "-1") {
      sessionStorage.clear();
      navigate("/CityReportSystem/login");
    } else if (newValue !== undefined) {
      console.log("saving tab: " + newValue);
      sessionStorage.setItem("tab", newValue);
      setValue(newValue);
    }
  };
  const handleChangeTypeFilter = (event) => {
    const temp = event.target.value;
    console.log(temp);
    changeTypeFilter(temp);
    fetchData(temp, firstDate, lastDate);
  };
  const handleChangeFirstDate = (event) => {
    const temp =
      event.$y +
      "-" +
      ((event.$M + 1 > 9 ? "" : "0") + (event.$M + 1)) +
      "-" +
      ((event.$D + 1 > 9 ? "" : "0") + event.$D + 1);
    console.log(temp);
    setFirstDate(temp);
    fetchData(typeFilter, temp, lastDate);
  };
  const handleChangeLastDate = (event) => {
    const temp =
      event.$y +
      "-" +
      ((event.$M + 1 > 9 ? "" : "0") + (event.$M + 1)) +
      "-" +
      ((event.$D + 1 > 9 ? "" : "0") + event.$D + 1);
    console.log(temp);
    setLastDate(temp);
    fetchData(typeFilter, firstDate, temp);
  };
  const fetchData = (type, first, last) => {
    getStats(type, first, last).then((response) => {
      setTotalReports(response.data.reports);
      setSolvedReports(response.data.solvedReports);
      const avg = parseTimeInMin(response.data.avgTimeInMin);
      setAvgTime(
        avg[0] +
          " " +
          t("days") +
          " " +
          avg[1] +
          " " +
          t("hours") +
          " " +
          avg[2] +
          " " +
          t("mins")
      );
      console.log(response.data.differencePercentage);
      const max = parseTimeInMin(response.data.maxTime.number);
      setMaxTime(
        max[0] +
          " " +
          t("days") +
          " " +
          max[1] +
          " " +
          t("hours") +
          " " +
          max[2] +
          " " +
          t("mins")
      );
      console.log(response.data.avgPercentage);
      setAvgPer(response.data.avgPercentage);
      setDifferencePer(response.data.differencePercentage);
      setSolvedPer(response.data.solvedPercentage);
    });
  };
  const parseTimeInMin = (time) => {
    const days = Math.floor(time / (60 * 24));
    let mins = time - days * 60 * 24;
    const hours = Math.floor(mins / 60);
    mins = mins - hours * 60;
    if (isNaN(days) || isNaN(hours) || isNaN(mins)) return [0, 0, 0];
    return [days, hours, mins];
  };
  return (
    reportTypes && (
      <div className="citizen-home-page">
        <AppHeader></AppHeader>
        <div id="tab-menu">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} value={value} centered>
                <Tab
                  label={t("statistics")}
                  value="2"
                  icon={<QueryStatsIcon />}
                  disabled={guest}
                />
                <Tab
                  label={t("activityInspection")}
                  value="3"
                  icon={<HistoryIcon />}
                  disabled={guest}
                />
                <Tab
                  label={t("logout")}
                  icon={<LogoutIcon />}
                  value="-1"
                  disabled={guest}
                ></Tab>
                <Tab style={{ display: "none" }} value="0"></Tab>
              </TabList>
            </Box>
            <TabPanel value="2">
              {" "}
              <div className="dashboard">
                <div className="dashboard-header">
                  <div className="blue-div dashboard-cell">
                    <p className="value large-font">{totalReports}</p>
                    <p className="key">{t("total")}</p>
                  </div>
                  <div className="purple-div dashboard-cell">
                    {solvedPer >= 100 ? (
                      <p className="details success">{solvedPer + "%"}</p>
                    ) : (
                      <p className="details bad">{solvedPer + "%"}</p>
                    )}
                    <p className="value large-font">{solvedReports}</p>
                    <p className="key">{t("solved")}</p>
                  </div>
                  <div className="blue-div dashboard-cell">
                    {avgPer < 100 ? (
                      <p className="details success">{avgPer + "%"}</p>
                    ) : (
                      <p className="details bad">{avgPer + "%"}</p>
                    )}
                    <p className="value medium-font">{avgTime}</p>
                    <p className="key">{t("avgTime")}</p>
                  </div>
                  <div className="purple-div dashboard-cell">
                    <p className="details bad">{differencePer + "%"}</p>

                    <p className="value medium-font">{maxTime}</p>
                    <p className="key">{t("maxTime")}</p>
                  </div>
                </div>
                <div className="filters-container">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      label={t("firstDate")}
                      onChange={handleChangeFirstDate}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      label={t("lastDate")}
                      onChange={handleChangeLastDate}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{ m: 1, minWidth: 200 }} fullwidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("report")}
                    </InputLabel>
                    <Select
                      value={typeFilter}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={t("report")}
                      onChange={handleChangeTypeFilter}
                    >
                      <MenuItem value="all">{t("all")}</MenuItem>
                      {reportTypes.map((et) => {
                        return (
                          <MenuItem key={et} value={et}>
                            {t(et)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3"></TabPanel>
          </TabContext>
        </div>
        <div id="lng-select">
          <LanguageSelector></LanguageSelector>
        </div>

        <div id="bottom-menu">
          <Box sx={{ centered: true }}>
            <BottomNavigation showLabels value={value} onChange={handleChange}>
              <BottomNavigationAction
                label={t("statistics")}
                value="2"
                icon={<QueryStatsIcon />}
                disabled={guest}
              />
              <BottomNavigationAction
                label={t("activityInspection")}
                value="3"
                icon={<HistoryIcon />}
                disabled={guest}
              />
              <BottomNavigationAction
                label={t("logoutMobile")}
                value="-1"
                icon={<LogoutIcon />}
                disabled={guest}
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
