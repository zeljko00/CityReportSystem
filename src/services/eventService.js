import axios from "axios";

export function getActiveEvents() {
  return axios.get("/CityReportSystem/events/active", {
    headers: { "Content-Type": "application/json" },
  });
}
export function getEvents(page, size) {
  return axios.get("/CityReportSystem/events/" + page + "/" + size, {
    headers: { "Content-Type": "application/json" },
  });
}
