import axios from "axios";

const AppId = process.env.REACT_APP_IG_CLIENT_ID || "";
const AppSecret = process.env.REACT_APP_IG_CLIENT_SECRET || "";
const redirectUri =
  "https://localhost:3000/" || process.env.REACT_APP_REDIRECT_URL;
const tokenUrl = process.env.REACT_APP_IG_TOKEN_URL || "";
const authUrl = process.env.REACT_APP_IG_AUTH_URL || "";

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
    bodyFormData.append("redirect_uri", redirectUri);
    bodyFormData.append("code", code);

    const response = await axios.post(tokenUrl, bodyFormData);
    console.log(response);

    if (response.status !== 200) {
      return;
    }

    localStorage.setItem("ig_token", response.data.access_token);
    localStorage.setItem("ig_user_id", response.data.user_id);

    return response.data.access_token;
  } catch (error) {
    console.log("[getAccessToken] Error: ", error);
  }
};

export const getAuthCode = async () => {
  try {
    const response = await axios.get(authUrl, {
      params: {
        client_id: AppId,
        redirect_uri: redirectUri,
        scope: "user_profile,user_media",
        response_type: "code",
      },
    });

    console.log(response);

    if (response.status !== 200) {
      return;
    }

    return (window.location.href = response.request.responseURL);
  } catch (error) {
    console.log("[getAccessToken] Error: ", error);
  }
};
