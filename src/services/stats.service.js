import axios from "axios";
export function getStats(type, start, end) {
  return axios.get(
    "/CityReportSystem/statistics/" + start + "/" + end + "/" + type,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export function getYearStats(year) {
  console.log(year);
  return axios.get("/CityReportSystem/statistics/" + year, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
