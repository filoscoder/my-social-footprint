import axios from "axios";

const AppId = process.env.REACT_APP_ID || "";
const authUrl = process.env.REACT_APP_FB_AUTH_URL || "";
const redirectUri =
  "https://localhost:3000" || process.env.REACT_APP_REDIRECT_URL;

export const login = async () => {
  // login with facebook then authenticate with the API to get a JWT auth token

  const { authResponse } = await new Promise(window.FB.login);
  if (!authResponse) return;

  window.FB.api("/me", function (response: any) {
    console.log("Good to see you, " + response.name + ".");
  });

  const { accessToken, userID, expiresIn, graphDomain } = authResponse;

  console.log(authResponse);

  //   await apiAuthenticate(authResponse.accessToken);

  // get return url from location state or default to home page
  //   const { from } = history.location.state || { from: { pathname: "/" } };
  //   history.push(from);
};

// export const apiAuthenticate = async (accessToken: string) => {
//     // authenticate with the api using a facebook access token,
//     // on success the api returns an account object with a JWT auth token
//     const response = await axios.post(`${baseUrl}/authenticate`, { accessToken });
//     const account = response.data;
//     accountSubject.next(account);
//     startAuthenticateTimer();
//     return account;
// }
export const checkLoginState = async () => {
  const { authResponse } = await new Promise(window.FB.getLoginStatus);
  if (!authResponse) return;
  const { accessToken, userID, expiresIn, graphDomain } = authResponse;

  console.log(authResponse);
  return authResponse;
};

export const logout = () => {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  window.FB.logout(function (response: string) {
    checkLoginState();
    // user is now logged out
    console.log(response);
    return (window.location.href = "/facebook/signin");
  });
};
