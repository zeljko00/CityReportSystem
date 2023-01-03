import React from "react";
import { AppHeader } from "../../layouts/AppHeader";
import { AppFooter } from "../../layouts/AppFooter";
import CityMap from "../../components/CityMap";
import { useTranslation } from "react-i18next";
import { Tab, Box } from "@mui/material";
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
export function CitizenHomePage() {
  const [value, setValue] = React.useState("0");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    if (newValue === "-1") {
      sessionStorage.removeItem("user");
      navigate("/CityReportSystem/login");
    } else setValue(newValue);
  };
  const u = JSON.parse(sessionStorage.getItem("user"));
  console.log(u);
  return (
    <div className="citizen-home-page">
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
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
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
