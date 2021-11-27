import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";

import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import Userstable from "../components/usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import SearchPanel from "../components/searchPanel";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [search, setSearch] = useState("");
  const params = useParams();
  const pageSize = 8;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    // clearSearch();
  };
  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
    setSelectedProf();
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };
  const { userId } = params;

  if (users) {
    const searchedUsers = users.filter((user) => {
      return user.name.includes(search);
    });

    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchedUsers;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return userId ? (
      <UserPage users={usersCrop} id={userId} />
    ) : (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchPanel
            name="searchPanel"
            value={search}
            onChange={handleSearchChange}
          />
          {count > 0 && (
            <Userstable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "Loading...";
};
Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Users;
