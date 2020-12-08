import React, { createContext, useReducer } from 'react';

import Reducer from './Reducer';

export type UserContextType = {
    facebook_token: string,
    facebook_userId: string,
    instagram_token: string,
    instagram_userId: string,
    youtube_token: string,
    youtube_userId: string,
    social: string,
    defaultSocial: string,
    theme: string,
}

const initialState = {
    facebook_token: '',
    facebook_userId: '',
    instagram_token: '',
    instagram_userId: '',
    youtube_token: '',
    youtube_userId: '',
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