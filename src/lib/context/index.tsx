import { createContext } from 'react';

type UserContextType = {
    token: undefined | string,
}

const UserContext = createContext<UserContextType>({
    token: process.env.IG_TOKEN,
});

export default UserContext;