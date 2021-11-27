import React from "react";
import PropTypes from "prop-types";

const SearchPanel = ({ name, value, onChange }) => {
  return (
    <div className="container-fluid ">
      <form className="d-flex">
        <input
          className="form-control mx-0"
          type="search"
          placeholder="Поиск..."
          aria-label="Search"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

SearchPanel.defaultProps = {
  name: "",
};

SearchPanel.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchPanel;
