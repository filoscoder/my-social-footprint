import React, { createContext, useReducer } from 'react';

import Reducer from './Reducer';

type SocialDataType = {
    token: string,
    userId: string
}

export type UserContextType = {
    facebook: SocialDataType,
    instagram: SocialDataType,
    youtube: SocialDataType,
    social: "facebook" | "instagram" | "youtube",
    defaultSocial: string,
    theme: string,
}

const initialState = {
    facebook: {
        token: sessionStorage.getItem("facebook_token") || '',
        userId: sessionStorage.getItem("facebook_userId") || '',
    },
    instagram: {
        token: sessionStorage.getItem("instagram_token") || '',
        userId: sessionStorage.getItem("instagram_userId") || '',
    },
    youtube: {
        token: sessionStorage.getItem("youtube_token") || '',
        userId: sessionStorage.getItem("youtube_userId") || '',
    },
    social: 'instagram',
    defaultSocial: 'instagram',
    theme: "dark"
}

const Store: React.FC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext<UserContextType | any>([initialState, () => { }]);
export default Store;