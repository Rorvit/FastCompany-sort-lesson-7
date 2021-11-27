import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";

import Users from "./layouts/users";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/users/:userId?" component={Users} />
        <Route path="/" exact component={Main} />
      </Switch>
    </>
  );
}

export default App;
