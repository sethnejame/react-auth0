import React, { Component } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Callback from "./Callback";
import Nav from "./Nav";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import Auth from "./Auth/Auth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AuthContext from "./AuthContext";

class App extends Component {
  constructor(props) {
    super(props);
    // hist will be auto injected into this component (props) because
    // we wrapped "App" in Router in Index.js
    // we pass the hist into Auth so Auth can interact with Router
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/callback" component={Callback} />
          <PrivateRoute path="/profile" component={Profile} />
          <PublicRoute path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
