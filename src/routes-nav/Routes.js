import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import SpellList from "../components/spellList";
import SpellDetail from "../components/spellDetails";
import Favorites from "../components/Favorites";

function Routes({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `signup=${typeof signup}`,
  );

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <PrivateRoute path="/spellList">
          <SpellList />
        </PrivateRoute>

        <PrivateRoute path="/spell/:id">
          <SpellDetail />
        </PrivateRoute>

        <PrivateRoute path="/favorites">
          <Favorites />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;