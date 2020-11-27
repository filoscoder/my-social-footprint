import axios from "axios";

const AppId = process.env.REACT_APP_IG_CLIENT_ID || "";
const AppSecret = process.env.REACT_APP_IG_CLIENT_SECRET || "";
const redirectUri = process.env.REACT_APP_REDIRECT_URL || "";
const tokenUrl = process.env.REACT_APP_IG_TOKEN_URL || "";
const authUrl = process.env.REACT_APP_IG_AUTH_URL || "";

export const getAccessToken = async (code: string) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("client_id", AppId);
    bodyFormData.append("client_secret", AppSecret);
    bodyFormData.append("grant_type", "authorization_code");
    bodyFormData.append("redirect_url", redirectUri);
    bodyFormData.append("code", code);

    console.log(bodyFormData);

    const response = await axios.post(tokenUrl, bodyFormData, {
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    console.log(response);

    return response;
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

    return response;
  } catch (error) {
    console.log("[getAccessToken] Error: ", error);
  }
};
