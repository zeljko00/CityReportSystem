import axios from "axios";

export function getActiveEvents() {
  return axios.get("/CityReportSystem/events/active", {
    headers: { "Content-Type": "application/json" },
  });
}
