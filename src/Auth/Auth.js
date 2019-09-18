import auth0 from "auth0-js";

export default class Auth {
  // below we pass in the history from React Router
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token", // gives us both an id token (for authentication) and access token (for authorization)
      scope: "openid profile email" // this means we wanna use openid for authentication. . .gives us access to user's profile (name, pic, etc)
    });
  }

  login = () => {
    // this is a method avail on the auth0.WebAuth object
    // when authorize is called, it will redir browser to Auth0 login page
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    // parseHash is built into the auth0-js library
    // it parses the hash from the URL and returns an err & result
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // redir app back to homepage
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    // store the authResult in the browser's local storage
    localStorage.setItem("access_token", authResult.accessToken)
    localStorage.setItem("id_token", authResult.idToken)
    localStorage.setItem("expires_at", expiresAt)
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    return new Date().getTime() < expiresAt;
  }
}
