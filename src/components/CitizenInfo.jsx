import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import PropTypes from "prop-types";
export function CitizenInfo(props) {
  console.log(props.firstname);
  return (
    <div className="info-container">
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <p>{props.firstname + " " + props.lastname}</p>
    </div>
  );
}

CitizenInfo.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
};
