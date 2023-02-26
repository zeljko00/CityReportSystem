import axios from "axios";

export function getActiveEvents() {
  return axios.get("/CityReportSystem/events/active", {
    headers: { "Content-Type": "application/json" },
  });
}
export function getEvents(page, size, search) {
  return axios.get(
    "/CityReportSystem/events/" + page + "/" + size + "/" + search,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
export function deleteEvent(executorId, id) {
  return axios.delete(
    "/CityReportSystem/events/deactivate/" + executorId + "/" + id,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
export function activateEvent(executorId, id) {
  return axios.put(
    "/CityReportSystem/events/activate/" + executorId + "/" + id,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
export function createEvent(event) {
  return axios.post("/CityReportSystem/events", event, {
    headers: { "Content-Type": "application/json" },
  });
}
