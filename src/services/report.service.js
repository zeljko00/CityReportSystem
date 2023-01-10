import axios from "axios";

export function getReportTypes() {
  return axios.get("/CityReportSystem/reports/types", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export function getReportStates() {
  return axios.get("/CityReportSystem/reports/states", {
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

export function deleteImage(id) {
  return axios.delete("/CityReportSystem/reports/images/" + id, {
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
      .post("/CityReportSystem/reports/images/upload", fmData, config)
      .then(() => {
        onSuccess("Ok");
      });
  } catch (err) {
    console.log("Eroor: ", err);
    onError({ err });
  }
}
