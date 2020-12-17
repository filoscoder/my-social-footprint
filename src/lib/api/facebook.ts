import axios, { AxiosResponse } from "axios";

import { LoginStatusType } from "../../pages/facebook/types";

const ApiUrl = process.env.REACT_APP_FB_API_URL ?? "";
const SdkVer = process.env.REACT_APP_FB_SDK_VER ?? "";

export const login = async () => {
  localStorage.removeItem("fbLoginStatus");
  const response: LoginStatusType = await new Promise(window.FB.login);
  if (!response.authResponse) return;
  if (response.status === "connected") {
    localStorage.setItem("fbLoginStatus", JSON.stringify(response));
    console.log(response);

    return window.location.reload();
  }
};

export const checkFbLoginState = async () => {
  const storeFbLoginStatus = localStorage.getItem("fbLoginStatus");
  if (!storeFbLoginStatus) {
    const response: LoginStatusType = await new Promise(
      window.FB.getLoginStatus
    );
    localStorage.setItem("fbLoginStatus", JSON.stringify(response));
    return response;
  } else {
    return JSON.parse(storeFbLoginStatus);
  }
};

export const getMe = async () => {
  try {
    const storeFbLoginStatus = JSON.parse(
      localStorage.getItem("fbLoginStatus") || ""
    );

    const response: AxiosResponse = await axios.get(`${ApiUrl}/${SdkVer}/me`, {
      params: {
        access_token: storeFbLoginStatus.authResponse.accessToken,
      },
    });

    if (response.status !== 200) {
      return;
    }

    localStorage.setItem("fbMe", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};

export const getFbPages = async () => {
  try {
    const storeFbPages = localStorage.getItem("fbPages");
    if (!storeFbPages) {
      const storeFbLoginStatus = JSON.parse(
        localStorage.getItem("fbLoginStatus") || ""
      );

      const response: AxiosResponse = await axios.get(
        `${ApiUrl}/${SdkVer}/me/accounts`,
        {
          params: {
            access_token: storeFbLoginStatus.authResponse.accessToken,
          },
        }
      );

      if (response.status !== 200) {
        return;
      }

      localStorage.setItem("fbPages", JSON.stringify(response.data.data));

      return response.data.data;
    } else {
      return JSON.parse(storeFbPages);
    }
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};

export const logout = () => {
  window.FB.getLoginStatus(function (response: any) {
    if (response && response.status === "connected") {
      window.FB.logout(function (response: any) {
        localStorage.removeItem("igBusinessAccounts");
        localStorage.removeItem("fbPages");
        localStorage.removeItem("fbLoginStatus");
        localStorage.removeItem("fbMe");
        localStorage.removeItem("igAccounts");
        return (window.location.href = "/signin/facebook");
      });
    }
  });
};
