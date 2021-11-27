import React from "react";
import PropTypes from "prop-types";

const TableHeaderIcon = ({ selectedSort, columnPath }) => {
  if (columnPath && columnPath === selectedSort.path) {
    return (
      <i
        className={
          "bi bi-caret-" +
          (selectedSort.order === "asc" ? "down" : "up") +
          "-fill "
        }
      ></i>
    );
  }
  return null;
};

TableHeaderIcon.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  columnPath: PropTypes.string,
};

export default TableHeaderIcon;
