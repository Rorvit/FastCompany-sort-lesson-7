import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import api from "../api";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, [userId]);

  const handleAllUsers = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <>
        <h3>{user._id}</h3>
        <h3>{user.name}</h3>
        <h3>{user.profession.name}</h3>
        {user.qualities.map((qual) => (
          <Quality key={qual._id} {...qual} />
        ))}
        <h3>{user.completedMeetings}</h3>
        <h3>{user.rate}</h3>

        <button
          onClick={() => {
            handleAllUsers();
          }}
        >
          Все пользователи
        </button>
      </>
    );
  }
  return "Loading";
};

UserPage.propTypes = {
  userId: PropTypes.string,
};

export default UserPage;
