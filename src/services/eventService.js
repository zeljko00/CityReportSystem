import axios from "axios";

export function getActiveEvents() {
  return axios.get("/CityReportSystem/events/active", {
    headers: { "Content-Type": "application/json" },
  });
}
export function getEvents(page, size, search, filter, filterValue) {
  return axios.get(
    "/CityReportSystem/events/" +
      filter +
      "/" +
      filterValue +
      "/" +
      page +
      "/" +
      size +
      "/" +
      search,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
export function getTypes() {
  return axios.get("/CityReportSystem/events/types", {
    headers: { "Content-Type": "application/json" },
  });
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
export function updateEvent(id, event) {
  return axios.put("/CityReportSystem/events/" + id, event, {
    headers: { "Content-Type": "application/json" },
  });
}
export function deleteImage(id) {
  return axios.delete("/CityReportSystem/events/images/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export function uploadImage(image, id) {
  const { onSuccess, onError, file, onProgress } = image;
  console.log("uploading");
  console.log(file);
  const fmData = new FormData();
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };
  fmData.append("image", file);
  fmData.append("identificator", id + "--" + file.name);
  try {
    axios
      .post("/CityReportSystem/events/images/upload", fmData, config)
      .then(() => {
        onSuccess("Ok");
      });
  } catch (err) {
    console.log("Error: ", err);
    onError({ err });
  }
}
export function deleteUpdatedImage(id) {
  return axios.delete("/CityReportSystem/events/images/update/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export function updateImage(image, id) {
  const { onSuccess, onError, file, onProgress } = image;
  console.log("uploading");
  console.log(file);
  const fmData = new FormData();
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };
  fmData.append("image", file);
  try {
    axios
      .post(
        "/CityReportSystem/events/images/upload/" + id + "--" + file.name,
        fmData,
        config
      )
      .then(() => {
        onSuccess("Ok");
      });
  } catch (err) {
    console.log("Error: ", err);
    onError({ err });
  }
}
