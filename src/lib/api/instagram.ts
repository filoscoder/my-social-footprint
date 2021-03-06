import axios, { AxiosResponse } from "axios";

import { FbPageInfoType } from "../../pages/facebook/types";
import { IgAccountType } from "../../pages/instagram/types";
import { openNotification } from "../utils";

const ApiUrl = process.env.REACT_APP_FB_API_URL ?? "";
const SdkVer = process.env.REACT_APP_FB_SDK_VER ?? "";

export const getIgBusinessAcc = async () => {
  try {
    const igBusinessAccounts = localStorage.getItem("igBusinessAccounts");

    if (!igBusinessAccounts) {
      const storeFbPages: Array<FbPageInfoType> = JSON.parse(
        localStorage.getItem("fbPages") || ""
      );

      if (storeFbPages) {
        const igBusinessData = await Promise.all(
          storeFbPages.map(async (page) => {
            let { data } = await axios.get(`${ApiUrl}/${SdkVer}/${page.id}`, {
              params: {
                fields: "instagram_business_account,name,username",
                access_token: page.access_token,
              },
            });
            return {
              id: data.instagram_business_account.id,
              name: data.name,
              username: data.username || "",
              access_token: page.access_token,
            };
          })
        );

        localStorage.setItem(
          "igBusinessAccounts",
          JSON.stringify(igBusinessData)
        );

        return igBusinessData;
      } else {
        return;
      }
    } else {
      return JSON.parse(igBusinessAccounts);
    }
  } catch (error) {
    openNotification(
      "error",
      "No account",
      "You need to connect a Instagram business account"
    );
    console.log("[getIgBusinessAcc] Error: ", error);
  }
};

export const getMe = async (
  account: IgAccountType,
  fields: string = "biography,id,ig_id,username,follows_count,followers_count,media_count,name,profile_picture_url"
) => {
  try {
    console.log(account);
    const response: any = await axios.get(`${ApiUrl}/${SdkVer}/${account.id}`, {
      params: {
        fields,
        access_token: account.access_token,
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

export const getMediaList = async (
  account: IgAccountType,
  fields: string = "caption,comments_count,id,ig_id,is_comment_enabled,like_count,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username"
) => {
  try {
    console.log(account);
    const response: any = await axios.get(
      `${ApiUrl}/${SdkVer}/${account.id}/media`,
      {
        params: {
          access_token: account.access_token,
          fields,
        },
      }
    );

    if (response.status !== 200) {
      return;
    }
    console.log(response);
    return {
      data: response.data.data,
      next: response.data.paging.next,
    };
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};

export const getMoreMediaList = async (nextUrl: string) => {
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

export const getMedia = async (
  account: IgAccountType,
  id: string,
  fields: string = "id,"
) => {
  try {
    console.log(account);
    const response: any = await axios.get(
      `${ApiUrl}/${SdkVer}/${account.id}/media`,
      {
        params: {
          access_token: account.access_token,
        },
      }
    );

    if (response.status !== 200) {
      return;
    }
    console.log(response);
    return {
      data: response.data.data,
      next: response.data.paging.next,
    };
  } catch (error) {
    console.log("[getMe] Error: ", error);
  }
};
