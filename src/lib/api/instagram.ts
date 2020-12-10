import axios, { AxiosResponse } from "axios";

import { openNotification } from "../utils";

const AppId = process.env.REACT_APP_IG_CLIENT_ID || "";
const AppSecret = process.env.REACT_APP_IG_CLIENT_SECRET || "";
const redirectUri =
  "https://localhost:3000/" || process.env.REACT_APP_REDIRECT_URL;
const tokenUrl = process.env.REACT_APP_IG_TOKEN_URL || "";
const authUrl = process.env.REACT_APP_IG_AUTH_URL || "";
const apiUrl = process.env.REACT_APP_IG_API_URL || "";

export const getAccessToken = async () => {
  const code = new URLSearchParams(window.location.search).get("code") || "";
  if (code === "") {
    return;
  }

  try {
    const bodyFormData = new FormData();
    bodyFormData.append("client_id", AppId);
    bodyFormData.append("client_secret", AppSecret);
    bodyFormData.append("grant_type", "authorization_code");
    bodyFormData.append("redirect_uri", `${redirectUri}instagram/`);
    bodyFormData.append("code", code);

    const response = await axios.post(tokenUrl, bodyFormData);

    if (response.status !== 200) {
      openNotification(
        "error",
        `Error`,
        "Something went wrong. \n Please, try again"
      );
      return null;
    }

    const { id, username } = await getMe(response.data.access_token);

    sessionStorage.setItem("instagram_token", response.data.access_token);
    sessionStorage.setItem("instagram_userId", id);
    sessionStorage.setItem("instagram_username", username);

    openNotification("success", "Logged in", `Welcome back ${username}!`);

    return { token: response.data.access_token, userId: response.data.user_id };
  } catch (error) {
    openNotification(
      "error",
      `Error`,
      "Something went wrong. \n Please, try again"
    );
    console.log("[getAccessToken] Error: ", error);
  }
};

export const getAuthCode = async () => {
  try {
    const response = await axios.get(authUrl, {
      params: {
        client_id: AppId,
        redirect_uri: `${redirectUri}instagram/`,
        scope: "user_profile,user_media",
        response_type: "code",
      },
    });

    if (response.status !== 200) {
      return;
    }

    const storageToken = sessionStorage.getItem("instagram_token");
    const storageUserId = sessionStorage.getItem("instagram_userId");

    if (storageToken || storageUserId) {
      sessionStorage.removeItem("instagram_token");
      sessionStorage.removeItem("instagram_userId");
    }

    return (window.location.href = response.request.responseURL);
  } catch (error) {
    console.log("[getAccessToken] Error: ", error);
  }
};

export const getMe = async (
  token: string,
  fields = "account_type,id,username,media_count"
) => {
  try {
    const response = await axios.get(`${apiUrl}/me`, {
      params: {
        fields: fields,
        access_token: token,
      },
    });

    if (response.status !== 200) {
      return;
    }
    return response.data;
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};

export const getMedia = async (
  fields: string = "id,username,caption,media_type,media_url,thumbnail_url,timestamp"
) => {
  try {
    const storageToken = sessionStorage.getItem("instagram_token");
    const storageUserId = sessionStorage.getItem("instagram_userId");

    const response: any = await axios.get(`${apiUrl}/${storageUserId}/media`, {
      params: {
        fields: fields,
        access_token: storageToken,
      },
    });

    if (response.status !== 200) {
      return;
    }
    return {
      data: response.data.data,
      next: response.data.paging.next,
    };
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};

export const getMoreMedia = async (nextUrl: string) => {
  try {
    const response: any = await axios.get(nextUrl);

    if (response.status !== 200) {
      return;
    }

    return {
      data: response.data.data,
      next: response.data.paging.next,
      previous: response.data.paging.previous,
    };
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};
