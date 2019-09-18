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
  }
}
