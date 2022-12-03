import axios from "axios";
import configuration from "../environments/environmentConf.js";

export function login(username, password) {
  const credentials = btoa(username + ":" + password);
  return axios.get(configuration().baseServiceUrl + "/citizens/login", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + credentials,
    },
  });
}

export function createCitizen(citizen) {
  console.log(citizen);
  const c = {
    firstName: citizen.firstName,
    lastName: citizen.lastName,
    phone: citizen.phone,
    idCard: citizen.idCard,
    passwordHash: citizen.passwordHash,
  };
  return axios.post(configuration().baseServiceUrl + "/citizens", c, {
    headers: { "Content-Type": "application/json" },
  });
}
