import { IgApiClient } from "instagram-private-api";
import axios from "axios";
export const socialAuth = async (type: string) => {
  const ig = new IgApiClient();

  const clientId = "1464734727059421";
  const redirectUri = "http://localhost:3000/";
  try {
    const response = await axios.get(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=1`
      //   {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
      //   }
    );

    return console.log(response);
  } catch (error) {
    console.error(error);
  }
};
