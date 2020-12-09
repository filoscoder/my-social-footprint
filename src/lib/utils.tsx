import { getAccessToken } from "./api/instagram";
import { notification } from "antd";

type notifType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (type: notifType, title: string, message: string) => {
    notification[type]({
        message: title,
        description: message,
    });
};

export const checkLoginSession = (social: string): boolean => {
    const token = sessionStorage.getItem(`${social}_token`);
    return Boolean(token);
}

export const setTokenToSession = async (social: string) => {

    switch (social) {
        case "facebook":
            return undefined;
        case "instagram":
            return await getAccessToken();
        case "youtube":
            return undefined;
        case "twitter":
            return undefined;

        default:
            break;
    }


}