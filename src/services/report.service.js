import axios from "axios";

export function getReportTypes() {
  return axios.get("/CityReportSystem/reports/types", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export function postReport(report) {
  return axios.post("/CityReportSystem/reports", report, {
    headers: { "Content-Type": "application/json" },
  });
}

export function getMyReports(id) {
  return axios.get("/CityReportSystem/reports/author/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
