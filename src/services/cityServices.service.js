import axios from "axios";
export function getServices() {
  return axios.get("/CityReportSystem/cityServices", {
    headers: { "Content-Type": "application/json" },
  });
}
