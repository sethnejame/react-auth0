import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Callback from "./Callback";
import Nav from "./Nav";
import Auth from "./Auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    // hist will be auto injected into this component (props) because
    // we wrapped "App" in Router in Index.js
    // we pass the hist into Auth so Auth can interact with Router
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            // below, we're declaring Home as a prop
            // but we need to pass it auth as a prop
            // for this, we use render and the below syntax
            // render takes props as an arg, then we pass in
            // Home w/ auth props, then spread any other props
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route path="/profile" component={Profile} />
        </div>
      </>
    );
  }
}

export default App;
