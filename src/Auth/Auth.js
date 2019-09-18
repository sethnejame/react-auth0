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

// access_token=-CcitHqnK2N-uFQqWxv5x0Rt8z8PdeHo
// &expires_in=7200
// &token_type=Bearer
// &state=QPVVqkDGehK8wG7uDOYFTY0AXGEOLzYt
// &id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9UZEJRVEZGUmtReVFrTkVNVU0wTkRrNVEwVkZOems1TlRVeU1FTTBRVUpDT1RJME1FTkdRZyJ9.eyJnaXZlbl9uYW1lIjoiU2V0aCIsImZhbWlseV9uYW1lIjoiTmVKYW1lIiwibmlja25hbWUiOiJzZXRobmVqYW1lIiwibmFtZSI6IlNldGggTmVKYW1lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21ESV9xSXBCRmU0N3FCbVgzU3B6SlhZcHphMXg3WC1LdnpJN1UyQml3IiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wOS0xOFQwNTowNzo0My4xOTFaIiwiZW1haWwiOiJzZXRobmVqYW1lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL3JlYWN0LWF1dGgwLWRldi1zbi5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMwNjExOTQ1NDIwMTQ0MTgxNjciLCJhdWQiOiJ1NU1sWmVVUkRhUExLaGx0OFBQcWJKdFE5enF2ejBobiIsImlhdCI6MTU2ODc4MzI2OCwiZXhwIjoxNTY4ODE5MjY4LCJhdF9oYXNoIjoiTUJ4aW5UX2RMc1BFUGhBdnFFM0xwZyIsIm5vbmNlIjoiWUhlSDRnbVJ4WG5nQmwuZktGaVVMSDVxWWE5RHZsRzYifQ.ZUQI8Bg9RFK_3BFq3zprshubmTsdYXbcAF5T4P0tO64uJwNv2QEQL5M5XS3cAMtBjgPuXQU_p4-wTCJo6646BYSLzL-FbivDCOaCnG3PxGAgpBSI08_MlrOWkTbetqv9l9UWYZKn82OurRpSe74GgO8IeaH7Kp-IeA0k5NKZnxKfWVscjsEY5Y6e71qbceLNZelLGQRkxbyCRMatp542S0bzBgjjpp24DyXxRFrKlmqON55DtsVEogS0Tt90xo7-bjVbNteOX_WJMPKFoqcq9vxYjz9Wx5E20fnE8oJ7CYewgB31aA5MtL4FDCWjemqDMN6jUSDNVbg_dneCMNxtzg