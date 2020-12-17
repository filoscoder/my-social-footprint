import { checkFbLoginState, getFbPages, getMe } from "./api/facebook";

import { getIgBusinessAcc } from "./api/instagram";
import { notification } from "antd";

type notifType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (type: notifType, title: string, message: string) => {
    notification[type]({
        message: title,
        description: message,
    });
};

export const checkLoginSession = async (social: string): Promise<boolean> => {
    switch (social) {
        case 'facebook':
            const fbRes = await checkFbLoginState();
            if (fbRes?.status === "connected") {
                await getMe()

                return true;
            }
            return false;
        case 'instagram':
            const igRes = await checkFbLoginState();
            if (igRes?.status === "connected") {
                await getFbPages();
                await getIgBusinessAcc();
                return true;
            }
            return false;
        case 'youtube':

            return false;

        default:
            return false;
    }
}
