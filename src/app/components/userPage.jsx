import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useHistory } from "react-router-dom";

const UserPage = ({ user }) => {
    const history = useHistory();
    const handleAllUsers = () => {
        history.replace("/users");
    };
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
};

UserPage.propTypes = {
    user: PropTypes.object
};

export default UserPage;
